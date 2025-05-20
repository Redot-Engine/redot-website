import { MotionSection } from "@/components/shared/MotionSection";
import SectionHeader from "@/components/shared/SectionHeader";
import ColorSwatch from "@/components/brand/ColorSwatch";
import { motion } from "motion/react";
import {
  containerVariants,
  itemVariants,
} from "@/components/shared/animations";
import { COLOR_VARIATIONS } from "@/constants/brand/colors";

export const BrandColors = () => {
  return (
    <MotionSection className="pt-24">
      <SectionHeader section="brand.colors" id="colors" />
      <motion.div
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {COLOR_VARIATIONS.map((variation, index) => (
          <motion.div key={variation.id} variants={itemVariants} custom={index}>
            <ColorSwatch {...variation} />
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
};
