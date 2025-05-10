import { CTA } from "@/components/shared/CTA";
import { LINKS } from "@/constants/common/links";

export const Start = () => {
  return (
    <CTA
      titleKey="startSection.title"
      descriptionKey="startSection.description"
      buttonLinks={[
        { href: "/download", labelKey: "startSection.buttons.download" },
        {
          href: LINKS.documentation,
          labelKey: "startSection.buttons.documentation",
          variant: "link",
        },
      ]}
    />
  );
};
