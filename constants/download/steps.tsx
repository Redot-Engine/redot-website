import { IconDownload, IconExternalLink } from "@tabler/icons-react";
import { LINKS } from "@/constants/common/links";
import { getPlatformDownloadLink } from "@/lib/platform-download-link";
import { SOCIALS_LINKS } from "@/constants/common/socials";

export const STEPS_DATA = [
  {
    titleKey: "steps.step1.title",
    descriptionKey: "steps.step1.description",
    links: [
      {
        icon: <IconExternalLink className="h-4 w-4" />,
        textKey: "steps.step1.links.archive",
        url: LINKS.releasePage,
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
        url: SOCIALS_LINKS.discord,
      },
    ],
  },
];
