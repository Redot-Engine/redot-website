import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/sanity/schemaTypes/tagType";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/sanity/schemaTypes/postType";
import { bricolageGrotesque } from "@/app/fonts";

export const PostSplash = ({
  title,
  excerpt,
  tags,
  author,
  imageUrl,
  publishedAt,
}: Post) => {
  return (
    <div className="flex w-full flex-col items-center gap-8 pb-16 md:pb-24">
      <header className="md:w-4xl flex max-w-4xl flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-3">
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag: Tag) => (
                <Badge key={tag.slug.current} className="text-sm">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2
            className={`${bricolageGrotesque.className} text-balance text-3xl font-thin leading-tight tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl`}
          >
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl md:leading-8">
            {excerpt}
          </p>
        </div>
      </header>
      <div className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={author.imageUrl} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{author.name || "Unknown Author"}</p>
          <p className="text-sm font-medium text-muted-foreground">
            {formatDate(publishedAt)}
          </p>
        </div>
      </div>
      <div className="relative w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted lg:rounded-xl">
          <Image
            src={imageUrl}
            alt={`Featured image for ${title}`}
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      </div>
    </div>
  );
};
