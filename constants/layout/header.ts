import { LINKS } from "@/constants/common/links";

interface HeaderLink {
  label: string;
  href: string;
  newTab?: boolean;
}

export const header: HeaderLink[] = [
  {
    label: "links.documentation",
    href: LINKS.documentation,
    newTab: true,
  },
  {
    label: "links.blog",
    href: "/blog/",
  },
  {
    label: "links.proposals",
    href: LINKS.proposals,
    newTab: true,
  },
  /* Forum temporarily disabled
  {
    label: "links.forum",
    href: LINKS.forum,
    newTab: true,
  },
  */
  {
    label: "links.community",
    href: "/community/",
  },
];
