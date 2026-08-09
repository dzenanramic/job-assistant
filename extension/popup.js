import { extractText } from "./chrome-utils.js";
import { sendTextToApi } from "./api.js";
import { normalizeText } from "./text-utils.js";
import { extractPdfText } from "./file-utils.js";

const extractButton = document.querySelector("#extract");
const cvInput = document.getElementById("cvInput");
const resultDiv = document.getElementById("result");
let cvText = "";

const handleExtract = async () => {
  try {
    extractButton.disabled = true;

    resultDiv.className = "loading";
    resultDiv.innerHTML =
      '<span class="spinner"></span><span>Waiting for analysis result...</span>';

    const extractedText = await extractText();

    const cleanText = normalizeText(extractedText);

    const sendText = await sendTextToApi(cleanText, cvText);

    console.log("API rezultat:", sendText);
    resultDiv.className = "show";
    resultDiv.innerHTML = sendText;
  } catch (error) {
    console.error(error);
    resultDiv.className = "show";
    resultDiv.textContent = "Error: " + error.message;
  } finally {
    extractButton.disabled = false;
  }
};

const handleAddCv = async () => {
  const fileName = cvInput.files[0]?.name || "file";
  const file = await extractPdfText(cvInput.files[0]);
  console.log("Imamo CV", file);
  cvText = file;
  // cvInput.value = "";

  document.getElementById("uploadTitle").textContent = "CV added ✓";
  document.getElementById("uploadHint").textContent = fileName;
};

extractButton.addEventListener("click", handleExtract);
cvInput.addEventListener("change", handleAddCv);
