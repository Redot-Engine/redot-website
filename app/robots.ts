import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";

const baseUrl = getBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio/**",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
