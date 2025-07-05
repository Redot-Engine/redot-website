const GROQ_DANGEROUS_CHARS = /["[\]{}()\\|&<>]/g;
const SEARCH_UNSAFE_CHARS = /[<>"'&]/g;
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<[^>]*>/g,
];

/**
 * Basic input sanitization for general use cases
 * Removes potentially dangerous characters and trims whitespace
 */
export function sanitizeInput(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .trim()
    .replace(SEARCH_UNSAFE_CHARS, "") // Remove basic unsafe characters
    .replace(/\s+/g, " ") // Normalize whitespace
    .slice(0, 1000); // Limit length to prevent abuse
}

/**
 * Strict sanitization for GROQ queries
 * Removes characters that could be used for GROQ injection
 */
export function sanitizeForGroq(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .trim()
    .replace(GROQ_DANGEROUS_CHARS, "")
    .replace(/\s+/g, " ")
    .slice(0, 500);
}

/**
 * Sanitize input for search functionality
 * Allows more characters but still prevents injection
 */
export function sanitizeSearchInput(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Allow letters, numbers, spaces, and basic punctuation for search
  const sanitized = input
    .trim()
    .replace(/[^\w\s\-_.,:;!?]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 200);

  return sanitized;
}

/**
 * Sanitize slug input (for URLs)
 * Ensures slugs are URL-safe
 */
export function sanitizeSlug(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-_]/g, "")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

/**
 * Sanitize HTML content to prevent XSS attacks
 * Note: For production use, consider using a dedicated library like DOMPurify
 */
export function sanitizeHtml(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  let sanitized = input.trim();

  XSS_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, "");
  });

  return sanitized;
}

/**
 * Validate and sanitize language codes
 * Ensures language codes follow ISO 639-1 format (2 letters)
 */
export function sanitizeLanguageCode(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return "en";
  }

  const sanitized = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .slice(0, 2);

  return sanitized.length === 2 ? sanitized : "en";
}

/**
 * Sanitize numeric input
 * Ensures the input is a valid number within specified bounds
 */
export function sanitizeNumber(
  input: string | number | null | undefined,
  min: number = 0,
  max: number = Number.MAX_SAFE_INTEGER
): number {
  if (input === null || input === undefined) {
    return min;
  }

  const num = typeof input === "string" ? parseInt(input, 10) : input;

  if (isNaN(num)) {
    return min;
  }

  return Math.max(min, Math.min(max, num));
}

/**
 * Batch sanitize multiple inputs
 */
export function sanitizeInputs(
  inputs: Record<string, string>
): Record<string, string> {
  const sanitized: Record<string, string> = {};

  for (const [key, value] of Object.entries(inputs)) {
    sanitized[key] = sanitizeInput(value);
  }

  return sanitized;
}

/**
 * Utility to check if input contains potentially dangerous content
 */
export function containsDangerousContent(
  input: string | null | undefined
): boolean {
  if (!input || typeof input !== "string") {
    return false;
  }

  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /file:/i,
    /\{\{.*\}\}/g,
    /\$\{.*\}/g,
  ];

  return dangerousPatterns.some((pattern) => pattern.test(input));
}

export default sanitizeInput;
