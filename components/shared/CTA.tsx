"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ButtonLink {
  readonly href: string;
  readonly labelKey: string;
  readonly variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
}

interface SectionWithButtonsProps {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly buttonLinks: readonly ButtonLink[];
  readonly additionalClassNames?: string;
}

export const CTA = ({
  titleKey,
  descriptionKey,
  buttonLinks,
  additionalClassNames = "",
}: SectionWithButtonsProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations();

  return (
    <section
      ref={ref}
      className={cn(
        "overflow-x-clip bg-gradient-to-b from-[#ffffff] to-[#FFD2D2] py-20 dark:from-background dark:to-[#9F1E1E]/20 md:py-36",
        additionalClassNames
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-5 lg:px-40"
      >
        <div className="mx-auto max-w-[540px] space-y-8">
          <div className="space-y-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-b from-black to-[#7F0000] bg-clip-text py-1 text-center text-4xl font-bold tracking-tighter text-transparent dark:from-white dark:to-white md:text-6xl"
            >
              {t(titleKey)}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center text-lg tracking-tighter text-muted-foreground md:text-xl"
            >
              {t(descriptionKey)}
            </motion.p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            {buttonLinks.map(({ href, labelKey, variant }, index) => (
              <motion.div
                key={labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="w-full md:w-auto"
              >
                <Button
                  className="w-full md:w-auto"
                  size="lg"
                  variant={variant}
                  asChild
                >
                  <Link href={href}>
                    {t(labelKey)}
                    {index === 1 && <IconArrowRight className="h-5 w-5" />}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
