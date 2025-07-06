import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ContactInfo() {
  const t = useTranslations("brand.legalGuidelines");

  return (
    <p className="mt-4 text-xs text-muted-foreground">
      {t("contact")}&nbsp;
      <Link
        href="mailto:redotengine@gmail.com"
        className="text-primary hover:underline"
      >
        redotengine@gmail.com
      </Link>
    </p>
  );
}
