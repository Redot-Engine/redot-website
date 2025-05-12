"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/constants/common/links";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

export const DownloadOverview = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("downloadOverview");

  return (
    <section
      ref={ref}
      className="overflow-x-clip bg-background pb-20 pt-32"
      aria-labelledby="download-overview-title"
    >
      <div className="px-5 lg:px-40">
        <div className="flex flex-col items-center justify-center gap-12 md:gap-24">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-2 flex flex-col justify-center space-y-6 md:order-1"
            >
              <h3 className="text-3xl font-bold tracking-tighter md:text-5xl">
                {t("systemRequirements.title")}
              </h3>
              <div className="text-md flex flex-col gap-4 text-muted-foreground">
                <p>{t("systemRequirements.description")}</p>
                <Link
                  aria-label={t("systemRequirements.dotnetLink")}
                  className="flex items-center gap-2 text-orange-400 underline-offset-4 hover:underline"
                  href="https://dotnet.microsoft.com/en-us/download"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t("systemRequirements.dotnetLink")}</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="order-1 md:order-2"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src="https://image.redotengine.org/requirements.avif"
                  alt={t("systemRequirements.title")}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="order-1"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src="https://image.redotengine.org/productImage.webp"
                  alt={t("about.title")}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-2 flex flex-col justify-center space-y-6"
            >
              <h3 className="mt-5 text-3xl font-bold tracking-tighter md:text-5xl">
                {t("about.title")}
              </h3>
              <p className="text-md text-muted-foreground">
                {t("about.description")}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button asChild>
                  <Link
                    className="inline-flex items-center gap-2"
                    href={
                      LINKS.documentation +
                      "en/stable/about/introduction#about-redot-engine"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{t("about.learnMoreButton")}</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
