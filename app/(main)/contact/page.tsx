"use client";

import { ContactCard } from "@/components/contact/ContactCard";
import { CONTACT_CARDS_DATA } from "@/constants/contact/cards";
import { Start } from "@/components/sections/landing/Start";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { FAQ_LIST } from "@/constants/contact/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import { SectionHero } from "@/components/shared/SectionHero";
import { cardVariants } from "@/components/shared/animations";

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const t = useTranslations("contact");

  return (
    <div ref={ref}>
      <SectionHero section="contact" />
      <div className="mt-10 px-5 lg:px-40">
        <div className="grid grid-rows-3 gap-8 md:grid-cols-1 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1">
          {CONTACT_CARDS_DATA.map((card, index) => (
            <motion.div
              key={card.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              className="min-h-[14rem]"
            >
              <ContactCard
                icon={card.icon}
                title={t(`contactCard.${card.title}`)}
                description={t(`contactCard.${card.description}`)}
                links={card.links}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-24 px-5 lg:px-40">
        <div className="flex flex-col items-center gap-8">
          <h2 className="mt-5 text-center text-3xl font-bold tracking-tighter md:text-4xl">
            {t("faqTitle")}
          </h2>
          <Accordion type="single" className="w-full md:w-[600px]" collapsible>
            {FAQ_LIST.map((faq, index) => (
              <AccordionItem key={faq.questionKey} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left">
                  {t(`faq.${faq.questionKey}`)}
                </AccordionTrigger>
                <AccordionContent>{t(`faq.${faq.answerKey}`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Start />
    </div>
  );
}
