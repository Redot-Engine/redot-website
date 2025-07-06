import { MotionSection } from "@/components/shared/MotionSection";
import SectionHeader from "@/components/shared/SectionHeader";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const BrandClearspace = () => {
  const t = useTranslations("brand.clearspace");

  return (
    <MotionSection className="pt-24">
      <SectionHeader section="brand.clearspace" id="clearspace" />
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t("logoClearspace")}</h3>
          <div className="flex h-[300px] items-center justify-center rounded-lg bg-zinc-900 p-8">
            <Image
              src="/brand/logo/redot-logo-clear-space.svg"
              alt="Logo Clearspace"
              width={800}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t("symbolClearspace")}</h3>
          <div className="flex h-[300px] items-center justify-center rounded-lg bg-zinc-900 p-8">
            <Image
              src="/brand/symbol/redot-symbol-clear-space.svg"
              alt="Symbol Clearspace"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
};
