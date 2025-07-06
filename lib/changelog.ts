import { client } from "@/sanity/lib/client";
import { Changelog } from "@/sanity/schemaTypes/changelogType";
import type { PortableTextBlock } from "@portabletext/types";
import { generateHeadingId } from "@/lib/utils";

export async function getAllChangelogs(): Promise<Changelog[]> {
  const query = `*[_type == "changelog"]{
    "id": _id,
    title,
    "slug": slug.current,
    publishedAt,
    version,
    platform->{_id, name, "slug": slug.current},
    summary
  } | order(publishedAt desc)`;
  return await client.fetch(query);
}

export async function getChangelogEntry(
  slug: string
): Promise<Changelog | null> {
  const query = `*[_type == "changelog" && slug.current == $slug][0]{
    "id": _id,
    title,
    "slug": slug.current,
    publishedAt,
    version,
    platform->{_id, name, "slug": slug.current},
    summary
  }`;

  const params = { slug };
  return await client.fetch(query, params);
}

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export function generateTableOfContents(
  content: PortableTextBlock[]
): TableOfContentsItem[] {
  return content
    .filter(
      (block) =>
        block._type === "block" &&
        ["h1", "h2", "h3"].includes(block.style ?? "")
    )
    .map((block) => {
      const text =
        block.children
          ?.filter((child) => child._type === "span")
          .map((span) => span.text)
          .join("") ?? "";

      let level = 1;
      if (block.style === "h2") level = 2;
      if (block.style === "h3") level = 3;

      return {
        id: generateHeadingId(text),
        title: text,
        level,
      };
    });
}
