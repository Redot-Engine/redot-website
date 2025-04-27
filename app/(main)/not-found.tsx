"use client";

import { DefaultNotFound } from "@/components/DefaultNotFound";

export const runtime = "edge";

export default function NotFound() {
  return <DefaultNotFound showHeader={false} showFooter={false} />;
}
