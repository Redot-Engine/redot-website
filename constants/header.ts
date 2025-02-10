import { links } from "@/constants/links";

interface HeaderLink {
  label: string;
  href: string;
  newTab?: boolean;
}

export const header: HeaderLink[] = [
  {
    label: "links.documentation",
    href: links.documentation,
    newTab: true,
  },
  {
    label: "links.blog",
    href: "/blog/",
  },
  {
    label: "links.forum",
    href: links.forum,
    newTab: true,
  },
  {
    label: "links.proposals",
    href: links.proposals,
    newTab: true,
  },
  {
    label: "links.community",
    href: "/community/",
  },
];
