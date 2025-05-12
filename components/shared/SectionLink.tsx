import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface SectionLinkProps {
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
}

export const SectionLink = ({
  href,
  icon,
  title,
  description,
}: Readonly<SectionLinkProps>) => (
  <Link href={href}>
    <div className="group flex w-full flex-row items-center justify-between gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <div>
          <div className="border-zinc-250 flex h-12 w-12 items-center justify-center rounded-lg border">
            {icon}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-xl font-medium text-primary">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      <IconArrowRight className="text-muted-foreground transition-all duration-300 group-hover:text-primary" />
    </div>
  </Link>
);
