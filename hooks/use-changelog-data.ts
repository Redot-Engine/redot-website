import useSWR from "swr";
import { Platform } from "@/sanity/schemaTypes/platformType";
import { Changelog } from "@/sanity/schemaTypes/changelogType";
import { getAllPlatforms } from "@/lib/platform";
import { getAllChangelogs } from "@/lib/changelog";

const fetchAllPlatforms = async (): Promise<Platform[] | null> => {
  return await getAllPlatforms();
};

const fetchAllChangelogs = async (): Promise<Changelog[] | null> => {
  return await getAllChangelogs();
};

export function useChangelogData(selectedPlatforms: string[]) {
  const { data: platforms } = useSWR("all-platforms", fetchAllPlatforms);
  const { data: changelogEntries } = useSWR(
    "all-changelogs",
    fetchAllChangelogs
  );

  let filteredEntries: Changelog[] = [];

  if (changelogEntries) {
    if (selectedPlatforms.length === 0) {
      filteredEntries = changelogEntries;
    } else {
      filteredEntries = changelogEntries.filter((entry) =>
        selectedPlatforms.includes(entry.platform.slug)
      );
    }
  }

  return {
    platforms,
    changelogEntries,
    filteredEntries,
  };
}
