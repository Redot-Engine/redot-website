import Image from "next/image";

export const MascotImage = () => (
  <div className="relative">
    <Image
      src="https://image.redotengine.org/redotchan.png"
      alt="Redotchan mascot"
      width={160}
      height={160}
      className="drop-shadow-lg"
      priority
    />
    <div className="absolute -inset-2 animate-pulse rounded-full bg-gradient-to-r from-red-400/20 to-pink-400/20 blur-xl" />
  </div>
);
