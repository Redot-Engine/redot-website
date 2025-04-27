"use client";

import { motion } from "motion/react";
import SectionHeader from "@/components/SectionHeader";
import { PlatformItem } from "@/components/download/PlatformItem";
import { supportedPlatformsData } from "@/constants/download";
import { itemVariants } from "@/components/shared/animations";
import { MotionSection } from "@/components/shared/MotionSection";

export const DownloadSupportedPlatform = () => {
  return (
    <MotionSection className="pt-24">
      <SectionHeader
        section="downloadSupportedPlatform"
        id="download-supported-platform-header"
      />
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {supportedPlatformsData.map((platform, index) => (
          <motion.div
            key={platform.label}
            custom={index}
            variants={itemVariants}
          >
            <PlatformItem
              title={platform.label}
              href={platform.href}
              iconSrc={platform.icon}
            />
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
};
