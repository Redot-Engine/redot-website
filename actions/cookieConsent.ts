"use server";

import { cookies } from "next/headers";

export async function setCookieConsent() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "cookieConsent",
    value: "true",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

export async function getCookieConsent(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("cookieConsent")?.value;
}
