import { defineField, defineType } from "sanity";

export interface Banner {
  _id: string;
  mainMessage: string;
  subMessage?: string;
  link: string;
}

export const bannerType = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  description:
    "A promotional or informational banner displayed at the top of the site.",
  fields: [
    defineField({
      name: "mainMessage",
      title: "Main Message",
      type: "internationalizedArrayString",
      description: "The main text displayed in the banner.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subMessage",
      title: "Sub Message",
      type: "internationalizedArrayString",
      description: "Optional secondary text shown before the main message.",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "URL the banner points to when clicked.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      mainMessage: "mainMessage",
      subMessage: "subMessage",
      link: "link",
    },
    prepare(selection) {
      const main = selection.mainMessage?.[0]?.value ?? "No main message";
      const sub = selection.subMessage?.[0]?.value;
      return {
        title: main,
        subtitle: sub ?? selection.link,
      };
    },
  },
});
