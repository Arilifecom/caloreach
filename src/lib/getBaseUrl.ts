export function getBaseUrl() {
  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_ORIGIN!;
  }

  return typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_ORIGIN!;
}
