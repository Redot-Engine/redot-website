import { FeaturesHighlightList } from "@/constants/featuresHighlightList";

export default function FeaturesHighlight({
  icon,
  header,
  description,
}: Readonly<FeaturesHighlightList>) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center space-y-2.5 text-center">
      <div className="rinvert flex h-8 w-8 items-center justify-center rounded border border-red-900 bg-red-950/75 text-white">
        {icon}
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold tracking-[-5%]">{header}</p>
        <p className="text-base text-black/60">{description}</p>
      </div>
    </div>
  );
}
