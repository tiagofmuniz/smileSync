// Importações
import { validateLogin } from "../model/auth/validateLogin.js";
import { fillFormWithDummyData } from "../model/patientControll/dummyData.js";
import { initModalControl } from "../model/patientControll/initModalControl.js";
import { registerAdmin } from "../model/registerAdmin/registerAdmin.js";
import { validateRegistrationFields } from "../model/registerAdmin/validateRegistrationFields.js";
import { resetPassword } from "../model/resetPassword/resetPassword.js";
import { validateResetPassword } from "../model/resetPassword/validateResetPassword.js";
import { resetForms } from "../utils/resetForms.js";
import { displayControl } from "../view/displayControl.js";
import { userRegistrationFlowFeedback } from "../view/handlingFeedback.js";
import { renderPatientsTable } from "../view/renderPatientsTable/renderPatientsTable.js";

// Variáveis globais
let adminList = JSON.parse(window.localStorage.getItem("adminList")) || []
let patientsList = JSON.parse(window.localStorage.getItem("patientsList")) || [];
console.log(adminList)
console.log(patientsList)
// window.localStorage.removeItem('patientsList')

document.addEventListener("DOMContentLoaded", setup);

// Registro de usuários
const btnRegisterEl = document.querySelector("#btnRegister");
btnRegisterEl.addEventListener("click", handleRegister);

// Recuperação de senha
const btnRecoverPassword = document.querySelector(".btnRecoverPassword");
btnRecoverPassword.addEventListener("click", handleRecoverPassword);

// Login
const btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", handleLogin);

// Links "Esqueceu a senha"
const forgotPass = document.querySelectorAll(".forgotPass");
forgotPass.forEach((linkRecoverPass) => {
  linkRecoverPass.addEventListener("click", handleForgotPasswordLink);
});

// Botão "Voltar"
const previous = document.querySelectorAll(".previous");
previous.forEach((previousLink) => {
  previousLink.addEventListener("click", handlePrevious);
});

// Botão "Entrar"
const btnToEnter = document.querySelector("#btnToEnter");
btnToEnter.addEventListener("click", handleToEnter);

// Funções
function setup() {
  // document.querySelector("#openDialogBtn").click();
  document.querySelector("#btnToEnter").click();
  document.querySelector("#inputLoginEmail").value = "teste@teste.com"
  document.querySelector("#inputLoginPass").value = "123456789"
  document.querySelector("#btnLogin").click();
  document.querySelector("#openDialogBtn").click()
  initModalControl(patientsList);
  // fillFormWithDummyData();
  renderPatientsTable(patientsList);

}

function handleRegister(e) {
  e.preventDefault();
  const name = document.querySelector("#inputRegisterName").value;
  const email = document.querySelector("#inputRegisterEmail").value;
  const pass = document.querySelector("#inputRegisterPass").value;
  const passRepeat = document.querySelector("#inputRegisterRepeatPass").value;

  const resultValidateFields = validateRegistrationFields(name, email, pass, passRepeat);
  if (resultValidateFields !== 200) {
    userRegistrationFlowFeedback(resultValidateFields);
  } else {
    registerAdmin(name, email, pass);
  }
}

function handleRecoverPassword(e) {
  e.preventDefault();
  const email = document.querySelector("#inputForgottenEmail").value;
  const pass = document.querySelector("#inputForgottenPass").value;
  const passRepeat = document.querySelector("#inputForgottenRepeatPass").value;

  const resultValidateFieldsForgottenPass = validateResetPassword(email, pass, passRepeat);

  if (resultValidateFieldsForgottenPass !== 200) {
    userRegistrationFlowFeedback(resultValidateFieldsForgottenPass);
  } else {
    resetPassword(email, pass);

  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.querySelector("#inputLoginEmail").value;
  const pass = document.querySelector("#inputLoginPass").value;

  const validLogin = validateLogin(email, pass);

  if (validLogin) {
    displayControl("#formLogin", "#patientControl");
  } else {
    // Lógica para tratamento de login inválido
  }
}

function handleForgotPasswordLink(e) {
  const origin = e.target && e.target.getAttribute("id");

  if (origin === "forgotPassWelcome" || origin === "forgotPassLogin") {
    document.querySelector("#formForgotPass").reset();
    displayControl(`${origin === "forgotPassWelcome" ? ".homeScreen" : "#formLogin"}`, "#formForgotPass");
  }
}

function handlePrevious(e) {
  const origin = e.target && e.target.getAttribute("id");

  if (origin === "previousReset" || origin === "previousLogin") {
    console.log(origin);
    displayControl(`${origin === "previousReset" ? "#formForgotPass" : "#formLogin"}`, ".homeScreen");
    resetForms(["#formLogin", "#formForgotPass", "#formRegister"]);
  }
}

function handleToEnter() {
  displayControl(".homeScreen", "#formLogin");
}
