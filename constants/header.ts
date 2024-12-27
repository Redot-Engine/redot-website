import { links } from "@/constants/links";

interface HeaderLink {
  label: string;
  href: string;
}

export const header: HeaderLink[] = [
  {
    label: "links.documentation",
    href: links.documentation,
  },
  {
    label: "links.blog",
    href: "/blog/",
  },
  {
    label: "links.proposals",
    href: links.proposals,
  },
  {
    label: "links.community",
    href: "/community/",
  },
];
