import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Changelog } from "@/sanity/schemaTypes/changelogType";
import { formatDate } from "@/lib/utils";
import CustomPortableText from "@/components/shared/PortableText";

interface ChangelogDetailProps {
  entry: Changelog;
}

export function ChangelogDetail({ entry }: Readonly<ChangelogDetailProps>) {
  return (
    <div>
      <div className="mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className="text-md font-mono">
              v{entry.version}
            </Badge>
            <p className="text-muted-foreground">
              {formatDate(entry.publishedAt)}
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {entry.title}
          </h1>

          <div className="flex gap-2">
            <Badge variant="secondary">{entry.platform.name}</Badge>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {entry.summary && <CustomPortableText value={entry.summary} />}
    </div>
  );
}
