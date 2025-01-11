"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { links } from "@/constants/links";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const DownloadInformation = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("downloadInformation");

  return (
    <section ref={ref} className="overflow-x-clip pb-12 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-5 lg:px-40"
      >
        <div className="flex flex-col items-center justify-center gap-16">
          {/* System Requirements Section */}
          <div className="mb-8 grid grid-flow-row grid-cols-12 place-items-center gap-4 lg:grid-flow-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="relative col-span-12 flex h-full w-full flex-col items-center md:col-span-6 md:col-start-1 md:items-start"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src="https://image.redotengine.org/requirements.avif"
                  alt={t("systemRequirements.title")}
                  className="h-auto w-full rounded-lg object-cover"
                  fill
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative col-span-12 px-0 pb-6 md:col-span-5 md:col-start-8 md:px-5 md:pb-0"
            >
              <div className="flex w-full flex-col justify-center gap-4">
                <h3 className="text-2xl font-bold md:text-3xl">
                  {t("systemRequirements.title")}
                </h3>
                <p className="flex flex-col gap-2 text-base text-muted-foreground">
                  {t("systemRequirements.description.general")}
                  {t("systemRequirements.description.dotnet")}
                  <Link
                    aria-label={t("systemRequirements.description.dotnetLink")}
                    className="underline underline-offset-4 transition-all duration-300 hover:text-black/80 dark:hover:text-white/80"
                    href="https://dotnet.microsoft.com/en-us/download"
                  >
                    {t("systemRequirements.description.dotnetLink")}
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          {/* About Section */}
          <div className="grid grid-flow-row grid-cols-12 place-items-center gap-4 lg:grid-flow-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="relative col-span-12 flex h-full w-full flex-col items-center md:col-span-6 md:col-start-7 md:items-start"
            >
              <div className="relative order-first aspect-video w-full overflow-hidden md:order-none">
                <Image
                  src="https://image.redotengine.org/productImage.webp"
                  alt={t("about.title")}
                  className="h-auto w-full rounded-lg object-cover"
                  fill
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative col-span-12 px-0 pb-6 md:col-span-5 md:col-start-1 md:px-5 md:pb-0"
            >
              <div className="flex w-full flex-col justify-center gap-4">
                <h3 className="w-full text-2xl font-bold md:text-3xl">
                  {t("about.title")}
                </h3>
                <p className="flex flex-col gap-2 text-base text-muted-foreground">
                  {t("about.description")}
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Button asChild>
                    <Link
                      className="h-fit text-wrap"
                      href={
                        links.documentation +
                        "en/stable/about/introduction#about-redot-engine"
                      }
                    >
                      {t("about.learnMoreButton")}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
