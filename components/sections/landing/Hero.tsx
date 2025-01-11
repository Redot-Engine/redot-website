"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import Head from "next/head";
import { links } from "@/constants/links";
import { useTranslations } from "next-intl";
import useOS from "@/hooks/useOS";

export const Hero = () => {
  const t = useTranslations("heroSection");
  const os = useOS();

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://image.redotengine.org/cover.webp"
          imageSrcSet="https://image.redotengine.org/cover.webp 1x"
          type="image/webp"
        />
      </Head>
      <section className="bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#FF4E40,#FFFFFF_80%)] pb-20 pt-8 dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#7D0000,transparent_56%)]">
        <div className="px-5 lg:px-40">
          <div className="grid grid-cols-1 place-content-between gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <motion.h1
                className="mt-6 bg-gradient-to-b from-black to-[#7F0000] bg-clip-text pb-6 text-5xl font-bold tracking-tighter text-transparent dark:from-white dark:to-white md:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                dangerouslySetInnerHTML={{ __html: t("heading") }}
              />

              <motion.p
                className="text-xl tracking-tight dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t("description")}
              </motion.p>

              <div className="mt-[38px] flex flex-col items-center gap-1 md:flex-row">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="w-full md:w-auto"
                >
                  <Button asChild className="w-full md:w-auto">
                    <Link href="/download">
                      {t("buttons.primary", {
                        os: os
                          ? os.charAt(0).toUpperCase() + os.slice(1)
                          : "Unknown",
                      })}
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full md:w-auto"
                >
                  <Button variant="link" asChild className="w-full md:w-auto">
                    <Link href={links.documentation}>
                      {t("buttons.secondary")}
                      <IconArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="relative md:col-span-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <video
                width="1200"
                height="800"
                className="h-auto w-full rounded-lg object-cover md:h-full"
                loop
                autoPlay
                muted
                controls={false}
                preload="none"
              >
                <source
                  src="https://image.redotengine.org/Games%20are%20made%20with%20Redot%20Engine%202024%20Without%20outro.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
