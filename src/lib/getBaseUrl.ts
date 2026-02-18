export function getBaseUrl() {
  // Preview環境
  if (process.env.VERCEL_URL && process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Production本番
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_ORIGIN!;
  }

  // ローカル開発
  return typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_ORIGIN!;
}
