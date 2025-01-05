import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

interface HeaderSelectionProps {
  section: string;
}

export default function HeaderSection({ section }: HeaderSelectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations(section);

  return (
    <>
      <div className="mx-auto max-w-[540px]" ref={ref}>
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex h-9 items-center rounded-md border border-input bg-background px-3 text-center text-sm font-medium hover:bg-accent"
          >
            {t("badge")}
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5 text-center text-4xl font-bold tracking-tighter md:text-[54px] md:leading-[60px]"
          dangerouslySetInnerHTML={{ __html: t("title") }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-5 text-center text-xl tracking-tighter text-black/60 md:text-[22px] md:leading-[30px]"
        >
          {t("description")}
        </motion.p>
      </div>
    </>
  );
}
