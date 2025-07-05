"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MascotImage } from "@/components/shared/MascotImage";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Not Found",
  description:
    "The blog post you are looking for does not exist or has been moved. It might have been relocated, deleted, or the URL might be incorrect. Browse our latest blog posts or return to the homepage.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  openGraph: {
    title: "Post Not Found",
    description:
      "The blog post you are looking for does not exist or has been moved.",
    siteName: "Redot Engine",
    type: "website",
    url: "https://www.redotengine.org/blog/404",
    images: [
      {
        url: "https://image.redotengine.org/not-found.png",
        width: 1200,
        height: 630,
        alt: "Redot Engine - Blog Post Not Found",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Not Found",
    description:
      "The blog post you are looking for does not exist or has been moved.",
    site: "@Redot_Engine",
    images: ["https://image.redotengine.org/not-found.png"],
  },
  alternates: {
    canonical: "https://www.redotengine.org/blog/404",
  },
  other: {
    "revisit-after": "30 days",
    "content-language": "en",
  },
};

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("blog.notFound");

  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex-grow overflow-x-clip bg-gradient-to-b from-[#ffffff] to-[#FFD2D2] py-32 dark:from-background dark:to-[#9F1E1E]/20">
        <div className="mx-auto max-w-[540px]">
          <div className="flex flex-col items-center justify-center gap-4">
            <MascotImage />
            <div className="flex flex-col items-center justify-center gap-4 space-y-4">
              <div className="space-y-2">
                <h2 className="text-center text-4xl font-bold tracking-tighter md:text-[54px] md:leading-[60px]">
                  {t("title")}
                </h2>
                <p className="text-center text-xl tracking-tighter text-muted-foreground md:text-[22px] md:leading-[30px]">
                  {t("description")}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.back()}
                  asChild
                >
                  <Link href="/">
                    <IconArrowLeft />
                    {t("goBack")}
                  </Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href="/">{t("goHome")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
