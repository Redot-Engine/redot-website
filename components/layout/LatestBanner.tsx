"use client";

import { getLatestBanner } from "@/lib/banner";
import { getLanguage } from "@/actions/language";
import Banner from "@/components/layout/Banner";
import { Banner as BannerType } from "@/sanity/schemaTypes/bannerType";
import useSWR from "swr";

const fetchLatestBanner = async (): Promise<BannerType | null> => {
  const language = await getLanguage();
  return getLatestBanner(language);
};

export default function LatestBanner() {
  const { data: banner } = useSWR("latest-banner", fetchLatestBanner);

  if (!banner) return null;

  return (
    <Banner
      subMessage={banner.subMessage}
      mainMessage={banner.mainMessage}
      link={banner.link}
    />
  );
}
