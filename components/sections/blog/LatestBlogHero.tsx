"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import Image from "next/image";
import { Tag } from "@/components/blog/Tag";
import { Tag as SchemaTag } from "@/sanity/schemaTypes/tagType";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export const LatestBlogHero = ({
  latestBlog,
  isLoading,
}: {
  latestBlog: any;
  isLoading: any;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("latestBlogHero");

  if (isLoading) {
    return (
      <section ref={ref}>
        <div className="grid grid-flow-row grid-cols-12 place-items-center gap-8 md:grid-flow-col md:gap-4">
          <div className="col-span-12 items-center md:col-span-6 md:col-start-7 md:items-start">
            <Skeleton className="aspect-video h-64 w-full rounded-lg" />
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-1">
            <Skeleton className="mb-4 h-8 w-1/2" />
            <Skeleton className="mb-2 h-12 w-3/4" />
            <Skeleton className="mb-2 h-6 w-full" />
            <Skeleton className="mb-2 h-6 w-5/6" />
            <Skeleton className="mt-4 h-10 w-32" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {latestBlog ? (
          <div className="grid grid-flow-row grid-cols-12 place-items-center gap-4 md:grid-flow-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="relative col-span-12 flex h-full w-full flex-col items-center md:col-span-6 md:col-start-7"
            >
              <div className="relative order-first aspect-video w-full overflow-hidden md:order-none">
                <Image
                  src={latestBlog.imageUrl}
                  alt={latestBlog.title}
                  className="h-full w-full rounded-lg object-cover"
                  priority
                  fill
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative col-span-12 w-full px-0 pb-6 md:col-span-5 md:col-start-1 md:pb-0"
            >
              <div className="flex flex-col justify-center gap-4">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {latestBlog.tags?.map((tag: SchemaTag) => (
                      <Tag
                        key={tag.slug.current}
                        className="hover:bg-background"
                        name={tag.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-muted-foreground md:text-sm">
                    {formatDate(latestBlog.publishedAt)}
                  </p>
                </div>
                <h3 className="text-3xl font-bold md:text-5xl">
                  {latestBlog.title}
                </h3>
                <p className="line-clamp-3 text-base text-muted-foreground md:text-xl">
                  {latestBlog.excerpt}
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Button className="w-fit" variant="outline" asChild>
                    <Link href={`/blog/${latestBlog.slug.current}`}>
                      {t("readMore")}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
};
