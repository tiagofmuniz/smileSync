import { hideErrorOnInput, renderFeedback } from "../../view/handlingFeedback.js";

export function validateLogin(email, pass) {
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];

  const userValid = adminList.filter((user) => user.email === email && user.pass === pass);

  if (userValid.length > 0) {
    hideErrorOnInput("#inputLoginEmail", "#formLoginFeedback");
    hideErrorOnInput("#inputLoginPass", "#formLoginFeedback");
    return true;
  }else{
    renderFeedback("#formLoginFeedback", "Dados de acesso incorretos");

  }
  if (!email) {
    renderFeedback("#formLoginFeedback", "Campo de email vazio");
    hideErrorOnInput("#inputLoginEmail", "#formLoginFeedback");
  }
  if (!pass) {
    renderFeedback("#formLoginFeedback", "Campo de senha vazio");
    hideErrorOnInput("#inputLoginPass", "#formLoginFeedback");
  }
  if (!pass && !email) {
    renderFeedback("#formLoginFeedback", "Campos de entrada vazios");
    hideErrorOnInput("#inputLoginEmail", "#formLoginFeedback");
    hideErrorOnInput("#inputLoginPass", "#formLoginFeedback");
  }
}