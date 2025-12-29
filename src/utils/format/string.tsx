//convert Number full-width to half-width
export const toHalfWidth = (val: string) =>
  val.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));

// Format Paragraph Blank line break
export const formatParagraph = (text?: string) => {
  if (!text) return null;

  const lines = text.split(/\n/).map((line) => line.trim());

  return lines.map((line, index) =>
    line.length > 0 ? <p key={index}>{line}</p> : <p key={index}>&nbsp;</p>
  );
};
