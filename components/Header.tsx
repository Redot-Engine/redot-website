import Banner from "@/components/Banner";
import Link from "next/link";
import Image from "next/image";
import { header } from "@/constants/header";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/MobileSidebar";
import { useTranslations } from "next-intl";
import { IconArrowUpRight } from "@tabler/icons-react";

export const Header = () => {
  const t = useTranslations("header");

  return (
    <header className="sticky top-0 z-[50] w-full backdrop-blur-sm">
      <Banner
        subMessage={t("banner.subMessage")}
        mainMessage={t("banner.mainMessage")}
        link="https://www.redotengine.org/news/release-4-3-stable"
      />
      <div className="py-5">
        <div className="w-full px-5 lg:px-40">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="border-white-800 rounded-md border bg-white p-2"
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
                  <Link
                    key={link.label}
                    className="flex items-center text-base font-medium text-black/60 transition-colors duration-300 hover:text-black"
                    href={link.href}
                    target={link.newTab ? "_blank" : "_self"}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                  >
                    {t(link.label)}
                    {link.newTab && (
                      <IconArrowUpRight className="ml-2 h-4 w-4" />
                    )}
                  </Link>
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
