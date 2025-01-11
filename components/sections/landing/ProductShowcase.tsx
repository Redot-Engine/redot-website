"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import SectionHeader from "@/components/SectionHeader";

export const ProductShowcase = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="overflow-x-clip bg-gradient-to-b from-[#FFD2D2] to-[#fff] py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-5 lg:px-40"
      >
        <SectionHeader section="productShowcaseSection" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative mx-5 mt-10 aspect-video h-full lg:mx-24"
        >
          <Image
            src="https://image.redotengine.org/productImage.webp"
            alt="Product Image"
            className="h-auto w-full rounded-lg object-cover sm:w-auto"
            fill
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
