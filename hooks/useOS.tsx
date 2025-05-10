"use client";

import { useState, useEffect } from "react";
import { PLATFORM_MAPPING } from "@/constants/download/platforms";

const getOSFromUserAgent = (): string => {
  if (typeof window === "undefined") return "unknown";
  const ua = window.navigator.userAgent.toLowerCase();

  if (ua.includes("windows")) return "windows";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macos";
  if (ua.includes("linux")) return "linux";
  if (ua.includes("android")) return "androidos";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios"))
    return "ios";
  return "unknown";
};

const useOS = () => {
  const [os, setOS] = useState<string | null>(null);

  useEffect(() => {
    const detectedOS = getOSFromUserAgent();
    setOS(
      PLATFORM_MAPPING[detectedOS as keyof typeof PLATFORM_MAPPING] || "unknown"
    );
  }, []);

  return os;
};

export default useOS;
