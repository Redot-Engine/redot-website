import { IconMail, IconBrandDiscord, IconSend } from "@tabler/icons-react";
import React from "react";

interface ContactCardLink {
  label: string;
  url: string;
}

interface ContactCardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  links: ContactCardLink[];
}

export const CONTACT_CARDS_DATA: ContactCardData[] = [
  {
    id: "email",
    icon: <IconMail className="h-5 w-5" />,
    title: "emailUs",
    description: "emailDescription",
    links: [
      { label: "redotengine@gmail.com", url: "mailto:redotengine@gmail.com" },
      { label: "redotengine@proton.me", url: "mailto:redotengine@proton.me" },
    ],
  },
  {
    id: "discord",
    icon: <IconBrandDiscord className="h-5 w-5" />,
    title: "joinDiscord",
    description: "discordDescription",
    links: [{ label: "Join the Community", url: "https://discord.gg/redot" }],
  },
  {
    id: "socials",
    icon: <IconSend className="h-5 w-5" />,
    title: "followUs",
    description: "followDescription",
    links: [
      { label: "Twitter", url: "https://x.com/Redot_Engine" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/redot-engine/",
      },
      {
        label: "Reddit",
        url: "https://www.reddit.com/r/RedotGameEngineMain/?type=TEXT",
      },
    ],
  },
  /* Forum temporarily disabled
  {
    id: "forum",
    icon: <IconBrandThreads className="h-5 w-5" />,
    title: "forum",
    description: "forumDescription",
    links: [
      { label: "Visit the Forum", url: "https://forum.redotengine.org/" },
    ],
  },
  */
];
