import { links } from "@/constants/links";
import { socialsLinks } from "@/constants/socials";
import { getPlatformDownloadLink } from "@/lib/platformDownloadLink";
import { IconDownload, IconExternalLink } from "@tabler/icons-react";

export const stepsData = [
  {
    titleKey: "steps.step1.title",
    descriptionKey: "steps.step1.description",
    links: [
      {
        icon: <IconExternalLink className="h-4 w-4" />,
        textKey: "steps.step1.links.archive",
        url: links.releasePage,
      },
    ],
  },
  {
    titleKey: "steps.step2.title",
    descriptionKey: "steps.step2.description",
    links: [
      {
        icon: <IconDownload className="h-4 w-4" />,
        textKey: "steps.step2.links.windows",
        url: getPlatformDownloadLink("windows"),
      },
      {
        icon: <IconDownload className="h-4 w-4" />,
        textKey: "steps.step2.links.mac",
        url: getPlatformDownloadLink("mac"),
      },
      {
        icon: <IconDownload className="h-4 w-4" />,
        textKey: "steps.step2.links.linux",
        url: getPlatformDownloadLink("linux"),
      },
      {
        icon: <IconDownload className="h-4 w-4" />,
        textKey: "steps.step2.links.android",
        url: getPlatformDownloadLink("android"),
      },
    ],
  },
  {
    titleKey: "steps.step3.title",
    descriptionKey: "steps.step3.description",
    links: [
      {
        icon: <IconExternalLink className="h-4 w-4" />,
        textKey: "steps.step3.links.discord",
        url: socialsLinks.discord,
      },
    ],
  },
];

export const supportedPlatformsData = [
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
