"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import type { Post } from "@/sanity/schemaTypes/postType";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogRandomQuote } from "@/components/sections/blog/BlogRandomQuote";
import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";

interface BlogPostGridProps {
  readonly posts: Post[];
  readonly hasMorePosts: boolean;
  readonly onLoadMore: () => void;
  readonly isLoading: boolean;
}

export function BlogPostGrid({
  posts,
  hasMorePosts,
  onLoadMore,
  isLoading,
}: BlogPostGridProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("blog");

  if (posts.length === 0) {
    return null;
  }

  const firstBatch = posts.slice(0, 6);
  const remainingPosts = posts.slice(6);

  return (
    <div ref={ref}>
      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-6 px-5 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:px-40">
        {firstBatch.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: (index + 2) * 0.05,
            }}
          >
            <BlogPostCard {...post} />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 px-5 lg:px-40">
        <BlogRandomQuote />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-6 px-5 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:px-40">
        {remainingPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: (index + 2) * 0.05,
            }}
          >
            <BlogPostCard {...post} />
          </motion.div>
        ))}
      </div>

      {hasMorePosts && (
        <div className="mt-12 flex justify-center px-5 lg:px-40">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            className="min-w-32"
            variant="outline"
          >
            {isLoading ? (
              <>
                <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("loading")}
              </>
            ) : (
              t("loadMore")
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
