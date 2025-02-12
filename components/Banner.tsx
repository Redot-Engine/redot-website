import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

interface BannerProps {
  readonly mainMessage?: string;
  readonly subMessage?: string;
  readonly link: string;
}

export default function Banner({
  mainMessage,
  subMessage,
  link,
}: Readonly<BannerProps>) {
  if (!mainMessage) return null;

  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <div className="group flex items-center justify-center gap-2 bg-linear-to-r from-pink-500 via-amber-500 to-orange-500 py-2 font-sans text-sm font-medium tracking-tight text-white select-none">
        <p className="hidden md:block">{subMessage}</p>
        <p>{mainMessage}</p>
        <IconArrowRight className="h-4 w-4 items-center justify-center transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
