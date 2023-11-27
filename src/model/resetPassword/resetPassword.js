import { resetForms } from "../../utils/resetForms.js";
import { hideErrorOnInput, renderFeedback } from "../../view/handlingFeedback.js";
import { redirectWithCountdown } from "../../view/redirectWithCountdown.js";

export function resetPassword(email, newPass) {
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];
  console.log(adminList);

  const userToUpdate = adminList.find((user) => user.email === email);

  if (userToUpdate) {
    if (userToUpdate.pass !== newPass) {
      userToUpdate.pass = newPass;

      window.localStorage.setItem("adminList", JSON.stringify(adminList));

      resetForms(["#formLogin", "#formForgotPass", "#formRegister"]);

      redirectWithCountdown("#formForgotPass", "#formLogin", "#formForgottenFeedback", "Senha alterada com sucesso <br>Você será redirecionado para a página de login em:");
    } else {
      renderFeedback("#formForgottenFeedback", "Senha nova é igual a senha atual");
      hideErrorOnInput("#inputForgottenPass", "#formForgottenFeedback");
    }
  } else {
    renderFeedback("#formForgottenFeedback", "Email de usuário não encontrado");
    hideErrorOnInput("#inputForgottenPass", "#formForgottenFeedback");
  }
}
