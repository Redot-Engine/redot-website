import { CommunityCardProps } from "@/components/community/CommunityCard";
import { links } from "@/constants/links";

export interface SocialLink {
  url: string;
  icon: string;
}

export const socials: SocialLink[] = [
  {
    url: "https://x.com/Redot_Engine",
    icon: "x.svg",
  },
  {
    url: "https://discord.gg/redot",
    icon: "discord.svg",
  },
  {
    url: "https://github.com/Redot-Engine",
    icon: "github.svg",
  },
  {
    url: "https://www.youtube.com/@RedotEngine",
    icon: "youtube.svg",
  },
  {
    url: "https://www.reddit.com/r/RedotGameEngineMain",
    icon: "reddit.svg",
  },
];

export const socialsLinks = {
  discord: "https://discord.gg/redot",
  discordCommunity:
    "https://discord.com/servers/redot-community-1290063237223551046",
  reddit: "https://www.reddit.com/r/RedotGameEngineMain",
  youtube: "https://www.youtube.com/@ReDotEngine",
  linkedin: "https://www.linkedin.com/company/redot-engine/",
  x: "https://x.com/Redot_Engine",
  xCommunity: "https://x.com/i/communities/1857126566775730450",
  kofi: "https://ko-fi.com/redotengine",
  bsky: "https://bsky.app/profile/redotengine.org",
  itch: "https://redotengine.itch.io/",
  tiktok: "https://www.tiktok.com/@redotengine",
};

export const communityLinks: CommunityCardProps[] = [
  {
    imageUrl: "https://image.redotengine.org/socials/reddit.png",
    label: "Reddit",
    description: "socialLinks.reddit",
    href: socialsLinks.reddit,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/youtube.png",
    label: "YouTube",
    description: "socialLinks.youtube",
    href: socialsLinks.youtube,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/x.png",
    label: "Twitter (X)",
    description: "socialLinks.x",
    href: socialsLinks.x,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/xCommunity.png",
    label: "X Community",
    description: "socialLinks.xCommunity",
    href: socialsLinks.xCommunity,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/linkedin.png",
    label: "LinkedIn",
    description: "socialLinks.linkedin",
    href: socialsLinks.linkedin,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/bsky.png",
    label: "Bluesky",
    description: "socialLinks.bsky",
    href: socialsLinks.bsky,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/tiktok.png",
    label: "Tiktok",
    description: "socialLinks.tiktok",
    href: socialsLinks.tiktok,
  },
];

export const communitySpaces: CommunityCardProps[] = [
  {
    imageUrl: "https://image.redotengine.org/socials/discordInvite.webp",
    label: "Discord (Invite)",
    description: "communitySpacesLinks.discord",
    href: socialsLinks.discord,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/discordCommunity.png",
    label: "Discord Community",
    description: "communitySpacesLinks.discord",
    href: socialsLinks.discordCommunity,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/forum.png",
    label: "Forum",
    description: "communitySpacesLinks.forum",
    href: links.forum,
  },
];

export const supportContributions: CommunityCardProps[] = [
  {
    imageUrl: "https://image.redotengine.org/socials/ko-fi.png",
    label: "Ko-fi",
    description: "contributionsLinks.kofi",
    href: socialsLinks.kofi,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/itch.png",
    label: "Itch.io",
    description: "contributionsLinks.itch",
    href: socialsLinks.itch,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/github.png",
    label: "GitHub - Redot Engine",
    description: "contributionsLinks.github",
    href: links.github,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/engineExperimental.png",
    label: "GitHub - Redot Experimental",
    description: "contributionsLinks.engineExperimental",
    href: links.engineExperimental,
  },
];
