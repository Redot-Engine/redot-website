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
      <div className="relative h-full cursor-pointer overflow-hidden rounded-xl border border-gray-950/[.1] p-4 transition-transform duration-300 hover:scale-105 hover:bg-gray-950/[.01]">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-video w-full">
            <Image
              src={imageUrl}
              alt={label}
              className="h-full w-full rounded-xl object-cover"
              fill
            />
          </div>
          <div>
            <h2 className="text-lg font-medium">{label}</h2>
            <p className="text-base text-black/60">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
