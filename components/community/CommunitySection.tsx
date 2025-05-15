import { useTranslations } from "next-intl";
import { CommunityCard } from "@/components/community/CommunityCard";
import { motion } from "motion/react";
import { cardVariants } from "@/components/shared/animations";

interface CommunitySectionProps {
  titleKey: string;
  items: {
    imageUrl: string;
    label: string;
    description: string;
    href: string;
  }[];
  inView: boolean;
}

export const CommunitySection = ({
  titleKey,
  items,
  inView,
}: CommunitySectionProps) => {
  const t = useTranslations("community");
  const MAX_DELAY = 0.8;

  return (
    <div className="flex flex-col gap-8">
      <h2 className="mt-5 text-left text-3xl font-bold tracking-tighter md:text-4xl">
        {t(titleKey)}
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map(({ imageUrl, label, description, href }, index) => {
          const delay = Math.min(index * 0.2, MAX_DELAY);
          return (
            <motion.div
              key={label}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ duration: 0.5, delay }}
            >
              <CommunityCard
                imageUrl={imageUrl}
                label={label}
                description={t(description)}
                href={href}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
