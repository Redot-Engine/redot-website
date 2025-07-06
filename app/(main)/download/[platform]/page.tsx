import { DownloadHero } from "@/components/sections/download/DownloadHero";
import { DownloadThreeSteps } from "@/components/sections/download/DownloadThreeSteps";
import { DownloadSupportedPlatform } from "@/components/sections/download/DownloadSupportedPlatform";
import { DownloadOverview } from "@/components/sections/download/DownloadOverview";
import { Metadata } from "next";
import { LINKS } from "@/constants/common/links";
import { CTA } from "@/components/shared/CTA";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PLATFORM_MAPPING } from "@/constants/download/platforms";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  readonly params: Promise<{ platform: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const platform = params.platform;

  if (!Object.keys(PLATFORM_MAPPING).includes(platform)) {
    notFound();
  }

  const capitalizedPlatform = capitalizeFirstLetter(platform);

  return {
    title: `Download for ${capitalizedPlatform}`,
  };
}

export default async function DownloadPlatform({
  params,
}: Readonly<{
  params: Promise<{ platform: string }>;
}>) {
  const platform = (await params).platform;

  if (!Object.keys(PLATFORM_MAPPING).includes(platform)) {
    notFound();
  }

  return (
    <div>
      <DownloadHero platform={platform} />
      <DownloadThreeSteps />
      <DownloadSupportedPlatform />
      <DownloadOverview />
      <CTA
        titleKey="downloadHelp.title"
        descriptionKey="downloadHelp.description"
        buttonLinks={[
          { href: "/discord", labelKey: "downloadHelp.buttons.discord" },
          {
            href: LINKS.documentation,
            labelKey: "downloadHelp.buttons.documentation",
            variant: "link",
          },
        ]}
      />
    </div>
  );
}
