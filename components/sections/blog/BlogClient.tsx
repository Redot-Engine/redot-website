"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { Post } from "@/sanity/schemaTypes/postType";
import { BlogFilters } from "@/components/sections/blog/BlogFilters";
import { useBlogFilters } from "@/hooks/use-blog-filters";
import { BlogPostGrid } from "@/components/sections/blog/BlogPostGrid";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { Tag } from "@/sanity/schemaTypes/tagType";
import { BlogVelocityScroll } from "@/components/blog/BlogVelocityScroll";
import { useTranslations } from "next-intl";

interface BlogClientProps {
  readonly initialPosts: Post[];
  readonly latestPost: Post;
  readonly tags: Tag[];
  readonly initialSelectedTags: string[];
  readonly initialSearch: string;
}

export function BlogClient({
  initialPosts,
  latestPost,
  tags,
  initialSelectedTags,
  initialSearch,
}: BlogClientProps) {
  const t = useTranslations("blog");
  const router = useRouter();
  const [visiblePostsCount, setVisiblePostsCount] = useState(11);

  const {
    posts,
    selectedTags,
    search,
    isLoading,
    handleTagsChange,
    handleSearchChange,
    clearFilters,
  } = useBlogFilters({
    initialPosts,
    initialSelectedTags,
    initialSearch,
    router,
  });

  const visiblePosts = useMemo(
    () => posts.slice(0, visiblePostsCount),
    [posts, visiblePostsCount]
  );

  const handleLoadMore = useCallback(() => {
    setVisiblePostsCount((prev) => prev + 9);
  }, []);

  const hasMorePosts = visiblePostsCount < posts.length;

  if (posts.length === 0 && !isLoading) {
    return (
      <section className="mb-24">
        <BlogHero latestPost={latestPost} />
        <BlogVelocityScroll text={t("velocityScroll")} />
        <BlogFilters
          tags={tags}
          selectedTags={selectedTags}
          search={search}
          onTagsChange={handleTagsChange}
          onSearchChange={handleSearchChange}
        />
        <BlogEmptyState onClearFilters={clearFilters} />
      </section>
    );
  }

  return (
    <section className="mb-24">
      <BlogHero latestPost={latestPost} />
      <BlogVelocityScroll text={t("velocityScroll")} />
      <BlogFilters
        tags={tags}
        selectedTags={selectedTags}
        search={search}
        onTagsChange={handleTagsChange}
        onSearchChange={handleSearchChange}
      />
      <BlogPostGrid
        posts={visiblePosts}
        hasMorePosts={hasMorePosts}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
    </section>
  );
}
