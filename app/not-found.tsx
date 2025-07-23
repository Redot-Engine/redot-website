"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  IconArrowLeft,
  IconBook,
  IconCube,
  IconMessages,
  IconPointFilled,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { links } from "@/constants/links";
import { useRouter } from "next/navigation";
import { SectionLink } from "@/components/SectionLink";

export const runtime = "edge";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("notFound");

  return (
    <div className="relative dark:bg-black">
      <div className="absolute inset-0 z-0 flex h-[25rem] items-center justify-center bg-white bg-grid-black/[0.1] dark:bg-black dark:bg-grid-white/[0.1]">
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      </div>
      <section className="relative z-10">
        <Header />
        <div className="px-5 py-24">
          <div className="flex flex-col items-center justify-center gap-16">
            <div className="mx-auto flex max-w-[768px] flex-col text-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-8 w-fit items-center gap-2 rounded-md border border-input bg-background px-2 text-sm font-medium">
                      <IconPointFilled className="h-4 w-4 text-rose-600" />
                      {t("code")}
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter text-primary md:text-6xl">
                      {t("title")}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    {t("description")}
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-3 md:flex-row">
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
            <div className="mx-auto flex max-w-[560px] flex-col gap-5 sm:w-[560px]">
              <Separator />
              <SectionLink
                icon={<IconCube className="h-6 w-6" />}
                href={links.documentation}
                title={t("documentation.title")}
                description={t("documentation.description")}
              />

              <Separator />
              <SectionLink
                icon={<IconBook className="h-6 w-6" />}
                href="/blog"
                title={t("ourBlog.title")}
                description={t("ourBlog.description")}
              />

              <Separator />
              <SectionLink
                icon={<IconMessages className="h-6 w-6" />}
                href="/contact"
                title={t("contactUs.title")}
                description={t("contactUs.description")}
              />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
