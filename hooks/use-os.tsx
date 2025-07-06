import { useState, useEffect } from "react";
import {
  Platform,
  PLATFORM_MAPPING,
  PLATFORMS,
} from "@/constants/download/platforms";

const detectOperatingSystem = (): Platform => {
  if (typeof window === "undefined") return PLATFORMS.UNKNOWN;
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes("android")) return PLATFORMS.ANDROID;
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios"))
    return PLATFORMS.MAC;
  if (ua.includes("mac os") || ua.includes("macintosh")) return PLATFORMS.MAC;
  if (ua.includes("windows")) return PLATFORMS.WINDOWS;
  if (ua.includes("linux") && !ua.includes("android")) return PLATFORMS.LINUX;
  return PLATFORMS.UNKNOWN;
};

const useOS = () => {
  const [os, setOs] = useState<Platform>(PLATFORMS.UNKNOWN);

  useEffect(() => {
    const detected = detectOperatingSystem();
    setOs(PLATFORM_MAPPING[detected] || PLATFORMS.WINDOWS);
  }, []);

  return os;
};

export default useOS;
