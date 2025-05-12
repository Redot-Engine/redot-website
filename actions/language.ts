"use server";

import { cookies } from "next/headers";
import { getCookieConsent } from "@/actions/cookieConsent";
import { COOKIE_CONSENT_MAX_AGE } from "@/constants/common/cookie";

export async function setLanguage(value: string) {
  const consent = (await getCookieConsent()) === "true";
  const cookieStore = await cookies();
  if (consent) {
    cookieStore.set("locale", value, {
      maxAge: COOKIE_CONSENT_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
  } else {
    cookieStore.set("locale", value, {
      path: "/",
      sameSite: "lax",
    });
  }
}

export async function getLanguage() {
  const cookieStore = await cookies();
  return cookieStore.get("locale")?.value ?? "en";
}
