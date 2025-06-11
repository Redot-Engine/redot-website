"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

interface ChangelogTableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface ChangelogTableOfContentsProps {
  tableOfContents: ChangelogTableOfContentsItem[];
}

function useActiveSection(tableOfContents: ChangelogTableOfContentsItem[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const findActiveSection = useCallback(() => {
    let found = null;
    for (const item of tableOfContents) {
      const el = document.getElementById(item.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 120) {
          found = item.id;
        }
      }
    }
    setActiveId(found);
  }, [tableOfContents]);

  useEffect(() => {
    const debouncedFindActiveSection = debounce(findActiveSection, 100);
    window.addEventListener("scroll", debouncedFindActiveSection, {
      passive: true,
    });
    findActiveSection();

    return () => {
      window.removeEventListener("scroll", debouncedFindActiveSection);
      debouncedFindActiveSection.cancel();
    };
  }, [findActiveSection]);

  return activeId;
}

export function ChangelogTableOfContents({
  tableOfContents,
}: Readonly<ChangelogTableOfContentsProps>) {
  const activeId = useActiveSection(tableOfContents);
  const isSidebarVisible = useScrollVisibility(50);
  const t = useTranslations("changelog");

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <Sidebar
      variant="floating"
      side="right"
      className={cn(
        "z-[99] h-fit pt-[8rem] transition-opacity duration-100",
        isSidebarVisible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <SidebarContent className="sticky top-8 py-2">
        <SidebarGroup className="px-2">
          <SidebarGroupLabel>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {t("onThisPage")}
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-0">
            <SidebarMenu>
              {tableOfContents.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "flex w-full items-center py-1.5 text-left text-sm font-normal transition-colors",
                        isActive
                          ? "font-semibold text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "mr-2 h-5 w-1 rounded bg-red-500 transition-opacity",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
