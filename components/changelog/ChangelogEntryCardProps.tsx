import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Changelog } from "@/sanity/schemaTypes/changelogType";
import { formatDate } from "@/lib/utils";

interface ChangelogEntryCardProps {
  entry: Changelog;
}

export function ChangelogEntryCard({
  entry,
}: Readonly<ChangelogEntryCardProps>) {
  return (
    <Card className="cursor-pointer transition-colors duration-300 hover:bg-accent/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                v{entry.version}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {formatDate(entry.publishedAt)}
              </div>
            </div>
            <CardTitle className="text-xl">{entry.title}</CardTitle>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex gap-2 pt-2">
          <Badge variant="secondary">{entry.platform.name}</Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
