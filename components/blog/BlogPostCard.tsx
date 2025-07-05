import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/sanity/schemaTypes/tagType";
import { AuthorAvatar } from "@/components/blog/AuthorAvatar";
import { Post } from "@/sanity/schemaTypes/postType";
import { bricolageGrotesque } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";

interface BlogPostCardProps extends Post {
  className?: string;
  priority?: boolean;
}

export const BlogPostCard = ({
  title,
  excerpt,
  slug,
  imageUrl,
  tags,
  author,
  publishedAt,
  className,
  priority = false,
}: BlogPostCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={cn(
        "group relative h-full cursor-pointer transition-all duration-300 hover:translate-y-[-2px]",
        className
      )}
    >
      <Link
        href={`/blog/${slug}`}
        className="block"
        aria-label={`Read article: ${title}`}
      >
        <div className="flex h-full flex-col space-y-4">
          <figure className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            {imageLoading && (
              <Skeleton className="absolute inset-0 h-full w-full" />
            )}
            {!imageError && imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`Cover image for ${title}`}
                className={cn(
                  "object-cover object-center transition-all duration-500 group-hover:scale-[1.02]",
                  "rounded-lg border border-border",
                  imageLoading ? "opacity-0" : "opacity-100"
                )}
                fill
                priority={priority}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-muted-foreground/20">
                    <IconCalendar className="h-6 w-6" />
                  </div>
                  <p className="text-sm">No image available</p>
                </div>
              </div>
            )}
          </figure>
          <div className="flex-1 space-y-3">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {tags.slice(0, 3).map((tag: Tag) => (
                  <Badge variant="secondary" key={tag._id}>
                    {tag.name}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            <div className="flex-1 space-y-2">
              <h3
                className={cn(
                  bricolageGrotesque.className,
                  "line-clamp-3 text-balance text-lg leading-tight sm:text-xl",
                  "transition-colors duration-200 group-hover:text-primary"
                )}
              >
                {title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {excerpt}
              </p>
            </div>
            <AuthorAvatar
              imageUrl={author?.imageUrl}
              name={author?.name}
              publishedAt={publishedAt}
              className="pt-2"
            />
          </div>
        </div>
      </Link>
    </article>
  );
};
