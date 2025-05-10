"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import Lenis from "@/components/layout/Lenis";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Lenis>
      <main className="scroll-smooth">
        <div className="absolute">
          <CookieConsent />
        </div>
        <Header />
        {children}
        <Footer />
      </main>
    </Lenis>
  );
}
