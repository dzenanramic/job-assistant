export const extractText = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);

  const [{ result: text }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.body.innerText,
  });

  // console.log(text);
  return text;
};
