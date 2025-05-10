import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface SharedNavLinkProps {
  href: string;
  label: string;
  className?: string;
  newTab?: boolean;
  children?: React.ReactNode;
}

export const SharedNavLink = ({
  href,
  label,
  className,
  newTab = false,
  children,
}: SharedNavLinkProps) => (
  <Link
    className={cn("flex items-center", className)}
    href={href}
    target={newTab ? "_blank" : "_self"}
    rel={newTab ? "noopener noreferrer" : undefined}
  >
    {label}
    {newTab && <IconArrowUpRight className="ml-2 h-4 w-4" />}
    {children}
  </Link>
);
