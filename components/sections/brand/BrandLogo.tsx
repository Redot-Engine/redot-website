import { MotionSection } from "@/components/shared/MotionSection";
import SectionHeader from "@/components/shared/SectionHeader";
import LogoVariation from "@/components/brand/LogoVariation";
import {
  containerVariants,
  itemVariants,
} from "@/components/shared/animations";
import { LOGO_VARIATIONS } from "@/constants/brand/logo";
import { motion } from "motion/react";

export const BrandLogo = () => {
  return (
    <MotionSection className="pt-24">
      <SectionHeader section="brand.logo" id="logo" />
      <motion.div
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {LOGO_VARIATIONS.map((variation, index) => (
          <motion.div key={variation.id} variants={itemVariants} custom={index}>
            <LogoVariation {...variation} />
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
};
