"use client";

import { Post } from "@/sanity/schemaTypes/postType";
import { remark } from "remark";
import html from "remark-html";

export const PostContentLegacy = ({ content }: Post) => {
  const processContent = () => {
    try {
      if (typeof content !== "string") {
        console.warn("Content is not a string, cannot process with remark");
        return "";
      }

      const processedContent = remark().use(html).processSync(content);
      return processedContent.toString();
    } catch (error) {
      console.error("Error processing markdown content:", error);
      return typeof content === "string" ? content : "";
    }
  };

  const contentHtml = processContent();

  return (
    <div>
      <article
        className="prose col-span-12 max-w-max dark:prose-invert sm:prose-base md:prose-lg first-letter:text-3xl prose-blockquote:rounded-r-lg prose-blockquote:border-muted prose-blockquote:bg-muted/20 prose-blockquote:p-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-figure:relative prose-figcaption:mb-2 prose-figcaption:mt-1 prose-li:marker:text-muted-foreground dark:prose-blockquote:border-muted-foreground dark:prose-blockquote:bg-muted-foreground/20 dark:prose-li:marker:text-muted-foreground sm:first-letter:text-5xl lg:col-span-8"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
};
