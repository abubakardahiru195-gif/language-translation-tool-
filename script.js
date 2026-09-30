function translateText() {
  const text = document.getElementById("text").value;
  const result = document.getElementById("result");

  if (text.trim() === "") {
    result.textContent = "Please enter some text.";
    return;
  }

  result.textContent = "You entered: " + text;
}

function copyText() {
  const text = document.getElementById("result").textContent;

  navigator.clipboard.writeText(text);
  alert("Copied!");
}
