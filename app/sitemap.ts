import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { PLATFORM_MAPPING } from "@/constants/download/platforms";
import { Post } from "@/sanity/schemaTypes/postType";
import { getBaseUrl } from "@/lib/base-url";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/licenses`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  try {
    const posts = await getPosts();

    const blogPostRoutes = posts.map((post: Post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    const uniquePlatforms = Array.from(
      new Set(Object.values(PLATFORM_MAPPING))
    );

    const platformDownloadRoutes = uniquePlatforms.map((platform) => ({
      url: `${baseUrl}/download/${platform}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...blogPostRoutes, ...platformDownloadRoutes];
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return staticRoutes;
  }
}
