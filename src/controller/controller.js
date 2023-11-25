import { validateLogin } from "../model/auth/validateLogin.js";
import { registerAdmin } from "../model/registerAdmin/registerAdmin.js";
import { validateRegistrationFields } from "../model/registerAdmin/validateRegistrationFields.js";
import { resetPassword } from "../model/resetPassword/resetPassword.js";
import { validateResetPassword } from "../model/resetPassword/validateResetPassword.js";
import { resetForms } from "../utils/resetForms.js";
import { displayControl } from "../view/displayControl.js";
import { renderFeedback, hideErrorOnInput,userRegistrationFlowFeedback } from "../view/handlingFeedback.js";

let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];
console.log(adminList);
// window.localStorage.clear()
///FLUXO REGISTRAR USUÁRIOS

const btnRegisterEl = document.querySelector("#btnRegister");
btnRegisterEl.addEventListener("click", (e) => {
  e.preventDefault();
  const inputRegisterName = document.querySelector("#inputRegisterName");
  const inputRegisterEmail = document.querySelector("#inputRegisterEmail");
  const inputRegisterPass = document.querySelector("#inputRegisterPass");
  const inputRegisterPassRepeat = document.querySelector("#inputRegisterRepeatPass");

  const name = inputRegisterName.value;
  const email = inputRegisterEmail.value;
  const pass = inputRegisterPass.value;
  const passRepeat = inputRegisterPassRepeat.value;

  const resultValidateFields = validateRegistrationFields(name, email, pass, passRepeat);
  if (resultValidateFields != +200) {
    userRegistrationFlowFeedback(resultValidateFields);
  } else {
    registerAdmin(name, email, pass);
  }
});

const btnRecoverPassword = document.querySelector(".btnRecoverPassword");
btnRecoverPassword.addEventListener("click", (e) => {
  e.preventDefault();
  const inputForgottenEmail = document.querySelector("#inputForgottenEmail");
  const inputForgottenPass = document.querySelector("#inputForgottenPass");
  const inputForgottenRepeatPass = document.querySelector("#inputForgottenRepeatPass");

  const email = inputForgottenEmail.value;
  const pass = inputForgottenPass.value;
  const passRepeat = inputForgottenRepeatPass.value;

  const resultValidateFieldsForgottenPass = validateResetPassword(email, pass, passRepeat);

  if (resultValidateFieldsForgottenPass != +200) {
    userRegistrationFlowFeedback(resultValidateFieldsForgottenPass);
  } else {
    resetPassword(email, pass);
  }
});

const btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector("#inputLoginEmail");
  const loginPass = document.querySelector("#inputLoginPass");

  const email = loginEmail.value;
  const pass = loginPass.value;

  const validLogin = validateLogin(email, pass);
  if (validLogin) {
    displayControl("#formLogin", "#pacientes");
  } else {
    
    renderFeedback("#formLoginFeedback", "Dados de acesso incorretos");
    hideErrorOnInput("#inputLoginEmail", "#formLoginFeedback");
    hideErrorOnInput("#inputLoginPass", "#formLoginFeedback");
  }
});

const forgotPass = document.querySelectorAll(".forgotPass");

forgotPass.forEach((linkRecoverPass) => {
  linkRecoverPass.addEventListener("click", (e) => {
    const origin = e.target && e.target.getAttribute("id");

    if (origin === "forgotPassWelcome") {
      document.querySelector("#formForgotPass").reset();
      displayControl(".homeScreen", "#formForgotPass");
    }
    if (origin === "forgotPassLogin") {
      document.querySelector("#formForgotPass").reset();
      displayControl("#formLogin", "#formForgotPass");
    }
  });
});
const previous = document.querySelector(".previous");
previous.addEventListener("click", () => {
  displayControl("#formLogin", ".homeScreen");
  displayControl("#formForgotPass", ".homeScreen");
  displayControl("#formLogin", ".homeScreen");
  resetForms(["#formLogin", "#formForgotPass", "#formLogin"]);
});

const btnToEnter = document.querySelector("#btnToEnter");
btnToEnter.addEventListener("click", () => {
  displayControl(".homeScreen", "#formLogin");
});
