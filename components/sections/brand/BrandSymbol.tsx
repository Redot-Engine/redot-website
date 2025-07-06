import { MotionSection } from "@/components/shared/MotionSection";
import SectionHeader from "@/components/shared/SectionHeader";
import LogoVariation from "@/components/brand/LogoVariation";
import {
  containerVariants,
  itemVariants,
} from "@/components/shared/animations";
import { motion } from "motion/react";
import { SYMBOL_VARIATIONS } from "@/constants/brand/symbol";

export const BrandSymbol = () => {
  return (
    <MotionSection className="pt-24">
      <SectionHeader section="brand.symbol" id="symbol" />
      <motion.div
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {SYMBOL_VARIATIONS.map((variation, index) => (
          <motion.div key={variation.id} variants={itemVariants} custom={index}>
            <LogoVariation {...variation} />
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
};
