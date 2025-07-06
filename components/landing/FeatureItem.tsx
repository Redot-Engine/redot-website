import { Features } from "@/constants/landing/features";

export const FeatureItem = ({ icon, label }: Features) => {
  return (
    <figure className="relative w-fit">
      <div className="flex flex-row items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded border border-rose-800 bg-rose-950 text-white">
          {icon}
        </div>
        <p className="text-sm font-medium">{label}</p>
      </div>
    </figure>
  );
};
