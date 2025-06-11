import { client } from "@/sanity/lib/client";
import { Platform } from "@/sanity/schemaTypes/platformType";

export async function getAllPlatforms(): Promise<Platform[]> {
  const query = `*[_type == "platform"]{ "id": _id, name, "slug": slug.current }`;
  return await client.fetch(query);
}
