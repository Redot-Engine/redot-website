"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useOS from "@/hooks/use-os";

export default function Download() {
  const router = useRouter();
  const os = useOS();

  useEffect(() => {
    if (!os) return;
    if (os === "unknown") return;
    router.push(`/download/${os}`);
  }, [os, router]);

  if (os === "unknown") {
    return (
      <div>
        We couldn&#39;t detect your platform. Please select your download
        manually.
      </div>
    );
  }

  return null;
}
