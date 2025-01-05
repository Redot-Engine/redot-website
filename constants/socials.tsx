import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandReddit,
  IconBrandXFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";

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
  reddit: "https://www.reddit.com/r/RedotGameEngineMain",
  youtube: "https://www.youtube.com/@ReDotEngine",
  linkedin: "https://www.linkedin.com/company/redot-engine/",
  x: "https://x.com/Redot_Engine",
  xCommunity: "https://x.com/i/communities/1857126566775730450",
  kofi: "https://ko-fi.com/redotengine",
  bsky: "https://bsky.app/profile/redotengine.org",
  itch: "https://redotengine.itch.io/",
};
