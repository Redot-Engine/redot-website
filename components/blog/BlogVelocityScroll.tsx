import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

interface BlogVelocityScrollProps {
  readonly text: string;
}

export const BlogVelocityScroll = ({ text }: BlogVelocityScrollProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-5 lg:px-40">
      <VelocityScroll className="py-8" numRows={1}>
        {text}
      </VelocityScroll>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
};
