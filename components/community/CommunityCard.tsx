import Link from "next/link";
import Image from "next/image";

export interface CommunityCardProps {
  readonly imageUrl: string;
  readonly label: string;
  readonly description: string;
  readonly href: string;
}

export const CommunityCard = ({
  imageUrl,
  label,
  description,
  href,
}: Readonly<CommunityCardProps>) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="relative h-full cursor-pointer overflow-hidden rounded-lg border border-border p-4 transition-colors duration-200 hover:bg-accent/60">
        <div className="space-y-4">
          <div className="relative aspect-video w-full border border-border">
            <Image
              src={imageUrl}
              alt={label}
              className="h-full w-full rounded-md object-cover"
              loading="lazy"
              fill
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-balance text-lg font-semibold tracking-tighter">
              {label}
            </h3>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
