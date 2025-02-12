"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("articleNotFound");

  return (
    <section className="flex min-h-screen flex-col">
      <div className="dark:from-background grow overflow-x-clip bg-linear-to-b from-[#ffffff] to-[#FFD2D2] py-32 dark:to-[#9F1E1E]/20">
        <div className="mx-auto max-w-[540px]">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="https://image.redotengine.org/redotchan.png"
              alt="Redotchan"
              width={160}
              height={160}
            />
            <div className="flex flex-col">
              <h2 className="mt-5 text-center text-4xl font-bold tracking-tighter md:text-[54px] md:leading-[60px]">
                {t("title")}
              </h2>
              <p className="text-muted-foreground mt-5 text-center text-xl tracking-tighter md:text-[22px] md:leading-[30px]">
                {t("description")}
              </p>
            </div>
            <Button asChild>
              <Link href="/blog">{t("backButton")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
