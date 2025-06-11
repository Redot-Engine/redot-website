import useSWR from "swr";
import { useMemo } from "react";
import { getAllPlatforms } from "@/lib/platform";
import { getAllChangelogs } from "@/lib/changelog";

export function useChangelogData(selectedPlatforms: string[]) {
  const { data: platforms, isLoading: isLoadingPlatforms } = useSWR(
    "all-platforms",
    getAllPlatforms
  );
  const { data: changelogEntries, isLoading: isLoadingChangelogs } = useSWR(
    "all-changelogs",
    getAllChangelogs
  );

  const isLoading = isLoadingPlatforms || isLoadingChangelogs;

  const filteredEntries = useMemo(() => {
    if (!changelogEntries) return [];

    if (selectedPlatforms.length === 0) {
      return changelogEntries;
    }

    return changelogEntries.filter((entry) =>
      selectedPlatforms.includes(entry.platform.slug)
    );
  }, [changelogEntries, selectedPlatforms]);

  return {
    platforms,
    changelogEntries,
    filteredEntries,
    isLoading,
  };
}
