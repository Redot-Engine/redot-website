"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import DownloadDialog from "@/components/download/DownloadDialog";

export const DownloadHero = ({ platform }: { platform: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [arch, setArch] = useState("");

  const detectArchitecture = useCallback(() => {
    const userAgent = navigator.userAgent;
    if (platform === "windows") {
      return userAgent.includes("WOW64") || userAgent.includes("Win64")
        ? "64"
        : "32";
    } else if (platform === "linux") {
      if (userAgent.includes("x86_64")) return "x86_64";
      if (userAgent.includes("i686")) return "x86_32";
      if (userAgent.includes("arm64")) return "arm64";
      return "x86_64";
    }
    return "universal";
  }, [platform]);

  useEffect(() => {
    setArch(detectArchitecture());
  }, [detectArchitecture]);

  const t = useTranslations("downloadHero");

  return (
    <section
      ref={ref}
      className="relative mx-5 overflow-hidden rounded-md py-20 md:mx-10 md:py-0 md:pt-24 lg:mx-40"
    >
      <Image
        src="https://image.redotengine.org/background.png"
        alt="Background"
        fill
        priority
        className="z-0 object-cover object-center"
        sizes="100vw"
        style={{ pointerEvents: "none" }}
      />
      <div className="relative z-10 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex flex-col items-center space-y-8 md:space-y-12"
        >
          <div className="mx-5 flex flex-col items-center gap-4 text-center md:gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold tracking-tighter text-primary-foreground dark:text-primary md:text-6xl lg:text-8xl"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto max-w-xl text-base text-white/80 md:text-lg"
            >
              {t("description")}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <DownloadDialog platform={platform} arch={arch} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-10 mt-10 hidden h-[250px] select-none md:block lg:mx-24"
        >
          <Image
            src="https://image.redotengine.org/downloadProduct.png"
            alt="Product Image"
            className="h-auto w-full rounded-t-lg object-cover object-top sm:w-auto"
            priority
            fill
          />
        </motion.div>
      </div>
    </section>
  );
};
