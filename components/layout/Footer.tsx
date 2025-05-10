"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FOOTER_SOCIALS } from "@/constants/common/socials";
import { LINKS } from "@/constants/common/links";
import { footer } from "@/constants/layout/footer";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { SharedNavLink } from "@/components/shared/SharedNavLink";

export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="relative bottom-0 z-[50] w-full bg-black text-white">
      <div className="px-10 py-16 lg:px-40">
        <div className="flex flex-col gap-10">
          <div className="mb-2 flex flex-col justify-between gap-6 md:flex-row">
            <div className="flex flex-col gap-8">
              <LanguageSwitcher />
              <div className="flex flex-row gap-4">
                {FOOTER_SOCIALS.map((social) => (
                  <Link
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`/socials/${social.icon}`}
                      alt={`${social.icon} logo`}
                      width={28}
                      height={28}
                      className="opacity-60 transition-all duration-300 hover:opacity-70"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16 lg:grid-cols-3">
              {footer.map((category) => (
                <div key={category.title} className="text-sm">
                  <h3 className="font-medium text-white/80">
                    {t(category.title)}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {category.children?.map((item) => (
                      <li key={item.title}>
                        <SharedNavLink
                          href={item.href ?? "#"}
                          className="text-white/60 transition duration-300 hover:text-white"
                          label={t(item.title)}
                          newTab={item.newTab}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Separator className="bg-white/30" />

            <div className="flex flex-wrap items-center justify-between gap-8">
              <Image
                src="/logo.webp"
                alt="Redot Engine Logo"
                width={36}
                height={36}
              />

              <span className="order-first w-full text-center text-sm text-white/60 md:order-none md:w-auto">
                {t("copyright.text")}&nbsp;
                <span className="block lg:inline">
                  {t("copyright.website")}&nbsp;
                  <Link
                    href={LINKS.websiteGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition-all duration-300 hover:text-white/70"
                  >
                    {t("copyright.sourceCode")}
                  </Link>
                </span>
              </span>

              <div className="flex flex-row gap-4">
                <ModeToggle />
                <Button variant="secondary" asChild>
                  <Link href="/settings">{t("buttons.settings")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
