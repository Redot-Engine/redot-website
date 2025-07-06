import { getLatestArticle, getPosts } from "@/lib/blog";
import { BlogClient } from "@/components/sections/blog/BlogClient";
import type { Metadata } from "next";
import { getLanguage } from "@/actions/language";
import { getUsedTags } from "@/lib/tag";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore our latest articles and insights",
};

export default async function Blog() {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  const language = await getLanguage();
  const selectedTagsParam = searchParams.get("tags") ?? "";
  const selectedTags = selectedTagsParam
    ? selectedTagsParam.split(",").filter(Boolean)
    : [];
  const search = searchParams.get("search") ?? "";

  const [tags, posts, latestPost] = await Promise.all([
    getUsedTags(),
    getPosts({ tags: selectedTags, search }),
    getLatestArticle(language),
  ]);

  return (
    <BlogClient
      initialPosts={posts}
      latestPost={latestPost}
      tags={tags}
      initialSelectedTags={selectedTags}
      initialSearch={search}
    />
  );
}
