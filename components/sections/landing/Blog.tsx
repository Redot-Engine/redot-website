"use client";

import { motion } from "motion/react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { useInView } from "react-intersection-observer";
import { getPosts } from "@/lib/blog";
import { useEffect, useState } from "react";
import { Post } from "@/sanity/schemaTypes/postType";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const Blog = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("blogSection");

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="w-full" />
    ));
  }

  return (
    <section ref={ref} className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-5 lg:px-40"
      >
        <div className="flex items-start justify-between">
          <div className="max-w-[768px] space-y-4">
            <div className="flex h-8 w-fit items-center rounded-md border border-input bg-background px-3 font-sans text-sm font-medium">
              {t("badge")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {t("title")}
            </h2>
            <p className="text-left text-lg tracking-tighter text-muted-foreground md:text-xl">
              {t("description")}
            </p>
          </div>

          <Button asChild>
            <Link href="/blog">{t("viewAll")}</Link>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {!posts
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-full" />
              ))
            : posts.slice(0, 3).map((post: Post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                  }}
                >
                  <BlogPostCard {...post} />
                </motion.div>
              ))}
        </div>
      </motion.div>
    </section>
  );
};
