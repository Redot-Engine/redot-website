import { defineField, defineType } from "sanity";
import { Tag } from "@/sanity/schemaTypes/tagType";
import { Author } from "@/sanity/schemaTypes/authorType";
import { formatDate } from "@/lib/utils";
import { DocumentTextIcon } from "@sanity/icons";

export interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  image?: any;
  imageUrl: string;
  excerpt: string;
  isLegacy: boolean;
  body?: string;
  content: any[] | string;
  tags: Tag[];
  author: Author;
  quote?: string;
  includeInQuoteSelection?: boolean;
  _id: string;
}

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
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
      options: { source: "name" },
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
      deprecated: {
        reason: 'Use the "Content" field instead.',
      },
      readOnly: true,
    }),
    defineField({
      name: "content",
      title: "Content",
      description: "The main content of the post.",
      type: "internationalizedArrayBlockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description:
        "A list of tags associated with this post. Tags help categorize and organize content (maximum 3).",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (rule) => rule.required().max(3),
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
    defineField({
      name: "quote",
      title: "Quote",
      description:
        "A quote from the post to be displayed on the main blog page. Do not include quotation marks.",
      type: "text",
      validation: (rule) =>
        rule.custom((quote, context) => {
          if (context.document?.includeInQuoteSelection && !quote) {
            return "Quote is required when 'Include in Quote Selection' is enabled.";
          }
          return true;
        }),
      readOnly: ({ document }) => !document?.includeInQuoteSelection,
    }),
    defineField({
      name: "includeInQuoteSelection",
      title: "Include in Quote Selection",
      description:
        "Toggle to include this quote in the blog's quote selection.",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contributors",
      title: "Contributors",
      description: "List of contributors to this post along with their roles.",
      type: "array",
      readOnly: true,
      of: [
        {
          type: "object",
          fields: [
            {
              name: "contributor",
              title: "Contributor",
              type: "reference",
              to: [{ type: "author" }],
              validation: (rule) => rule.required(),
            },
            {
              name: "role",
              title: "Role",
              type: "string",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      author: "author.name",
      date: "publishedAt",
      media: "image",
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${formatDate(date)}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(" ") };
    },
  },
});
