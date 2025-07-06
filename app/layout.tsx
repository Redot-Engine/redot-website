import type { Metadata } from "next";
import { inter } from "@/app/fonts";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { getBaseUrl } from "@/lib/base-url";

export const runtime = "edge";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Redot Engine: Open source game engine for everyone.",
    template: "%s - Redot Engine",
  },
  description:
    "Redot Engine: Open-source, powerful, and easy-to-use for stunning games. Join our active community!",
  alternates: {
    canonical: baseUrl,
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Redot Engine",
    title: "Redot Engine: Open source game engine for everyone.",
    description:
      "Redot Engine: Open-source, powerful, and easy-to-use for stunning games. Join our active community!",
    images: [
      {
        url: `${baseUrl}/homepage.webp`,
        width: 1200,
        height: 630,
        alt: "Redot Engine - Open source game engine for everyone",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redot Engine: Open source game engine for everyone.",
    description:
      "Redot Engine: Open-source, powerful, and easy-to-use for stunning games. Join our active community!",
    images: [`${baseUrl}/homepage.webp`],
    creator: "@Redot_Engine",
    site: "@Redot_Engine",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700 selection:bg-zinc-700/60 selection:text-white"
    >
      <head>
        <link rel="preconnect" href="https://image.redotengine.org" />
      </head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ""} />
      <body className={`${inter.className} bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
