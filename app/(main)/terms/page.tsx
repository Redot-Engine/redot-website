import TextFetcher from "@/components/shared/TextFetcher";
import { Start } from "@/components/sections/landing/Start";
import { SectionHero } from "@/components/shared/SectionHero";

const TERMS_URL =
  "https://raw.githubusercontent.com/Redot-Experimental/policies/refs/heads/master/terms.txt";

export default function Terms() {
  return (
    <div>
      <SectionHero section="terms" />
      <div className="mt-24 flex flex-col gap-8 px-5 lg:px-40">
        <TextFetcher
          url={TERMS_URL}
          className="prose max-w-none dark:prose-invert"
        />
      </div>
      <Start />
    </div>
  );
}
