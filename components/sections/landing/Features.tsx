"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Marquee from "@/components/ui/marquee";
import { FEATURES_LIST } from "@/constants/landing/features";
import { FeatureItem } from "@/components/landing/FeatureItem";
import FeaturesHighlight from "@/components/landing/FeaturesHighlight";
import { IconCommand } from "@tabler/icons-react";
import { FEATURES_HIGHLIGHT_LIST } from "@/constants/landing/highlights";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/shared/SectionHeader";

export const Features = () => {
  const { inView, ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("featuresSection");

  const firstRow = FEATURES_LIST.slice(0, FEATURES_LIST.length / 2);

  return (
    <section ref={ref} className="overflow-x-clip pt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-5 lg:px-40"
      >
        <SectionHeader section="featuresSection" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10"
        >
          <div className="relative flex w-full select-none flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:15s]">
              {firstRow.map((feature) => (
                <FeatureItem key={feature.label} {...feature} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:15s]">
              {firstRow.map((feature) => (
                <FeatureItem key={feature.label} {...feature} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </motion.div>

        <div className="mt-6">
          <div className="relative flex w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-background dark:bg-grid-white/[0.2]">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"></div>
            <div className="relative grid h-full place-items-center gap-20 p-12 md:grid-cols-2 lg:gap-32 lg:p-32">
              {FEATURES_HIGHLIGHT_LIST.map((feature, index) => (
                <motion.div
                  key={feature.header}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                  }}
                >
                  <FeaturesHighlight
                    icon={feature.icon || <IconCommand className="h-6 w-6" />}
                    header={t(feature.header)}
                    description={t(feature.description)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
