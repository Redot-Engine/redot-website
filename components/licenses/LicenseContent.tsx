import { Skeleton } from "@/components/ui/skeleton";

interface LicenseContentProps {
  type: string;
  content: string | null;
  isLoading: boolean;
}

export const LicenseContent = ({
  type,
  content,
  isLoading,
}: LicenseContentProps) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-xl font-medium">{type}</h3>
    {isLoading ? (
      <Skeleton className="h-10 w-full" />
    ) : (
      <pre className="whitespace-pre-wrap break-words">{content}</pre>
    )}
  </div>
);
