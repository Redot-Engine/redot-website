"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import type { Post } from "@/sanity/schemaTypes/postType";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { bricolageGrotesque } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";

interface BlogHeroProps {
  latestPost: Post;
}

export function BlogHero({ latestPost }: Readonly<BlogHeroProps>) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("blog");

  return (
    <section className="mb-8 px-5 lg:px-40" ref={ref}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-pink-400/20 to-orange-400/20 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-64 w-64 animate-pulse rounded-full bg-gradient-to-r from-green-400/10 to-blue-400/10 blur-2xl"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative order-last w-full px-0 pb-6 md:order-first"
        >
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {latestPost.tags.map((tag) => (
                    <Badge key={tag.slug.current}>{tag.name}</Badge>
                  ))}
                </div>
                <Separator className="w-full max-w-4" />
                <p className="text-xs font-medium text-muted-foreground md:text-sm">
                  {formatDate(latestPost.publishedAt)}
                </p>
              </div>
              <h1
                className={`${bricolageGrotesque.className} xl:text-7xl text-pretty text-4xl font-thin leading-tight tracking-tight md:text-5xl lg:text-6xl`}
              >
                {latestPost.title}
              </h1>
            </div>
            <p className="line-clamp-3 text-balance text-base text-muted-foreground md:text-xl">
              {latestPost.excerpt}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                className="w-fit bg-transparent"
                variant="outline"
                asChild
              >
                <Link href={`/blog/${latestPost.slug}`}>{t("readMore")}</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative flex h-full w-full flex-col"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={latestPost.imageUrl || "/placeholder.svg"}
              alt={latestPost.title}
              className="h-full w-full object-cover"
              priority
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
