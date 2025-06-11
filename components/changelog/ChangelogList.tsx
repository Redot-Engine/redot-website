import Link from "next/link";
import { Changelog } from "@/sanity/schemaTypes/changelogType";
import { ChangelogEntryCard } from "@/components/changelog/ChangelogEntryCardProps";
import { useTranslations } from "next-intl";

interface ChangelogListProps {
  entries: Changelog[];
}

export function ChangelogList({ entries }: Readonly<ChangelogListProps>) {
  const t = useTranslations("changelog");

  return (
    <div>
      <div className="space-y-6">
        {entries.map((entry) => (
          <Link
            key={entry.id}
            href={`/changelog/${entry.slug}`}
            className="block"
          >
            <ChangelogEntryCard entry={entry} />
          </Link>
        ))}

        {entries.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">{t("noEntriesFound")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
