import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { sectionVariants } from "@/components/shared/animations";
import { cn } from "@/lib/utils";

export function MotionSection({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className={cn("overflow-x-clip", className)} {...props}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
        className="px-5 lg:px-40"
      >
        {children}
      </motion.div>
    </section>
  );
}
