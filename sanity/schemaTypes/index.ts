import { type SchemaTypeDefinition } from "sanity";
import { postType } from "@/sanity/schemaTypes//postType";
import { tagType } from "@/sanity/schemaTypes/tagType";
import { authorType } from "@/sanity/schemaTypes/authorType";
import { reviewType } from "@/sanity/schemaTypes/reviewType";
import { bannerType } from "@/sanity/schemaTypes/bannerType";
import { platformType } from "@/sanity/schemaTypes/platformType";
import { changelogType } from "@/sanity/schemaTypes/changelogType";
import { blockContent } from "@/sanity/schemaTypes/objects/blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postType,
    tagType,
    authorType,
    reviewType,
    bannerType,
    platformType,
    changelogType,
    blockContent,
  ],
};
