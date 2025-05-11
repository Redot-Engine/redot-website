import { type SchemaTypeDefinition } from "sanity";
import { postType } from "@/sanity/schemaTypes//postType";
import { tagType } from "@/sanity/schemaTypes/tagType";
import { authorType } from "@/sanity/schemaTypes/authorType";
import { reviewType } from "@/sanity/schemaTypes/reviewType";
import { bannerType } from "@/sanity/schemaTypes/bannerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, tagType, authorType, reviewType, bannerType],
};
