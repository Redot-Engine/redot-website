import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  links: { label: string; url: string }[];
  direction?: "row" | "col";
}

export const ContactCard = ({
  icon,
  title,
  description,
  links,
  direction = "row",
}: ContactCardProps) => {
  const directionClass = cn({
    "flex-row": direction === "row",
    "flex-col": direction === "col",
  });

  return (
    <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div className="w-fit rounded-lg border border-gray-600 p-2">
            {icon}
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="-tracking-4 text-balance text-lg font-semibold">
              {title}
            </h3>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>
          <div className={cn("flex flex-wrap gap-2", directionClass)}>
            {links.map(({ label, url }) => (
              <Link
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-orange-400 underline-offset-4 hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
