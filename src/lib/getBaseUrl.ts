export function getBaseUrl() {
  //クライアント
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  //SEREVER｜Preview環境
  if (process.env.VERCEL_URL && process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  }

  //SEREVER｜Production環境
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_ORIGIN!;
  }

  // ローカル開発
  return process.env.NEXT_PUBLIC_ORIGIN!;
}
