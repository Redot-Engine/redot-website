import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";

interface Platform {
  id: string;
  name: string;
  slug: string;
}

interface ChangelogSidebarProps {
  platforms: Platform[];
}

function usePlatformFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedPlatforms = useMemo(() => {
    const platformParam = searchParams.get("platforms");
    return platformParam ? platformParam.split(",") : [];
  }, [searchParams]);

  const togglePlatform = useCallback(
    (platform: string) => {
      const params = new URLSearchParams(searchParams);
      const newPlatforms = selectedPlatforms.includes(platform)
        ? selectedPlatforms.filter((p) => p !== platform)
        : [...selectedPlatforms, platform];

      if (newPlatforms.length === 0) {
        params.delete("platforms");
      } else {
        params.set("platforms", newPlatforms.join(","));
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams, selectedPlatforms]
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("platforms");
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  return {
    selectedPlatforms,
    togglePlatform,
    clearFilters,
  };
}

export function ChangelogSidebar({
  platforms,
}: Readonly<ChangelogSidebarProps>) {
  const isSidebarVisible = useScrollVisibility();
  const t = useTranslations("changelog");
  const { selectedPlatforms, togglePlatform, clearFilters } =
    usePlatformFilters();

  return (
    <Sidebar
      variant="floating"
      side="left"
      className={`z-[99] h-fit pt-[8rem] transition-opacity duration-100 ${
        isSidebarVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <SidebarContent className="sticky py-2">
        <SidebarGroup className="px-4">
          <SidebarGroupLabel>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase">
                {t("filterByPlatform")}
              </h3>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {platforms.map((platform) => (
                <SidebarMenuItem key={platform.id}>
                  <div className="flex items-center gap-1">
                    <Checkbox
                      checked={selectedPlatforms.includes(platform.slug)}
                      onCheckedChange={() => togglePlatform(platform.slug)}
                    />
                    <SidebarMenuButton
                      isActive={selectedPlatforms.includes(platform.slug)}
                      onClick={() => togglePlatform(platform.slug)}
                      className="flex items-center"
                    >
                      {platform.name}
                    </SidebarMenuButton>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {selectedPlatforms.length > 0 && (
          <>
            <SidebarSeparator />
            <div className="px-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={clearFilters}
              >
                <IconX className="mr-2 h-4 w-4" />
                {t("clearAllFilters")}
              </Button>
            </div>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
