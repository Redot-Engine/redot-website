import Link from "next/link";
import { IconExternalLink, IconInfoCircle } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function LicenseInfo() {
  const t = useTranslations("brand.legalGuidelines.license");

  return (
    <div className="rounded-lg border border-border p-5">
      <div className="flex items-start gap-4">
        <div className="rounded-md bg-accent p-3">
          <IconInfoCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-medium">{t("title")}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{t("copyright")}</p>
          <p className="mb-3 text-sm">{t("description")}</p>
          <Link
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {t("viewLicense")} <IconExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
