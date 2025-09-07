import { DownloadHero } from "@/components/sections/download/DownloadHero";
import { DownloadThreeSteps } from "@/components/sections/download/DownloadThreeSteps";
import { DownloadSupportedPlatform } from "@/components/sections/download/DownloadSupportedPlatform";
import { DownloadInformation } from "@/components/sections/download/DownloadInformation";
import { Metadata } from "next";
import { links } from "@/constants/links";
import { CTA } from "@/components/CTA";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export async function generateMetadata(props: {
  readonly params: Promise<{ platform: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const platform = params.platform;
  const capitalizedPlatform = capitalizeFirstLetter(platform);

  return {
    title: `Download for ${capitalizedPlatform}`,
  };
}

export default async function DownloadPlatform({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const platform = (await params).platform;
  return (
    <div>
      <DownloadHero platform={platform} />
      <DownloadThreeSteps />
      <DownloadSupportedPlatform />
      <DownloadInformation />
      <CTA
        titleKey="downloadHelp.title"
        descriptionKey="downloadHelp.description"
        buttonLinks={[
          { href: "/discord", labelKey: "downloadHelp.buttons.discord" },
          {
            href: links.documentation,
            labelKey: "downloadHelp.buttons.documentation",
            variant: "link",
          },
        ]}
      />
    </div>
  );
}
