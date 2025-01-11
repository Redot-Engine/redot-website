"use server";

import { client } from "@/sanity/lib/client";
import { sanitizeInput } from "@/lib/utils";
import { Post } from "@/sanity/schemaTypes/postType";

export async function getLatestArticle() {
  const query = `*[_type == "post"] | order(publishedAt desc) [0] {
    "title": title[_key == "en"][0].value,
    slug,
    image,
    "imageUrl": image.asset->url,
    publishedAt,
    "excerpt": excerpt[_key == "en"][0].value,
    author,
    tags[]->{name, slug}
  }`;

  return await client.fetch(query);
}

export async function getAllTags() {
  const query = `*[_type == "tag"] {
    _id,
    name,
    slug {
      current
    }
  }`;

  return await client.fetch(query);
}

export async function getUsedTags() {
  const query = `*[_type == "post"] {
    tags[]->{
      _id,
      name,
      slug {
        current
      }
    }
  }`;

  const posts = await client.fetch(query);

  const usedTags = new Set<string>();
  posts.forEach((post: Post) => {
    post.tags.forEach((tag) => usedTags.add(tag.slug.current));
  });

  const uniqueTags = [...usedTags];

  const tagQuery = `*[_type == "tag" && slug.current in [${uniqueTags.map((slug) => `"${slug}"`).join(",")}]] {
    _id,
    name,
    slug {
      current
    }
  }`;

  return await client.fetch(tagQuery);
}

export async function getPosts(tag: string = "", search: string = "") {
  let query = `*[_type == "post"`;
  const inputSearch = sanitizeInput(search);
  const filters: string[] = [];

  if (tag) {
    filters.push(`"${tag}" in tags[]->slug.current`);
  }

  if (search) {
    filters.push(
      `title match "*${inputSearch}*" || excerpt match "*${inputSearch}*"`
    );
  }

  if (filters.length > 0) {
    query += ` && (${filters.join(" && ")})`;
  }

  query += `] | order(publishedAt desc) {
    "title": title[_key == "en"][0].value,
    slug,
    image,
    "imageUrl": image.asset->url,
    publishedAt,
    "excerpt": excerpt[_key == "en"][0].value,
    author-> {
      _id,
      name,
      image,
      "imageUrl": image.asset->url
    },
    tags[]-> {
      _id,
      slug,
      name
    }
  }`;

  return await client.fetch(query);
}

export async function getPostBySlug(slug: string, language: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"] {
    "title": title[_key == "${language}"][0].value,
    slug,
    image,
    "imageUrl": image.asset->url,
    publishedAt,
    "excerpt": excerpt[_key == "${language}"][0].value,
    "body": body[_key == "${language}"][0].value,
    author-> {
      _id,
      name,
      image,
      "imageUrl": image.asset->url
    },
    tags[]-> {
      _id,
      slug,
      name
    }
  }`;

  return await client.fetch(query);
}
