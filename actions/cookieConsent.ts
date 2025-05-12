"use server";

import { cookies } from "next/headers";
import { COOKIE_CONSENT_MAX_AGE } from "@/constants/common/cookie";

export async function setCookieConsent() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "cookieConsent",
    value: "true",
    path: "/",
    maxAge: COOKIE_CONSENT_MAX_AGE,
    sameSite: "lax",
  });
}

export async function getCookieConsent(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("cookieConsent")?.value;
}
