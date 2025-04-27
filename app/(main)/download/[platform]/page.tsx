import { DownloadHero } from "@/components/sections/download/DownloadHero";
import { DownloadThreeSteps } from "@/components/sections/download/DownloadThreeSteps";
import { DownloadSupportedPlatform } from "@/components/sections/download/DownloadSupportedPlatform";
import { DownloadOverview } from "@/components/sections/download/DownloadOverview";
import { Metadata } from "next";
import { links } from "@/constants/links";
import { CTA } from "@/components/CTA";
import { capitalizeFirstLetter } from "@/lib/utils";
import { platformMapping } from "@/constants/platformMapping";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  readonly params: Promise<{ platform: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const platform = params.platform;

  if (!Object.keys(platformMapping).includes(platform)) {
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

  if (!Object.keys(platformMapping).includes(platform)) {
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
            href: links.documentation,
            labelKey: "downloadHelp.buttons.documentation",
            variant: "link",
          },
        ]}
      />
    </div>
  );
}
