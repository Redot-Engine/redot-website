"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconChevronUp } from "@tabler/icons-react";

interface GoToTopProps {
  threshold?: number;
  className?: string;
}

export function GoToTop({
  threshold = 300,
  className,
}: Readonly<GoToTopProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > threshold) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-[99]",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
        className
      )}
      onClick={scrollToTop}
      aria-label="Go to top"
    >
      <IconChevronUp className="h-5 w-5" />
    </Button>
  );
}
