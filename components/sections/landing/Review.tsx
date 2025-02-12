"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ReviewCard } from "@/components/landing/ReviewCard";
import Marquee from "@/components/ui/marquee";
import SectionHeader from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import { fetchAllReviews } from "@/lib/review";
import { InterfaceReview } from "@/sanity/schemaTypes/reviewType";

export const Review = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchAllReviews();
      setReviews(data);
    };

    getReviews();
  }, []);

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <section ref={ref} className="bg-background overflow-x-clip pt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-5 lg:px-40"
      >
        <SectionHeader section="reviewSection" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10"
        >
          <div className="hidden md:block">
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:30s]">
                {firstRow.map((review: InterfaceReview) => (
                  <ReviewCard
                    key={review.username.current}
                    className="w-64"
                    {...review}
                  />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:30s]">
                {secondRow.map((review: InterfaceReview) => (
                  <ReviewCard
                    key={review.username.current}
                    className="w-64"
                    {...review}
                  />
                ))}
              </Marquee>
              <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-white"></div>
              <div className="dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-white"></div>
              <div className="absolute top-1/4 left-1/4 -z-5 h-28 w-28 rounded-full bg-rose-500/80 blur-[6rem]"></div>
              <div className="absolute top-1/4 right-1/4 -z-5 h-28 w-28 rounded-full bg-rose-500/80 blur-[6rem]"></div>
            </div>
          </div>
          <div className="block md:hidden">
            <div className="relative flex h-[30rem] flex-row items-center justify-center overflow-hidden">
              <Marquee
                pauseOnHover
                vertical
                className="h-[30rem] w-full [--duration:30s]"
              >
                {firstRow.map((review: InterfaceReview) => (
                  <ReviewCard
                    key={review.username.current}
                    className="w-full"
                    {...review}
                  />
                ))}
              </Marquee>
              <div className="dark:from-background pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-white"></div>
              <div className="dark:from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-white"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
