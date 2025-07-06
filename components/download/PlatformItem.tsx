import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface PlatformItemProps {
  title: string;
  href: string;
  iconSrc: string;
  className?: string;
}

export const PlatformItem = ({
  title,
  href,
  iconSrc,
  className,
}: Readonly<PlatformItemProps>) => {
  return (
    <Link
      className={cn("min-h-[14rem]", className)}
      href={href}
      aria-label={`Link to ${title}`}
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-xl p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <Image
            src={iconSrc}
            alt={`${title} platform icon`}
            width={32}
            height={32}
            className="invert dark:invert-0"
            priority={true}
          />
          <h3 className="-tracking-4 text-balance pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-black dark:text-white md:text-2xl/[1.875rem]">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};
