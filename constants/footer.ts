import { links } from "@/constants/links";

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
      { title: "product.children.status", href: links.status },
      { title: "product.children.donate", href: links.donation, newTab: true },
      {
        title: "product.children.documentation",
        href: links.documentation,
      },
      {
        title: "product.children.sourceCode",
        href: links.github,
        newTab: true,
      },
    ],
  },
  {
    title: "resources.title",
    children: [
      { title: "resources.children.blog", href: "/blog" },
      {
        title: "resources.children.feedback",
        href: links.feedback,
        newTab: true,
      },
      { title: "resources.children.community", href: "/community" },
      { title: "resources.children.pressKit", href: links.pressKit },
      { title: "resources.children.contact", href: "/contact" },
    ],
  },
  {
    title: "betaPrograms.title",
    children: [
      {
        title: "betaPrograms.children.launcher",
        href: "https://github.com/Redot-Experimental/launcher",
      },
      {
        title: "betaPrograms.children.academy",
        href: links.academy,
        newTab: true,
      },
      {
        title: "betaPrograms.children.engineExperimental",
        href: "https://github.com/Redot-Experimental",
      },
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
      { title: "policies.children.licenses", href: "/license" },
      {
        title: "policies.children.contributionGuidelines",
        href: links.contribute,
        newTab: true,
      },
    ],
  },
];
