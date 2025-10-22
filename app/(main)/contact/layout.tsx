import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export const runtime = "nodejs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
