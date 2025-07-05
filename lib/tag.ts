import { client } from "@/sanity/lib/client";

export async function getAllTags() {
  const query = `*[_type == "tag"] {
    _id,
    name,
    slug {
      current
    }
  } | order(name asc)`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching all tags:", error);
    throw new Error("Failed to fetch tags");
  }
}

export async function getUsedTags() {
  const query = `
    *[_type == "tag" && _id in *[_type == "post"].tags[]._ref] {
      _id,
      name,
      slug {
        current
      }
    } | order(name asc)
  `;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching used tags:", error);
    throw new Error("Failed to fetch used tags");
  }
}
