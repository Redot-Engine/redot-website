// --------------------------------------------------------------------------------------------
// NOTE: This design will no longer receive updates or new features.
// Only bug fixes will be applied moving forward.
// --------------------------------------------------------------------------------------------

import Image from "next/image";
import { Tag } from "@/sanity/schemaTypes/tagType";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/sanity/schemaTypes/postType";
import { Badge } from "@/components/ui/badge";

export const PostSplashLegacy = ({
  title,
  tags,
  author,
  imageUrl,
  publishedAt,
}: Post) => {
  return (
    <div className="md:w-[720px flex max-w-[720px] flex-col gap-5 pb-12 md:w-[720px]">
      <div className="relative aspect-video w-full">
        <Image
          src={imageUrl}
          alt={title}
          className="h-full w-full rounded-xl object-cover"
          fetchPriority="high"
          fill
        />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag: Tag) => (
            <Badge key={tag.slug.current}>{tag.name}</Badge>
          ))}
        </div>
      )}

      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      <div className="mb-2 flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage
            src={author?.imageUrl}
            alt={author?.name || "Unknown Author"}
          />
          <AvatarFallback>
            {author?.name ? author.name.charAt(0).toUpperCase() : ""}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">
            {author?.name || "Unknown Author"}
          </p>
          <p className="text-xs font-medium text-muted-foreground">
            {formatDate(publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
