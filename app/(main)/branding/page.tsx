"use client";

import { Start } from "@/components/sections/landing/Start";
import { SectionHero } from "@/components/shared/SectionHero";
import { BrandLogo } from "@/components/sections/brand/BrandLogo";
import { AnimatedButton } from "@/components/ui/animated-button";
import { IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { LINKS } from "@/constants/common/links";
import { BrandSymbol } from "@/components/sections/brand/BrandSymbol";
import { BrandClearspace } from "@/components/sections/brand/BrandClearspace";
import { BrandColors } from "@/components/sections/brand/BrandColors";
import { BrandLegalGuidelines } from "@/components/sections/brand/BrandLegalGuidelines";
import { useTranslations } from "next-intl";

export default function Branding() {
  const t = useTranslations("brand");

  return (
    <>
      <SectionHero
        section="brand"
        className="flex flex-col items-center gap-4 md:gap-8"
      >
        <AnimatedButton
          pressEffect="medium"
          hoverEffect="grow"
          transitionSpeed="fast"
          size="lg"
          asChild
        >
          <Link href={LINKS.pressKit}>
            <IconDownload className="mr-2 h-5 w-5" />
            {t("downloadPressKit")}
          </Link>
        </AnimatedButton>
      </SectionHero>
      <BrandLogo />
      <BrandSymbol />
      <BrandClearspace />
      <BrandColors />
      <BrandLegalGuidelines />
      <Start />
    </>
  );
}
