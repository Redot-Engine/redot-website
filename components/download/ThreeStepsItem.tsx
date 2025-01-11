import Link from "next/link";

interface ThreeStepsItemProps {
  title: string;
  description: string;
  links: { text: string; url: string }[];
}

export const ThreeStepsItem = ({
  title,
  description,
  links,
}: ThreeStepsItemProps) => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.text}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline underline-offset-4 transition-all duration-300 hover:text-blue-600"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
