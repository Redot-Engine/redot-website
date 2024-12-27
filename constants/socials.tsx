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
