interface Language {
  value: string;
  label: string;
  code: string;
}

export const languages: Language[] = [
  { value: "ar", label: "العربية", code: "SA" },
  { value: "cs", label: "Čeština", code: "CZ" },
  { value: "da", label: "Dansk", code: "DK" },
  { value: "de", label: "Deutsch", code: "DE" },
  { value: "en", label: "English", code: "US" },
  { value: "en-GB", label: "English (UK)", code: "GB" },
  { value: "es", label: "Español", code: "ES" },
  { value: "es-LA", label: "Español (América Latina)", code: "LA" },
  { value: "fr", label: "Français", code: "FR" },
  { value: "hr", label: "Hrvatski", code: "HR" },
  { value: "it", label: "Italiano", code: "IT" },
  { value: "lt", label: "lietuvių kalba", code: "LT" },
  { value: "hu", label: "Magyar", code: "HU" },
  { value: "nl", label: "Nederlands", code: "NL" },
  { value: "no", label: "Norsk", code: "NO" },
  { value: "pl", label: "Polski", code: "PL" },
  { value: "pt-BR", label: "Português (Brasil)", code: "BR" },
  { value: "ro", label: "Română", code: "RO" },
  { value: "fi", label: "Suomi", code: "FI" },
  { value: "sv", label: "Svenska", code: "SE" },
  { value: "vi", label: "Tiếng Việt", code: "VN" },
  { value: "tr", label: "Türkçe", code: "TR" },
  { value: "el", label: "Ελληνικά", code: "GR" },
  { value: "bg", label: "български", code: "BG" },
  { value: "ru", label: "Русский", code: "RU" },
  { value: "uk", label: "Українська", code: "UA" },
  { value: "hi", label: "हिंदी", code: "IN" },
  { value: "th", label: "ไทย", code: "TH" },
  { value: "ko", label: "한국어", code: "KR" },
  { value: "zh-Hans", label: "中文", code: "CN" },
  { value: "zh-TW", label: "中文(繁體)", code: "TW" },
  { value: "ja", label: "日本語", code: "JP" },
];

export interface SanityLanguage {
  id: string;
  title: string;
}

export const SANITY_LANGUAGES: SanityLanguage[] = languages.map((lang) => ({
  id: lang.value,
  title: lang.label,
}));

export const DEFAULT_LANGUAGE = "en";
