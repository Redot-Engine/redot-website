import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

interface SectionHeroProps {
  section: string;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHero = ({
  section,
  className,
  children,
}: Readonly<SectionHeroProps>) => (
  <div className="relative flex w-full items-start justify-center bg-white bg-grid-black/[0.1] dark:bg-background dark:bg-grid-white/[0.1]">
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"></div>
    <div className={cn("relative z-20 px-5 pb-5 pt-10 lg:px-40", className)}>
      <SectionHeader section={section} />
      {children}
    </div>
  </div>
);
