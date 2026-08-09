import * as pdfjsLib from "./lib/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "./lib/pdf.worker.mjs";

export const extractPdfText = async (file) => {
  const buffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) })
    .promise;

  const pageTexts = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();

    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");

    pageTexts.push(pageText);
  }
  return pageTexts.join("\n\n").trim();
};
