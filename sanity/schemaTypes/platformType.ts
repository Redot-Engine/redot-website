import { defineField, defineType } from "sanity";
import { IconDeviceImac } from "@tabler/icons-react";

export interface Platform {
  id: string;
  name: string;
  slug: string;
}

export const platformType = defineType({
  name: "platform",
  title: "Platform",
  type: "document",
  icon: IconDeviceImac,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "The name of the platform.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "A URL-friendly identifier generated from the platform name.",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
  ],
});
