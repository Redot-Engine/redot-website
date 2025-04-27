"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type Alignment = "left" | "center" | "right";

interface SectionHeaderProps {
  readonly id?: string;
  readonly section?: string;
  readonly badge?: string;
  readonly title?: string;
  readonly description?: string;
  readonly badgeAlignment?: Alignment;
  readonly titleAlignment?: Alignment;
  readonly descriptionAlignment?: Alignment;
  readonly maxWidth?: string | number;
}

export default function SectionHeader({
  id,
  section,
  badge,
  title,
  description,
  badgeAlignment = "center",
  titleAlignment = "center",
  descriptionAlignment = "center",
  maxWidth = 540,
}: Readonly<SectionHeaderProps>) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations(section ?? "");

  const getTranslation = (key: string) => {
    if (t) {
      try {
        return t(key);
      } catch {
        console.warn(
          `Translation key "${key}" not found in section "${section}"`
        );
        return null;
      }
    }
    return null;
  };

  const badgeContent = getTranslation("badge") ?? badge;
  const titleContent = getTranslation("title") ?? title;
  const descriptionContent = getTranslation("description") ?? description;

  const badgeJustifyClass = cn({
    "justify-start": badgeAlignment === "left",
    "justify-center": badgeAlignment === "center",
    "justify-end": badgeAlignment === "right",
  });

  const titleTextAlignClass = cn({
    "text-left": titleAlignment === "left",
    "text-center": titleAlignment === "center",
    "text-right": titleAlignment === "right",
  });

  const descriptionTextAlignClass = cn({
    "text-left": descriptionAlignment === "left",
    "text-center": descriptionAlignment === "center",
    "text-right": descriptionAlignment === "right",
  });

  const maxWidthClass =
    typeof maxWidth === "number"
      ? `max-w-[${maxWidth}px]`
      : `max-w-[${maxWidth}]`;

  return (
    <div id={id} className={cn("mx-auto", maxWidthClass)} ref={ref}>
      {badgeContent && (
        <div className={cn("flex", badgeJustifyClass)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex h-8 items-center rounded-md border border-input bg-background px-3 font-sans text-sm font-medium"
          >
            {badgeContent}
          </motion.div>
        </div>
      )}

      {titleContent && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={cn(
            "mt-5 text-4xl font-bold tracking-tighter md:text-[54px] md:leading-[60px]",
            titleTextAlignClass
          )}
          dangerouslySetInnerHTML={{ __html: titleContent }}
        />
      )}

      {descriptionContent && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={cn(
            "mt-5 text-xl tracking-tighter text-muted-foreground md:text-[22px] md:leading-[30px]",
            descriptionTextAlignClass
          )}
        >
          {descriptionContent}
        </motion.p>
      )}
    </div>
  );
}
