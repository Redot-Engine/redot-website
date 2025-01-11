import { Tag } from "@/components/blog/Tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Tag as SchemaTag } from "@/sanity/schemaTypes/tagType";
import { Post } from "@/sanity/schemaTypes/postType";

export const ArticleCard = ({
  article,
  size = "default",
}: {
  article: Post;
  size?: "default" | "small";
}) => {
  const titleClasses = cn("text-lg font-medium whitespace-normal", {
    "text-base": size === "small",
  });

  const excerptClasses = cn("line-clamp-3 text-base text-muted-foreground", {
    "text-sm": size === "small",
  });

  return (
    <Link href={`blog/${article.slug.current}`}>
      <div className="relative h-full cursor-pointer overflow-hidden rounded-xl border border-zinc-950/[.1] p-4 hover:bg-zinc-950/[.01] dark:border-zinc-50/[.1] dark:hover:bg-zinc-50/[.1]">
        <div className="flex flex-col gap-4">
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
          <div className="flex flex-wrap items-center gap-2">
            {article.tags?.map((tag: SchemaTag) => (
              <Tag
                key={tag._id}
                className="h-7 hover:bg-background"
                name={tag.name}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className={titleClasses}>{article.title}</h3>
            <p className={excerptClasses}>{article.excerpt}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
