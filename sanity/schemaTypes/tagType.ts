import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
}

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
  ],
});
