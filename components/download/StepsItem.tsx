import Link from "next/link";

interface StepsItemProps {
  title: string;
  description: string;
  links: {
    text: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}

export const StepsItem = ({
  title,
  description,
  links,
}: Readonly<StepsItemProps>) => {
  return (
    <div className="flex flex-col gap-4 text-pretty p-3 md:p-6">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.text}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-orange-400 underline-offset-4 hover:underline"
          >
            {link.icon}
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
