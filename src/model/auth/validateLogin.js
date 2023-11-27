import { hideErrorOnInput, renderFeedback } from "../../view/handlingFeedback.js";

export function validateLogin(email, pass) {
  if (!email || !pass) {
    renderFeedback("#formLoginFeedback", "Campos de entrada vazios");
    hideErrorOnInput("#inputLoginEmail", "#formLoginFeedback");
    hideErrorOnInput("#inputLoginPass", "#formLoginFeedback");
    return false;
  }

  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];

  const userValid = adminList.find((user) => user.email === email && user.pass === pass);

  if (userValid) {
    hideErrorOnInput("#inputLoginEmail", "#formLoginFeedback");
    hideErrorOnInput("#inputLoginPass", "#formLoginFeedback");
    return true;
  }

  renderFeedback("#formLoginFeedback", "Dados de acesso incorretos");
  return false;
}
