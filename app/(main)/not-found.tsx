"use client";

import { DefaultNotFound } from "@/components/shared/DefaultNotFound";

export const runtime = "edge";

export default function NotFound() {
  return <DefaultNotFound showHeader={false} showFooter={false} />;
}
