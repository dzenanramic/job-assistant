const siteMarkers = {
  dzobs: { start: "objavi oglas", end: "prijavi se" },
  linkedin: { start: "about the job", end: "" },
  helloworld: { start: "", end: "pogledaj profil kompanije" },
};

export const normalizeText = (text, site) => {
  const markers = siteMarkers[site];
  const lowerText = text.toLowerCase();

  const startIndex = markers.start ? lowerText.indexOf(markers.start) : -1;
  const from = startIndex === -1 ? 0 : startIndex + markers.start.length;

  const endIndex = markers.end ? lowerText.indexOf(markers.end, from) : -1;
  const to = endIndex === -1 ? lowerText.length : endIndex;

  return text.slice(from, to).trim();
};
