async function translateText() {
  const text = document.getElementById("text").value.trim();
  const result = document.getElementById("result");

  if (!text) {
    result.textContent = "Please enter some text to translate.";
    return;
  }

  result.textContent = "Translating...";

  try {
    const url =
      "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(text) +
      "&langpair=en|fr";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    result.textContent =
      data.responseData.translatedText || "Translation failed.";

  } catch (error) {
    console.error(error);
    result.textContent = "Translation error. Please try again.";
  }
}

function copyText() {
  const text = document.getElementById("result").textContent;

  if (text) {
    navigator.clipboard.writeText(text);
    alert("Translation copied!");
  }
    }
