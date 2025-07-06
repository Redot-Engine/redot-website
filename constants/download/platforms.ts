export const PLATFORMS = {
  WINDOWS: "windows",
  MAC: "mac",
  LINUX: "linux",
  ANDROID: "android",
  UNKNOWN: "unknown",
} as const;

export type Platform = (typeof PLATFORMS)[keyof typeof PLATFORMS];

export const PLATFORM_MAPPING: Record<string, Platform> = {
  windows: PLATFORMS.WINDOWS,
  mac: PLATFORMS.MAC,
  linux: PLATFORMS.LINUX,
  android: PLATFORMS.ANDROID,
};

export const SUPPORTED_PLATFORMS_DATA = [
  {
    label: "Android",
    href: "/download/android",
    icon: "/platform/android.svg",
  },
  {
    label: "Windows",
    href: "/download/windows",
    icon: "/platform/windows.svg",
  },
  {
    label: "macOS",
    href: "/download/mac",
    icon: "/platform/apple.svg",
  },
  {
    label: "Linux",
    href: "/download/linux",
    icon: "/platform/linux.svg",
  },
];
