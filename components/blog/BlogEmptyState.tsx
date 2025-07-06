import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

interface BlogEmptyStateProps {
  readonly onClearFilters: () => void;
}

export function BlogEmptyState({
  onClearFilters,
}: Readonly<BlogEmptyStateProps>) {
  const t = useTranslations("blog.notFound");

  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-6 px-5 py-8 lg:px-40">
      <Image
        src="https://image.redotengine.org/redotchan.png"
        alt="Redotchan"
        width={160}
        height={160}
        priority
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t("title")}
        </h2>
        <p className="max-w-md text-muted-foreground md:text-lg">
          {t("description")}
        </p>
      </div>
      <Button onClick={onClearFilters} variant="outline" className="mt-4">
        {t("clearSearch")}
      </Button>
    </div>
  );
}
