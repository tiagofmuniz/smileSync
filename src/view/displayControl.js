export function displayControl(fromSelector, toSelector) {
  const fromElement = document.querySelector(fromSelector);
  const toElement = document.querySelector(toSelector);

  if (fromElement && toElement) {
    fromElement.style.display = "none";
    toElement.style.display = "flex";
  }
}
