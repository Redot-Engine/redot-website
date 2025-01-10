import { FeaturesHighlightList } from "@/constants/featuresHighlightList";

export default function FeaturesHighlight({
  icon,
  header,
  description,
}: Readonly<FeaturesHighlightList>) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center space-y-2.5 text-center">
      <div className="flex h-8 w-8 items-center justify-center rounded border border-rose-800 bg-rose-950 text-white">
        {icon}
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold tracking-[-5%]">{header}</p>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
