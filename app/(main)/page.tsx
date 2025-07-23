"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/landing/Hero";
import { ProductShowcase } from "@/components/sections/landing/ProductShowcase";
import { TextReveal } from "@/components/ui/text-reveal";
import { useTranslations } from "next-intl";

const Features = dynamic(() =>
  import("@/components/sections/landing/Features").then((mod) => mod.Features)
);

const Review = dynamic(() =>
  import("@/components/sections/landing/Review").then((mod) => mod.Review)
);

const Blog = dynamic(() =>
  import("@/components/sections/landing/Blog").then((mod) => mod.Blog)
);

const Start = dynamic(() =>
  import("@/components/sections/landing/Start").then((mod) => mod.Start)
);

export default function Landing() {
  const t = useTranslations("textRevealSection");

  return (
    <main>
      <Hero />
      <ProductShowcase />
      <TextReveal text={t("body")} />
      <Features />
      <Blog />
      <Review />
      <Start />
    </main>
  );
}
