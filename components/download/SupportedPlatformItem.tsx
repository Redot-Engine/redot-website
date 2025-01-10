import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SupportedPlatformItemProps {
  label: string;
  href: string;
  icon: string;
  className?: string;
}

export const SupportedPlatformItem = ({
  label,
  href,
  icon,
  className,
}: SupportedPlatformItemProps) => {
  return (
    <Link
      className={cn(
        "flex cursor-pointer flex-row items-center justify-center gap-4 overflow-hidden rounded-xl border border-zinc-950/[.1] p-4 hover:bg-zinc-950/[.01] dark:border-zinc-50/[.1] dark:hover:bg-zinc-50/[.1]",
        className
      )}
      href={href}
    >
      <Image
        src={icon}
        alt={`${label} icon`}
        width={32}
        height={32}
        className="invert dark:invert-0"
      />
      <p className="text-lg font-medium">{label}</p>
    </Link>
  );
};
