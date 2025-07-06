"use client";

import { Start } from "@/components/sections/landing/Start";
import TextFetcher from "@/components/shared/TextFetcher";
import { SectionHero } from "@/components/shared/SectionHero";

const PRIVACY_URL =
  "https://raw.githubusercontent.com/Redot-Experimental/policies/refs/heads/master/privacy.txt";

export default function Privacy() {
  return (
    <div>
      <SectionHero section="privacy" />
      <div className="mt-24 flex flex-col gap-8 px-5 lg:px-40">
        <TextFetcher
          url={PRIVACY_URL}
          className="prose max-w-none dark:prose-invert"
        />
      </div>
      <Start />
    </div>
  );
}
