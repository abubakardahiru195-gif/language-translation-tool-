async function translateText() {
  const text = document.getElementById("text").value.trim();
  const source = document.getElementById("sourceLanguage").value;
  const target = document.getElementById("targetLanguage").value;
  const result = document.getElementById("result");

  if (!text) {
    result.textContent = "Please enter some text to translate.";
    return;
  }

  if (source === target) {
    result.textContent = text;
    return;
  }

  result.textContent = "Translating...";

  try {
    const url =
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}` +
      `&langpair=${source}|${target}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200) {
      result.textContent = data.responseData.translatedText;
    } else {
      result.textContent = "Translation failed. Please try again.";
    }
  } catch (error) {
    result.textContent =
      "An error occurred. Please check your internet connection.";
  }
}

function copyText() {
  const text = document.getElementById("result").textContent;

  if (text && text !== "Translation will appear here...") {
    navigator.clipboard.writeText(text);
    alert("Translation copied!");// Translation tool
  }
}
