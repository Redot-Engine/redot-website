import { LINKS } from "@/constants/common/links";

interface Footer {
  title: string;
  href?: string;
  newTab?: boolean;
  children?: Footer[];
}

export const footer: Footer[] = [
  {
    title: "product.title",
    children: [
      { title: "product.children.download", href: "/download" },
      { title: "product.children.status", href: LINKS.status, newTab: true },
      { title: "product.children.donate", href: LINKS.donation, newTab: true },
      {
        title: "product.children.documentation",
        href: LINKS.documentation,
        newTab: true,
      },
      {
        title: "product.children.sourceCode",
        href: LINKS.github,
        newTab: true,
      },
      {
        title: "product.children.changelog",
        href: "/changelog",
      },
    ],
  },
  {
    title: "resources.title",
    children: [
      { title: "resources.children.blog", href: "/blog" },
      /* Forum temporarily disabled
      {
        title: "resources.children.feedback",
        href: LINKS.feedback,
        newTab: true,
      },
      */
      { title: "resources.children.community", href: "/community" },
      {
        title: "resources.children.brand",
        href: "/branding",
      },
      {
        title: "resources.children.pressKit",
        href: LINKS.pressKit,
        newTab: true,
      },
      { title: "resources.children.contact", href: "/contact" },
      { title: "resources.children.rss", href: "/api/feed.xml", newTab: true },
    ],
  },
  {
    title: "policies.title",
    children: [
      { title: "policies.children.terms", href: "/terms" },
      { title: "policies.children.privacy", href: "/privacy" },
      {
        title: "policies.children.cookieSettings",
        href: "/cookie-settings",
      },
      { title: "policies.children.licenses", href: "/licenses" },
      {
        title: "policies.children.contributionGuidelines",
        href: LINKS.contribute,
        newTab: true,
      },
    ],
  },
];
