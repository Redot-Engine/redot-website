import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatDate } from "@/lib/utils";

interface AuthorAvatarProps {
  className?: string;
  imageUrl?: string;
  name: string;
  publishedAt?: string;
}

export const AuthorAvatar = ({
  className,
  imageUrl,
  name,
  publishedAt,
}: AuthorAvatarProps) => (
  <div className={cn("flex flex-row items-center gap-1.5", className)}>
    <Avatar className="size-6">
      <AvatarImage src={imageUrl} alt={name ?? "Unknown Author"} />
      <AvatarFallback>
        {name ? name.charAt(0).toUpperCase() : ""}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-row items-center gap-1">
      <p className="text-sm font-medium after:content-['_・']">
        {name ?? "Unknown Author"}
      </p>
      {publishedAt && (
        <time
          dateTime={publishedAt}
          className="text-sm font-medium text-muted-foreground"
        >
          {formatDate(publishedAt)}
        </time>
      )}
    </div>
  </div>
);
