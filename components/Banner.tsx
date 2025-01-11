"use client";

import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";

interface BannerProps {
  readonly mainMessage?: string;
  readonly subMessage?: string;
  readonly link?: string;
}

export default function Banner({
  mainMessage,
  subMessage,
  link,
}: Readonly<BannerProps>) {
  if (!mainMessage) return null;

  return (
    <div className="flex items-center justify-center gap-3 border-b border-black/10 bg-white py-3 text-sm font-medium text-black">
      <p className="hidden text-black/60 md:block">{subMessage}</p>
      {subMessage && (
        <div>
          {link ? (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              <p>{mainMessage}</p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              >
                <IconArrowRight className="inline-flex h-4 w-4 items-center justify-center" />
              </motion.div>
            </Link>
          ) : (
            <p>{mainMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
