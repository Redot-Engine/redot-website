import { NextResponse } from "next/server";
import { getPosts } from "@/lib/blog";

export const runtime = "nodejs";

export async function GET() {
  const posts = await getPosts();

  const feedItems = posts
    .map(
      (post: any) => `
    <item>
      <title>${post.title}</title>
      <link>https://www.redotengine.org/blog/${post.slug.current}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>
  `
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Redot Engine</title>
        <link>https://www.redotengine.org/</link>
        <description>Redot Engine is an open-source game engine that enables developers to create stunning games with ease, offering powerful features, an active community, and a seamless development experience.</description>
        <language>en</language>
        <image>
          <url>https://www.redotengine.org/logo.webp</url>
          <title>Redot Engine</title>
          <link>https://www.redotengine.org/</link>
        </image>
        ${feedItems}
      </channel>
    </rss>`;

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
