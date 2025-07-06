import {
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconX,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function DosAndDonts() {
  const t = useTranslations("brand.legalGuidelines.guidelines");

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Do's */}
      <div className="rounded-lg border p-5">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
          <IconCircleCheck className="h-5 w-5 text-emerald-500" />
          {t("dos.title")}
        </h3>
        <ul className="space-y-3">
          {([0, 1, 2, 3] as const).map((index) => (
            <li key={index} className="flex gap-3">
              <IconCheck
                size={16}
                className="mt-1 flex-shrink-0 text-emerald-500"
              />
              <p className="text-sm">{t(`dos.items.${index}`)}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Don'ts */}
      <div className="rounded-lg border p-5">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
          <IconCircleX className="h-5 w-5 text-red-500" />
          {t("donts.title")}
        </h3>
        <ul className="space-y-3">
          {([0, 1, 2, 3] as const).map((index) => (
            <li key={index} className="flex gap-3">
              <IconX size={16} className="mt-1 flex-shrink-0 text-red-600" />
              <p className="text-sm">{t(`donts.items.${index}`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
