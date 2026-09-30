function translateText() {
  const text = document.getElementById("text").value.trim();
  const result = document.getElementById("result");

  if (!text) {
    result.textContent = "Please enter some text to translate.";
    return;
  }

  result.textContent = "Translating...";

  fetch(
    "https://api.mymemory.translated.net/get?q=" +
    encodeURIComponent(text) +
    "&langpair=en|fr"
  )
    .then(response => response.json())
    .then(data => {
      if (data.responseData && data.responseData.translatedText) {
        result.textContent = data.responseData.translatedText;
      } else {
        result.textContent = "Translation failed.";
      }
    })
    .catch(error => {
      result.textContent = "Translation error.";
    });
}

function copyText() {
  const text = document.getElementById("result").textContent;
  navigator.clipboard.writeText(text);
  alert("Translation copied!");
}
