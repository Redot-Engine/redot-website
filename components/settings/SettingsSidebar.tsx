"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { SETTINGS_SIDEBAR_ITEMS } from "@/constants/layout/settings";

export const SettingsSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {SETTINGS_SIDEBAR_ITEMS.map((navItem) => (
        <Link
          key={navItem.href}
          href={navItem.href}
          aria-current={pathname === navItem.href ? "page" : undefined}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === navItem.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {navItem.title}
        </Link>
      ))}
    </div>
  );
};
