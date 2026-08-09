import { marked } from "./node_modules/marked/lib/marked.esm.js";
import DOMPurify from "./node_modules/dompurify/dist/purify.es.mjs";

const API_URL = "http://localhost:3000/jobs";

export const sendTextToApi = async (text, cvText) => {
  let payload = { text: text, cvText: cvText };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  //   console.log(result);
  const purifiedText = DOMPurify.sanitize(marked.parse(result.text));
  return [purifiedText];
};
