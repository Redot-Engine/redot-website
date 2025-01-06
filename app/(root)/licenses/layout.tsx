import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licenses",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
