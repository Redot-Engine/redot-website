"use server";

import {
  sanitizeForGroq,
  sanitizeLanguageCode,
  sanitizeNumber,
  sanitizeSearchInput,
  sanitizeSlug,
} from "@/lib/sanitize";
import { client } from "@/sanity/lib/client";
import { Post } from "@/sanity/schemaTypes/postType";

const DEFAULT_LANGUAGE = "en";

function buildMultilingualField(fieldName: string, language: string): string {
  const safeLang = sanitizeLanguageCode(language);
  return `coalesce(${fieldName}[_key == "${safeLang}"][0].value, ${fieldName}[_key == "${DEFAULT_LANGUAGE}"][0].value)`;
}

const COMMON_POST_FIELDS = `
  "slug": slug.current,
  image,
  "imageUrl": image.asset->url,
  publishedAt,
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
`;

export async function getLatestArticle(language: string = DEFAULT_LANGUAGE) {
  const safeLang = sanitizeLanguageCode(language);

  const query = `*[_type == "post"] | order(publishedAt desc) [0] {
    "title": ${buildMultilingualField("title", safeLang)},
    "excerpt": ${buildMultilingualField("excerpt", safeLang)},
    ${COMMON_POST_FIELDS}
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching latest article:", error);
    throw new Error("Failed to fetch latest article");
  }
}

interface GetPostsParams {
  tags?: string[];
  search?: string;
  language?: string;
  limit?: number;
  offset?: number;
}

export async function getPosts({
  tags = [],
  search = "",
  language = DEFAULT_LANGUAGE,
  limit = 10,
  offset = 0,
}: GetPostsParams = {}) {
  const safeLang = sanitizeLanguageCode(language);
  const safeSearch = search ? sanitizeSearchInput(search) : "";
  const safeTags = Array.isArray(tags)
    ? tags.map((tag) => sanitizeForGroq(tag)).filter(Boolean)
    : [];
  const safeLimit = sanitizeNumber(limit, 1, 100);
  const safeOffset = sanitizeNumber(offset, 0);

  const filters: string[] = [];

  if (safeTags.length > 0) {
    const tagFilters = safeTags.map(
      (tag) => `"${tag}" in tags[]->slug.current`
    );
    filters.push(`(${tagFilters.join(" && ")})`);
  }

  if (safeSearch) {
    filters.push(`
      (defined(title[_key == "${safeLang}"][0].value) && title[_key == "${safeLang}"][0].value match "*${safeSearch}*") ||
      (defined(title[_key == "${DEFAULT_LANGUAGE}"][0].value) && title[_key == "${DEFAULT_LANGUAGE}"][0].value match "*${safeSearch}*") ||
      (defined(excerpt[_key == "${safeLang}"][0].value) && excerpt[_key == "${safeLang}"][0].value match "*${safeSearch}*") ||
      (defined(excerpt[_key == "${DEFAULT_LANGUAGE}"][0].value) && excerpt[_key == "${DEFAULT_LANGUAGE}"][0].value match "*${safeSearch}*")
    `);
  }

  const filterString =
    filters.length > 0 ? ` && (${filters.join(" && ")})` : "";

  const query = `*[_type == "post"${filterString}] | order(publishedAt desc) [${safeOffset}...${safeOffset + safeLimit}] {
    "title": ${buildMultilingualField("title", safeLang)},
    "excerpt": ${buildMultilingualField("excerpt", safeLang)},
    ${COMMON_POST_FIELDS}
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getPostBySlug(
  slug: string,
  language: string = DEFAULT_LANGUAGE
) {
  if (!slug) {
    throw new Error("Slug is required");
  }

  const safeSlug = sanitizeSlug(slug);
  const safeLang = sanitizeLanguageCode(language);

  if (!safeSlug) {
    throw new Error("Invalid slug format");
  }

  const query = `*[_type == "post" && slug.current == $slug][0] {
    "title": ${buildMultilingualField("title", safeLang)},
    "excerpt": ${buildMultilingualField("excerpt", safeLang)},
    "isLegacy": defined(body[0].value),
    "content": coalesce(
      ${buildMultilingualField("content", safeLang)},
      ${buildMultilingualField("body", safeLang)}
    ),
    ${COMMON_POST_FIELDS}
  }`;

  try {
    return await client.fetch(query, { slug: safeSlug });
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    throw new Error("Failed to fetch post");
  }
}

export async function getRandomQuote() {
  const query = `*[_type == "post" && includeInQuoteSelection == true && defined(quote)] {
    "slug": slug.current,
    quote,
    publishedAt,
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

  try {
    const quotes = await client.fetch(query);

    if (quotes.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  } catch (error) {
    console.error("Error fetching random quote:", error);
    throw new Error("Failed to fetch random quote");
  }
}

export async function getPostCount(
  tags?: string[],
  search?: string,
  language: string = DEFAULT_LANGUAGE
): Promise<number> {
  const safeTags = Array.isArray(tags)
    ? tags.map((tag) => sanitizeForGroq(tag)).filter(Boolean)
    : [];
  const safeSearch = search ? sanitizeSearchInput(search) : "";
  const safeLang = sanitizeLanguageCode(language);

  const filters: string[] = [];

  if (safeTags.length > 0) {
    const tagFilters = safeTags.map(
      (tag) => `"${tag}" in tags[]->slug.current`
    );
    filters.push(`(${tagFilters.join(" && ")})`);
  }

  if (safeSearch) {
    filters.push(`
      (defined(title[_key == "${safeLang}"][0].value) && title[_key == "${safeLang}"][0].value match "*${safeSearch}*") ||
      (defined(title[_key == "${DEFAULT_LANGUAGE}"][0].value) && title[_key == "${DEFAULT_LANGUAGE}"][0].value match "*${safeSearch}*") ||
      (defined(excerpt[_key == "${safeLang}"][0].value) && excerpt[_key == "${safeLang}"][0].value match "*${safeSearch}*") ||
      (defined(excerpt[_key == "${DEFAULT_LANGUAGE}"][0].value) && excerpt[_key == "${DEFAULT_LANGUAGE}"][0].value match "*${safeSearch}*")
    `);
  }

  const filterString =
    filters.length > 0 ? ` && (${filters.join(" && ")})` : "";
  const query = `count(*[_type == "post"${filterString}])`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching post count:", error);
    return 0;
  }
}

export interface PostWithPagination {
  posts: Post[];
  total: number;
  hasMore: boolean;
  currentPage: number;
}

export async function getPostsWithPagination({
  tags = [],
  search = "",
  language = DEFAULT_LANGUAGE,
  page = 1,
  limit = 10,
}: GetPostsParams & { page?: number } = {}): Promise<PostWithPagination> {
  const offset = (page - 1) * limit;

  try {
    const [posts, total] = await Promise.all([
      getPosts({ tags, search, language, limit, offset }),
      getPostCount(tags, search),
    ]);

    return {
      posts,
      total,
      hasMore: offset + limit < total,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching posts with pagination:", error);
    throw new Error("Failed to fetch posts with pagination");
  }
}
