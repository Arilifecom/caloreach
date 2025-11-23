//encode
export function encodeCursor(data: string) {
  const standardBase64 = Buffer.from(data, "utf8").toString("base64");
  const urlSafeBase64 = standardBase64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return urlSafeBase64;
}

//decode
export function decodeCursor(cursor: string) {
  if (!cursor) return;

  const standardBase64 = cursor
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(cursor.length + ((4 - (cursor.length % 4)) % 4), "=");

  const decoded = Buffer.from(standardBase64, "base64").toString("utf8");

  try {
    return JSON.parse(decoded);
  } catch {
    return decoded;
  }
}
