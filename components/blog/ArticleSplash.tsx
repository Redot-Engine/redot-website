import Image from "next/image";
import { Tag } from "@/components/blog/Tag";
import { Tag as SchemaTag } from "@/sanity/schemaTypes/tagType";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/sanity/schemaTypes/postType";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export const ArticleSplash = ({ article }: { article: Post }) => {
  const t = useTranslations("articleSplash");

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-2">
        <Button variant="link" size="sm" asChild>
          <Link href="/blog">
            <IconArrowLeft className="h-5 w-5" />
            {t("backButton")}
          </Link>
        </Button>
        {article.imageUrl && (
          <div className="relative aspect-video w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full rounded-xl object-cover"
              fill
            />
          </div>
        )}
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {article.tags?.map((tag: SchemaTag) => (
            <Tag
              key={tag.slug.current}
              className="hover:bg-background"
              name={tag.name}
            />
          ))}
        </div>
      )}
      <h2 className="text-3xl font-bold md:text-4xl">{article.title}</h2>
      <div className="mb-2 flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage
            src={article.author?.imageUrl}
            alt={article.author?.name || "Unknown Author"}
          />
          <AvatarFallback>
            {article.author?.name
              ? article.author.name.charAt(0).toUpperCase()
              : ""}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">
            {article.author?.name || "Unknown Author"}
          </p>
          <p className="text-xs font-medium text-muted-foreground">
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
