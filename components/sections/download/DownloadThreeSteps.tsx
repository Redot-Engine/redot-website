"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import SectionHeader from "@/components/SectionHeader";
import { ThreeStepsItem } from "@/components/download/ThreeStepsItem";
import { links } from "@/constants/links";
import { socialsLinks } from "@/constants/socials";
import { getPlatformDownloadLink } from "@/lib/platformDownloadLink";
import { useTranslations } from "next-intl";

export const DownloadThreeSteps = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("downloadThreeSteps");

  return (
    <section ref={ref} className="overflow-x-clip pt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-5 lg:px-40"
      >
        <SectionHeader section="downloadThreeSteps" />

        <div className="mt-10 grid grid-cols-12 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <ThreeStepsItem
              title={t("steps.step1.title")}
              description={t("steps.step1.description")}
              links={[
                {
                  text: t("steps.step1.links.archive"),
                  url: links.releasePage,
                },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <ThreeStepsItem
              title={t("steps.step2.title")}
              description={t("steps.step2.description")}
              links={[
                {
                  text: t("steps.step2.links.windows"),
                  url: getPlatformDownloadLink("windows"),
                },
                {
                  text: t("steps.step2.links.mac"),
                  url: getPlatformDownloadLink("mac"),
                },
                {
                  text: t("steps.step2.links.linux"),
                  url: getPlatformDownloadLink("linux"),
                },
                {
                  text: t("steps.step2.links.android"),
                  url: getPlatformDownloadLink("android"),
                },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <ThreeStepsItem
              title={t("steps.step3.title")}
              description={t("steps.step3.description")}
              links={[
                {
                  text: t("steps.step3.links.discord"),
                  url: socialsLinks.discord,
                },
              ]}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
