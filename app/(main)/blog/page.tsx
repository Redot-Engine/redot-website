import { getUsedTags, getLatestArticle, getPosts } from "@/lib/blog";
import BlogClient from "@/components/sections/blog/BlogClient";
import type { Metadata } from "next";
import { getLanguage } from "@/actions/language";

export const metadata: Metadata = {
  title: "Blog",
};

export const runtime = "nodejs";

export default async function Blog() {
  const tags = await getUsedTags();

  const searchParams = new URLSearchParams();
  const selectedTag = searchParams.get("tag") ?? "";
  const search = searchParams.get("search") ?? "";

  const posts = await getPosts(selectedTag, search);
  const latestBlog = await getLatestArticle(await getLanguage());

  return <BlogClient posts={posts} latestBlog={latestBlog} tags={tags} />;
}
