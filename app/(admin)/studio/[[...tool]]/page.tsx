import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { Metadata } from "next";

export const runtime = "nodejs";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
