import { client } from "@/sanity/lib/client";
import { Banner } from "@/sanity/schemaTypes/bannerType";

export async function getLatestBanner(
  language: string = "en"
): Promise<Banner | null> {
  const query = `*[_type == "banner"] | order(_createdAt desc)[0]{
    _id,
    "mainMessage": coalesce(mainMessage[_key == "${language}"][0].value, mainMessage[_key == "en"][0].value),
    "subMessage": coalesce(subMessage[_key == "${language}"][0].value, subMessage[_key == "en"][0].value),
    link
  }`;
  return await client.fetch(query);
}
