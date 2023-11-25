import { redirectWithCountdown } from "../../view/redirectWithCountdown.js";
import { generateId } from "../../utils/generateId.js";

export function registerAdmin(name, email, pass) {
  const newAdmin = { id: generateId(), access: "admin", name, email, pass };
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];

  adminList.push(newAdmin);
  window.localStorage.setItem("adminList", JSON.stringify(adminList));

  redirectWithCountdown(".homeScreen", "#formLogin", "#formRegisterFeedback", "Usuário cadastrado com sucesso <br>Você será redirecionado para página de login em:");
}

