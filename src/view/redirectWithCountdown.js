import { displayControl } from "./displayControl.js";
export function redirectWithCountdown(fromSelector, toSelector, messageSelector, message) {
  document.querySelector(toSelector).reset()


  const messageElement = document.querySelector(messageSelector);

  if (messageElement) {
    let secondsRemaining = 3;

    messageElement.innerHTML = `${message}  ${secondsRemaining} segundos...`;

    const countdownInterval = setInterval(() => {
      secondsRemaining--;
      messageElement.innerHTML = `${message}  ${secondsRemaining} segundos...`;
      if (secondsRemaining <= 0) {
        clearInterval(countdownInterval);
        displayControl(fromSelector, toSelector);
        messageElement.innerHTML = ""
        
      }
    }, 1000);
  }
}