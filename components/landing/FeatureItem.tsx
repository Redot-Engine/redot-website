import { FeaturesList } from "@/constants/featuresList";

export const FeatureItem = ({ icon, label }: FeaturesList) => {
  return (
    <figure className="relative w-fit">
      <div className="flex flex-row items-center gap-2">
        <div className="rinvert flex h-6 w-6 items-center justify-center rounded border border-red-900 bg-red-950/75 text-white">
          {icon}
        </div>
        <p className="text-sm font-medium">{label}</p>
      </div>
    </figure>
  );
};
