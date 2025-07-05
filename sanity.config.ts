"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig, defineField, isKeySegment } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { codeInput } from "@sanity/code-input";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { SANITY_LANGUAGES } from "@/constants/common/languages";
import { languageFilter } from "@sanity/language-filter";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    internationalizedArray({
      languages: SANITY_LANGUAGES,
      defaultLanguages: ["en"],
      fieldTypes: [
        "string",
        defineField({
          name: "Text",
          type: "text",
        }),
        defineField({
          name: "BlockContent",
          type: "blockContent",
        }),
      ],
    }),
    codeInput(),
    languageFilter({
      supportedLanguages: SANITY_LANGUAGES,
      defaultLanguages: ["en"],
      documentTypes: ["post"],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        if (
          enclosingType.jsonType === "object" &&
          enclosingType.name.startsWith("internationalizedArray") &&
          "kind" in member
        ) {
          const pathEnd = member.field.path.slice(-2);
          const language =
            pathEnd[1] === "value" && isKeySegment(pathEnd[0])
              ? pathEnd[0]._key
              : null;

          return language ? selectedLanguageIds.includes(language) : false;
        }
        if (
          enclosingType.jsonType === "object" &&
          enclosingType.name.startsWith("locale")
        ) {
          return selectedLanguageIds.includes(member.name);
        }

        return true;
      },
    }),
  ],
});
