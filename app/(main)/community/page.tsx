"use client";

import { useInView } from "react-intersection-observer";
import { Start } from "@/components/sections/landing/Start";
import { motion } from "motion/react";
import {
  COMMUNITY_LINKS,
  COMMUNITY_SPACES,
  SUPPORT_CONTRIBUTIONS,
} from "@/constants/common/socials";
import { SectionHero } from "@/components/shared/SectionHero";
import { CommunitySection } from "@/components/community/CommunitySection";

export default function Community() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

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
          <CommunitySection
            titleKey="socialPlatforms"
            items={COMMUNITY_LINKS}
            inView={inView}
          />
          <CommunitySection
            titleKey="communitySpaces"
            items={COMMUNITY_SPACES}
            inView={inView}
          />
          <CommunitySection
            titleKey="supportAndContributions"
            items={SUPPORT_CONTRIBUTIONS}
            inView={inView}
          />
        </div>
      </motion.div>
      <Start />
    </div>
  );
}
