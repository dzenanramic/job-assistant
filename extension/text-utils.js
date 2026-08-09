export const normalizeText = (text) => {
  const marker = "prijavi se";
  const markerIndex = text.toLowerCase().indexOf(marker);

  return text.slice(0, markerIndex).trim();
};
