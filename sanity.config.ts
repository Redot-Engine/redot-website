"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, defineField } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    internationalizedArray({
      // Required configuration
      languages: [
        { id: "ar", title: "العربية" },
        { id: "cs", title: "Čeština" },
        { id: "da", title: "Dansk" },
        { id: "de", title: "Deutsch" },
        { id: "en", title: "English (US)" },
        { id: "en-GB", title: "English (UK)" },
        { id: "es", title: "Español" },
        { id: "es-LA", title: "Español (América Latina)" },
        { id: "fr", title: "Français" },
        { id: "hr", title: "Hrvatski" },
        { id: "it", title: "Italiano" },
        { id: "lt", title: "lietuvių kalba" },
        { id: "hu", title: "Magyar" },
        { id: "nl", title: "Nederlands" },
        { id: "no", title: "Norsk" },
        { id: "pl", title: "Polski" },
        { id: "pt-BR", title: "Português (Brasil)" },
        { id: "ro", title: "Română" },
        { id: "fi", title: "Suomi" },
        { id: "sv", title: "Svenska" },
        { id: "vi", title: "Tiếng Việt" },
        { id: "tr", title: "Türkçe" },
        { id: "el", title: "Ελληνικά" },
        { id: "bg", title: "български" },
        { id: "ru", title: "Русский" },
        { id: "uk", title: "Українська" },
        { id: "hi", title: "हिंदी" },
        { id: "th", title: "ไทย" },
        { id: "ko", title: "한국어" },
        { id: "zh-Hans", title: "中文" },
        { id: "zh-TW", title: "中文(繁體)" },
        { id: "ja", title: "日本語" },
      ],
      defaultLanguages: ["en"],
      fieldTypes: [
        "string",
        defineField({
          name: "Text",
          type: "text",
        }),
      ],
    }),
  ],
});
