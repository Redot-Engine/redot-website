"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ColorSwatchProps {
  color: string;
  name: string;
  border?: boolean;
}

export default function ColorSwatch({
  color,
  name,
  border = false,
}: Readonly<ColorSwatchProps>) {
  const [showCheck, setShowCheck] = useState(false);

  const copyHexCode = () => {
    navigator.clipboard.writeText(color);
    setShowCheck(true);
    setTimeout(() => setShowCheck(false), 1500);
  };

  return (
    <div className="group space-y-2">
      <div
        className={`flex h-24 items-end rounded-md p-2 ${border ? "border border-gray-200" : ""}`}
        style={{ backgroundColor: color }}
      >
        <div className="ml-auto opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            onClick={copyHexCode}
            aria-label={`Copy ${color} to clipboard`}
          >
            {showCheck ? <IconCheck size={14} /> : <IconCopy size={14} />}
          </Button>
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{color}</p>
      </div>
    </div>
  );
}
