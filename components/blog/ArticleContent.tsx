"use client";

import { Post } from "@/sanity/schemaTypes/postType";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

export const ArticleContent = ({ article }: { article: Post }) => {
  const [contentHtml, setContentHtml] = useState("");

  useEffect(() => {
    const processContent = async () => {
      const processedContent = await remark().use(html).process(article.body);
      setContentHtml(processedContent.toString());
    };

    processContent();
  }, [article]);
  return (
    <div>
      <article
        className="article"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
};
