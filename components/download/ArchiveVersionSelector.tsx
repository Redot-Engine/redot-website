import { IconAlertCircle } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface ArchiveVersion {
  version: string;
  date: string;
  prerelease: boolean;
}

interface ArchiveVersionSelectorProps {
  loadError: string | null;
  selectedArchiveVersion: string;
  setSelectedArchiveVersion: (version: string) => void;
  archiveVersions: ArchiveVersion[];
}

export const ArchiveVersionSelector = ({
  loadError,
  selectedArchiveVersion,
  setSelectedArchiveVersion,
  archiveVersions,
}: ArchiveVersionSelectorProps) => {
  if (loadError) {
    return (
      <Alert variant="destructive">
        <IconAlertCircle className="h-4 w-4" />
        <AlertDescription>{loadError}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Select
      value={selectedArchiveVersion}
      onValueChange={setSelectedArchiveVersion}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select version" />
      </SelectTrigger>
      <SelectContent>
        {archiveVersions.map((av) => (
          <SelectItem key={av.version} value={av.version}>
            {av.version} ({av.date})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
