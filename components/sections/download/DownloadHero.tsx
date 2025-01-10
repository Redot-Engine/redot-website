"use client";

import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { links } from "@/constants/links";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  getMonoPlatformDownloadLink,
  getPlatformDownloadLink,
} from "@/lib/platformDownloadLink";

export const DownloadHero = ({ platform }: { platform: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("downloadHero");

  const platformIcons = {
    windows: "windows",
    mac: "apple",
    apple: "apple",
    linux: "linux",
    android: "android",
    ios: "apple",
  };

  return (
    <div className="px-5 lg:px-40">
      <section
        ref={ref}
        className="rinvert rounded-xl bg-[url('https://image.redotengine.org/darkCover.png')] bg-cover bg-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-9xl mx-auto flex flex-col justify-center gap-8 px-8 py-16 md:px-12"
        >
          <div className="flex max-w-[700px] flex-col gap-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-sm font-light uppercase tracking-[0.15em] text-white/80 md:text-base"
            >
              {t("downloadForOS", { platform })}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-bold md:text-3xl"
            >
              {t("igniteYourImagination")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-white/80 md:text-base"
            >
              {t("downloadDescription")}
            </motion.p>
          </div>
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full md:w-auto"
            >
              <Button
                variant="secondary"
                size="sm"
                className="w-full md:w-auto"
                asChild
              >
                <div className="flex items-center">
                  <Link href={getPlatformDownloadLink(platform)}>
                    {t("buttons.downloadLatest")}
                  </Link>
                  <Image
                    src={`/platform/${platformIcons[platform as keyof typeof platformIcons]}.svg`}
                    alt="OS Logo"
                    width={16}
                    height={16}
                  />
                </div>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full md:w-auto"
            >
              <Button
                variant="secondary"
                className="w-full invert md:w-auto"
                size="sm"
              >
                <Link href={getMonoPlatformDownloadLink(platform)}>
                  {t("buttons.downloadMono")}
                </Link>
                <Image
                  src={`/platform/${platformIcons[platform as keyof typeof platformIcons]}.svg`}
                  alt="OS Logo"
                  width={16}
                  height={16}
                />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="w-full md:w-auto"
            >
              <Button
                size="sm"
                variant="link"
                className="dark w-full md:w-auto"
              >
                <Link
                  href={links.releasePage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("buttons.moreDownloadOptions")}
                </Link>
                <IconArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
