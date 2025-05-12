"use client";

import Link from "next/link";
import Image from "next/image";
import { header } from "@/constants/layout/header";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { useTranslations } from "next-intl";
import { SharedNavLink } from "@/components/shared/SharedNavLink";
import LatestBanner from "@/components/layout/LatestBanner";

export const Header = () => {
  const t = useTranslations("header");

  return (
    <header className="sticky top-0 z-[50] w-full backdrop-blur-sm">
      <LatestBanner />
      <div className="py-5">
        <div className="w-full px-5 lg:px-40">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="select-none rounded-md border border-slate-800 bg-black p-2"
            >
              <Image
                src="/logo.webp"
                alt="Redot Engine Logo"
                width={30}
                height={30}
              />
            </Link>
            <div className="hidden md:block">
              <nav className="flex items-center gap-4 md:gap-8">
                {header.map((link) => (
                  <SharedNavLink
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
                    label={t(link.label)}
                    newTab={link.newTab}
                  />
                ))}
                <Button asChild>
                  <Link href="/download">{t("downloadButton")}</Link>
                </Button>
              </nav>
            </div>
            <div className="block md:hidden">
              <MobileSidebar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
