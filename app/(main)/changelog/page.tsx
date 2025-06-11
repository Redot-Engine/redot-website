"use client";

import { ChangelogList } from "@/components/changelog/ChangelogList";
import { ChangelogSidebar } from "@/components/changelog/ChangelogSidebar";
import { SectionHero } from "@/components/shared/SectionHero";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useChangelogData } from "@/hooks/use-changelog-data";
import { useSearchParams } from "next/navigation";

export default function Changelog() {
  const searchParams = useSearchParams();
  const platformParam = searchParams.get("platforms");
  const selectedPlatforms = platformParam ? platformParam.split(",") : [];

  const { platforms, filteredEntries } = useChangelogData(selectedPlatforms);

  return (
    <SidebarProvider>
      {platforms && <ChangelogSidebar platforms={platforms} />}
      <div className="flex w-full flex-1 flex-col items-center">
        <header>
          <SectionHero section="changelog" />
        </header>

        <main className="w-full max-w-3xl p-6">
          <ChangelogList entries={filteredEntries} />
        </main>
      </div>
    </SidebarProvider>
  );
}
