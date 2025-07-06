import { CommunityCardProps } from "@/components/community/CommunityCard";
import { LINKS } from "@/constants/common/links";

export interface SocialLink {
  id: string;
  url: string;
  iconSrc: string;
}

export const FOOTER_SOCIALS: SocialLink[] = [
  { id: "x", url: "https://x.com/Redot_Engine", iconSrc: "x.svg" },
  { id: "discord", url: "https://discord.gg/redot", iconSrc: "discord.svg" },
  {
    id: "github",
    url: "https://github.com/Redot-Engine",
    iconSrc: "github.svg",
  },
  {
    id: "youtube",
    url: "https://www.youtube.com/@RedotEngine",
    iconSrc: "youtube.svg",
  },
  {
    id: "reddit",
    url: "https://www.reddit.com/r/RedotGameEngineMain",
    iconSrc: "reddit.svg",
  },
];

export const SOCIALS_LINKS = {
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

export const COMMUNITY_LINKS: CommunityCardProps[] = [
  {
    imageUrl: "https://image.redotengine.org/socials/reddit.png",
    label: "Reddit",
    description: "socialLinks.reddit",
    href: SOCIALS_LINKS.reddit,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/youtube.png",
    label: "YouTube",
    description: "socialLinks.youtube",
    href: SOCIALS_LINKS.youtube,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/x.png",
    label: "Twitter (X)",
    description: "socialLinks.x",
    href: SOCIALS_LINKS.x,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/xCommunity.png",
    label: "X Community",
    description: "socialLinks.xCommunity",
    href: SOCIALS_LINKS.xCommunity,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/linkedin.png",
    label: "LinkedIn",
    description: "socialLinks.linkedin",
    href: SOCIALS_LINKS.linkedin,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/bsky.png",
    label: "Bluesky",
    description: "socialLinks.bsky",
    href: SOCIALS_LINKS.bsky,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/tiktok.png",
    label: "TikTok",
    description: "socialLinks.tiktok",
    href: SOCIALS_LINKS.tiktok,
  },
];

export const COMMUNITY_SPACES: CommunityCardProps[] = [
  {
    imageUrl: "https://image.redotengine.org/socials/discordInvite.webp",
    label: "Discord (Invite)",
    description: "communitySpacesLinks.discord",
    href: SOCIALS_LINKS.discord,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/discordCommunity.png",
    label: "Discord Community",
    description: "communitySpacesLinks.discordCommunity",
    href: SOCIALS_LINKS.discordCommunity,
  },
  /* Forum temporarily disabled
  {
    imageUrl: "https://image.redotengine.org/socials/forum.png",
    label: "Forum",
    description: "communitySpacesLinks.forum",
    href: LINKS.forum,
  },
  */
];

export const SUPPORT_CONTRIBUTIONS: CommunityCardProps[] = [
  {
    imageUrl: "https://image.redotengine.org/socials/ko-fi.png",
    label: "Ko-fi",
    description: "contributionsLinks.kofi",
    href: SOCIALS_LINKS.kofi,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/itch.png",
    label: "Itch.io",
    description: "contributionsLinks.itch",
    href: SOCIALS_LINKS.itch,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/github.png",
    label: "GitHub - Redot Engine",
    description: "contributionsLinks.github",
    href: LINKS.github,
  },
  {
    imageUrl: "https://image.redotengine.org/socials/engineExperimental.png",
    label: "GitHub - Redot Experimental",
    description: "contributionsLinks.engineExperimental",
    href: LINKS.engineExperimental,
  },
];
