import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Stay updated with the latest changes, improvements, and new features in Redot.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
