import { defineField, defineType } from "sanity";
import { Tag } from "@/sanity/schemaTypes/tagType";
import { Author } from "@/sanity/schemaTypes/authorType";

export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: any;
  imageUrl: string;
  excerpt: string;
  body: string;
  tags: Array<Tag>;
  author: Author;
  _id: string;
}

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name of Post",
      description:
        "This text will not be used anywhere; it is solely for convenient article search.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      description:
        "The main title of the post. It supports internationalized strings for multilingual sites.",
      type: "internationalizedArrayString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "The unique URL-friendly identifier for this post, generated from the title.",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published Date",
      description: "The date and time the post was published.",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      description: "The primary image associated with this post.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "A short summary or preview of the post content, typically shown in listings.",
      type: "internationalizedArrayText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      description:
        "The main content of the post. Supports **Markdown** formatting for rich text.",
      type: "internationalizedArrayText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description:
        "A list of tags associated with this post. Tags help categorize and organize content.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      description:
        "The author of this post. Select an author from the available list.",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
