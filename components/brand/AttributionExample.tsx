"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AttributionExample() {
  const t = useTranslations("brand.legalGuidelines.attribution");

  const [showCheck, setShowCheck] = useState(false);
  const attributionText = t("text");

  const copyAttribution = () => {
    navigator.clipboard.writeText(attributionText);
    setShowCheck(true);
    const timeoutId = setTimeout(() => setShowCheck(false), 1500);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="rounded-lg border border-border p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">{t("title")}</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={copyAttribution}
          className="flex items-center gap-2"
          aria-label="Copy attribution text"
        >
          {showCheck ? <IconCheck size={14} /> : <IconCopy size={14} />}
        </Button>
      </div>
      <div className="rounded border border-border bg-accent p-3 font-mono text-sm">
        {attributionText}
      </div>
    </div>
  );
}
