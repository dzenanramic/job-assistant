import { extractText } from "./chrome-utils.js";
import { sendTextToApi } from "./api.js";
import { normalizeText } from "./text-utils.js";
import { extractPdfText } from "./file-utils.js";

const extractButton = document.querySelector("#extract");
const extractLabel = document.getElementById("extractLabel");
const statusDiv = document.getElementById("status");
const cvInput = document.getElementById("cvInput");
const resultDiv = document.getElementById("result");
let score = document.getElementById("score");
let strengths = document.getElementById("strengths");
let gaps = document.getElementById("gaps");
let suggestions = document.getElementById("suggestions");
let flags = document.getElementById("flags");

let cvText = "";

const setBusy = (busy, message = "") => {
  extractButton.disabled = busy;
  extractButton.setAttribute("aria-busy", String(busy));
  extractLabel.textContent = busy ? "Analyzing..." : "Analyze";
  statusDiv.textContent = busy ? message : "";
};

const handleExtract = async () => {
  try {
    setBusy(true, "Extracting page text...");
    resultDiv.className = "loading";

    const { text: extractedText, site } = await extractText();

    const cleanText = normalizeText(extractedText, site);

    console.log(cleanText);

    setBusy(true, "Analyzing your CV against this job...");
    const sendText = await sendTextToApi(cleanText, cvText);

    console.log("API rezultat:", sendText);

    resultDiv.className = "show";
    score.innerText = sendText.score;
    console.log("This is score", sendText.score);
    strengths.innerHTML = sendText.strengths
      .map((el) => `<li>${el}</li>`)
      .join("");

    gaps.innerHTML = sendText.gaps.map((el) => `<li>${el}</li>`).join("");
    suggestions.innerHTML = sendText.suggestions
      .map((el) => `<li>${el}</li>`)
      .join("");
    sendText.flags
      ? (flags.innerHTML = sendText.flags
          .map((el) => `<li>${el}</li>`)
          .join(""))
      : "";
  } catch (error) {
    console.error(error);
    resultDiv.className = "show";
    // Write into the content wrapper so the loading skeleton stays hidden.
    resultDiv.querySelector(".result-content").textContent =
      "Error: " + error.message;
  } finally {
    setBusy(false);
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
