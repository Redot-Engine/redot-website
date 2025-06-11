import { defineField, defineType } from "sanity";
import { IconClipboardText } from "@tabler/icons-react";
import { formatDate } from "@/lib/utils";
import { Platform } from "@/sanity/schemaTypes/platformType";

export interface Changelog {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  version: string;
  platform: Platform;
  summary: any[];
}

export const changelogType = defineType({
  name: "changelog",
  title: "Changelog",
  type: "document",
  icon: IconClipboardText,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "The main title of the changelog entry.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "A unique URL-friendly identifier for this changelog entry.",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      description: "The date and time this changelog entry was published.",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "version",
      title: "Version",
      description: "The version number or identifier for this changelog entry.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "platform",
      title: "Platform",
      description: "Platform affected by this changelog entry.",
      type: "reference",
      to: [{ type: "platform" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "A rich text summary of the changelog entry.",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      version: "version",
      publishedAt: "publishedAt",
    },
    prepare({ title, version, publishedAt }) {
      return {
        title: title,
        subtitle: `v${version} • ${publishedAt ? formatDate(new Date(publishedAt)) : ""}`,
      };
    },
  },
});
