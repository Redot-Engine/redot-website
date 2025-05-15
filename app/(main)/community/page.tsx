"use client";

import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { Start } from "@/components/sections/landing/Start";
import { CommunityCard } from "@/components/community/CommunityCard";
import { motion } from "motion/react";
import {
  COMMUNITY_LINKS,
  COMMUNITY_SPACES,
  SUPPORT_CONTRIBUTIONS,
} from "@/constants/common/socials";
import { SectionHero } from "@/components/shared/SectionHero";
import { cardVariants } from "@/components/shared/animations";

export default function Community() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const t = useTranslations("community");

  return (
    <div ref={ref}>
      <SectionHero section="community" />
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
        className="mt-24 px-5 lg:px-40"
      >
        <div className="flex flex-col gap-8">
          {/* Social Platforms */}
          <div className="flex flex-col gap-8">
            <h2 className="mt-5 text-left text-3xl font-bold tracking-tighter md:text-4xl">
              {t("socialPlatforms")}
            </h2>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {COMMUNITY_LINKS.map(
                ({ imageUrl, label, description, href }, index) => (
                  <motion.div
                    key={label}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                    }}
                  >
                    <CommunityCard
                      imageUrl={imageUrl}
                      label={label}
                      description={t(description)}
                      href={href}
                    />
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Community Spaces */}
          <div className="flex flex-col gap-8">
            <h2 className="mt-5 text-left text-3xl font-bold tracking-tighter md:text-4xl">
              {t("communitySpaces")}
            </h2>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {COMMUNITY_SPACES.map(
                ({ imageUrl, label, description, href }, index) => (
                  <motion.div
                    key={label}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                    }}
                  >
                    <CommunityCard
                      imageUrl={imageUrl}
                      label={label}
                      description={t(description)}
                      href={href}
                    />
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Support and Contributions */}
          <div className="flex flex-col gap-8">
            <h2 className="mt-5 text-left text-3xl font-bold tracking-tighter md:text-4xl">
              {t("supportAndContributions")}
            </h2>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {SUPPORT_CONTRIBUTIONS.map(
                ({ imageUrl, label, description, href }, index) => (
                  <motion.div
                    key={label}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={cardVariants}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                    }}
                  >
                    <CommunityCard
                      imageUrl={imageUrl}
                      label={label}
                      description={t(description)}
                      href={href}
                    />
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <Start />
    </div>
  );
}
