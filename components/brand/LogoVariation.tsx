import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import React from "react";
import { IconDownload } from "@tabler/icons-react";

interface LogoVariationProps {
  imageSrc: string;
  downloadUrl: string;
  bgColor: string;
  invert?: boolean;
  width?: number;
  height?: number;
}

export default function LogoVariation({
  imageSrc,
  bgColor,
  invert = false,
  width = 300,
  height = 150,
  downloadUrl,
}: Readonly<LogoVariationProps>) {
  return (
    <div className="group relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div
        className={cn(
          "flex h-[200px] flex-col items-center justify-center rounded-xl border p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]",
          bgColor
        )}
      >
        <Image
          src={imageSrc}
          alt="Logo"
          width={width}
          height={height}
          className={`mx-auto ${invert ? "invert" : ""}`}
        />
        <div className="absolute bottom-6 right-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2 shadow-md"
            asChild
          >
            <Link href={downloadUrl} download aria-label="Download logo">
              <IconDownload size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
