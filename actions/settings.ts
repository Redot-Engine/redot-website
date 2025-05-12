"use server";

import { cookies } from "next/headers";
import { getCookieConsent } from "@/actions/cookieConsent";
import { SETTINGS_COOKIE_MAX_AGE } from "@/constants/common/cookie";

const SETTINGS_COOKIE = "settings";
const DEFAULT_SETTINGS = {
  blogLayout: "new",
};

export async function saveSettings(
  newSettings: Partial<typeof DEFAULT_SETTINGS>
) {
  const consent = (await getCookieConsent()) === "true";
  const cookieStore = await cookies();
  const current = await getSettings();
  const updated = { ...current, ...newSettings };
  const cookieOptions: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  };
  if (consent) {
    cookieOptions.maxAge = SETTINGS_COOKIE_MAX_AGE;
  }
  cookieStore.set(SETTINGS_COOKIE, JSON.stringify(updated), cookieOptions);
}

export async function getSettings(): Promise<typeof DEFAULT_SETTINGS> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SETTINGS_COOKIE)?.value;
  if (!raw) return { ...DEFAULT_SETTINGS };
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}
