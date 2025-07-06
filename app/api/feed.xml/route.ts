import { NextResponse } from "next/server";
import { getPosts } from "@/lib/blog";
import { Post } from "@/sanity/schemaTypes/postType";
import { getBaseUrl } from "@/lib/base-url";

const RSS_NAMESPACE = "http://www.w3.org/2005/Atom";
const SITE_CONFIG = {
  title: "Redot Engine",
  url: getBaseUrl(),
  description:
    "Redot Engine is an open-source game engine that enables developers to create stunning games with ease, offering powerful features, an active community, and a seamless development experience.",
  language: "en",
  logoUrl: "https://www.redotengine.org/logo.webp",
  category: "Technology",
  managingEditor: "redotengine@gmail.com",
  webMaster: "redotengine@gmail.com",
  copyright: `© ${new Date().getFullYear()} Redot Engine`,
  ttl: 60,
  maxPosts: 50,
};

function escapeXml(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function generateGuid(post: Post): string {
  return `${getBaseUrl()}/${encodeURIComponent(post.slug)}#${new Date(post.publishedAt).getTime()}`;
}

function formatRFC822Date(date: string | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return new Date().toUTCString();
  }
  return d.toUTCString();
}

function generateFeedItem(post: Post): string {
  const baseUrl = getBaseUrl();
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const guid = generateGuid(post);

  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <description><![CDATA[${post.excerpt ?? ""}]]></description>
      <pubDate>${formatRFC822Date(post.publishedAt)}</pubDate>
      <guid isPermaLink="false">${guid}</guid>
      <author>${escapeXml(post.author.name)}</author>
      <category>${escapeXml(SITE_CONFIG.category)}</category>
    </item>`;
}

export async function GET() {
  try {
    const posts = await getPosts();

    if (!posts || posts.length === 0) {
      return new NextResponse("No posts found", { status: 404 });
    }

    const sortedPosts = posts
      .filter((post: Post) => post.publishedAt && post.title)
      .sort(
        (a: Post, b: Post) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, SITE_CONFIG.maxPosts);

    const feedItems = sortedPosts.map(generateFeedItem).join("\n");

    const lastBuildDate =
      sortedPosts.length > 0
        ? formatRFC822Date(sortedPosts[0].publishedAt)
        : new Date().toUTCString();

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="${RSS_NAMESPACE}">
  <channel>
    <title>${escapeXml(SITE_CONFIG.title)}</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>${SITE_CONFIG.language}</language>
    <copyright>${escapeXml(SITE_CONFIG.copyright)}</copyright>
    <managingEditor>${escapeXml(SITE_CONFIG.managingEditor)}</managingEditor>
    <webMaster>${escapeXml(SITE_CONFIG.webMaster)}</webMaster>
    <pubDate>${lastBuildDate}</pubDate>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <category>${escapeXml(SITE_CONFIG.category)}</category>
    <generator>Redot Engine RSS Feed</generator>
    <ttl>${SITE_CONFIG.ttl}</ttl>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_CONFIG.logoUrl}</url>
      <title>${escapeXml(SITE_CONFIG.title)}</title>
      <link>${SITE_CONFIG.url}</link>
      <width>144</width>
      <height>144</height>
      <description>${escapeXml(SITE_CONFIG.description)}</description>
    </image>
${feedItems}
  </channel>
</rss>`;

    return new NextResponse(feed, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("RSS Feed Generation Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
