//convert Number full-width to half-width
export const toHalfWidth = (val: string) =>
  val.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
