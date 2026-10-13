const API_URL = "http://127.0.0.1:8000/jobs";

export const sendTextToApi = async (text, cvText) => {
  let payload = { text: text, cvText: cvText };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  console.log("THIS IS RESULT IN SENDTEXTTOAPI", result);
  // const purifiedText = DOMPurify.sanitize(marked.parse(result));
  return result;
};
