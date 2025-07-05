"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
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
