import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redot Engine's Brand Guidelines",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
