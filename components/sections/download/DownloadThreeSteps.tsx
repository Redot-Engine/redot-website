"use client";

import { motion } from "motion/react";
import SectionHeader from "@/components/SectionHeader";
import { StepsItem } from "@/components/download/StepsItem";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { stepsData } from "@/constants/download";
import {
  containerVariants,
  itemVariants,
} from "@/components/shared/animations";
import { MotionSection } from "@/components/shared/MotionSection";

export const DownloadThreeSteps = () => {
  const t = useTranslations("downloadThreeSteps");

  return (
    <MotionSection className="pt-24">
      <SectionHeader section="downloadThreeSteps" id="download-steps-header" />
      <motion.div
        variants={containerVariants}
        className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 md:flex-row md:items-stretch lg:gap-8"
      >
        {stepsData
          .flatMap((step, index) => {
            const stepElement = (
              <motion.div
                key={`step-${step.titleKey}`}
                custom={index}
                variants={itemVariants}
                className="flex flex-1"
              >
                <StepsItem
                  title={t(step.titleKey)}
                  description={t(step.descriptionKey)}
                  links={step.links.map((link, linkIndex) => ({
                    key: `step-${index}-link-${linkIndex}`,
                    icon: link.icon,
                    text: t(link.textKey),
                    url: link.url,
                  }))}
                />
              </motion.div>
            );

            const separatorElement = index < stepsData.length - 1 && (
              <div
                key={`separator-${step.titleKey}`}
                className="hidden items-center justify-center md:flex"
                aria-hidden="true"
              >
                <Separator
                  orientation="vertical"
                  className="h-full bg-border"
                />
              </div>
            );
            return [stepElement, separatorElement];
          })
          .filter(Boolean)}
      </motion.div>
    </MotionSection>
  );
};
