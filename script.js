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
    const apiUrl =
      "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(text) +
      "&langpair=" +
      source +
      "|" +
      target;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      result.textContent = data.responseData.translatedText;
    } else {
      result.textContent = "Translation failed.";
    }

  } catch (error) {
    console.error(error);
    result.textContent = "Translation error. Please try again.";
  }
}

function copyText() {
  const text = document.getElementById("result").textContent;

  if (text && text !== "Translation will appear here...") {
    navigator.clipboard.writeText(text);
    alert("Translation copied!");
  }
}

function clearText() {
  document.getElementById("text").value = "";
  document.getElementById("result").textContent =
    "Translation will appear here...";
}

function swapLanguages() {
  const source = document.getElementById("sourceLanguage");
  const target = document.getElementById("targetLanguage");

  const temp = source.value;
  source.value = target.value;
  target.value = temp;
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  const button = document.querySelector(".theme-btn");

  if (document.body.classList.contains("dark")) {
    button.textContent = "☀️ Light Mode";
  } else {
    button.textContent = "🌙 Dark Mode";
  }
}

function speakText() {
  const text = document.getElementById("result").textContent;

  if (!text || text === "Translation will appear here...") {
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}
