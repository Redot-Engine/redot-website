"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MascotImage } from "@/components/shared/MascotImage";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("blog.notFound");

  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex-grow overflow-x-clip bg-gradient-to-b from-[#ffffff] to-[#FFD2D2] py-32 dark:from-background dark:to-[#9F1E1E]/20">
        <div className="mx-auto max-w-[540px]">
          <div className="flex flex-col items-center justify-center gap-6">
            <MascotImage />
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="space-y-2">
                <h2 className="text-center text-4xl font-bold tracking-tighter md:text-[54px] md:leading-[60px]">
                  {t("title")}
                </h2>
                <p className="text-center text-xl tracking-tighter text-muted-foreground md:text-[22px] md:leading-[30px]">
                  {t("description")}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.back()}
                asChild
              >
                <Link href="#" onClick={() => router.back()}>
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
    </section>
  );
}
