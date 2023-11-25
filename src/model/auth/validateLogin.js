export function validateLogin(email, pass) {
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];
  console.log(adminList);


  const userValid = adminList.filter((user) => user.email === email && user.pass === pass);

  if (userValid.lenght > 0) {
    return true;
  } else {
    return false;
  }

  //   const validationResults = {
  //     isNameValid: isNotEmpty(name),
  //     isEmailValid: isValidEmail(email),
  //     isPasswordValid: isPasswordValid(pass),
  //     arePasswordsEqual: arePasswordsEqual(pass, repeatPass),
  //     isEmailUnique: isEmailUnique(email, adminList),
  //   };

  //   const objectValidation = [
  //     { feedbackContainer: "#nameFeedback", fieldOrigin: "#inputRegisterName", isValid: isNotEmpty(name), message: "Digite seu nome completo." },
  //     { feedbackContainer: "#emailFeedback", fieldOrigin: "#inputRegisterEmail", isValid: isValidEmail(email), message: "Digite um e-mail válido." },
  //     { feedbackContainer: "#emailFeedback", fieldOrigin: "#inputRegisterEmail", isValid: isEmailUnique(email, adminList), message: "Este e-mail já está registrado. Por favor, escolha outro e-mail." },
  //     { feedbackContainer: "#passFeedback", fieldOrigin: "#inputRegisterPass", isValid: isPasswordValid(pass), message: "A senha deve ter pelo menos 8 caracteres." },
  //     { feedbackContainer: "#formRegisterFeedback", fieldOrigin: ".pass", isValid: arePasswordsEqual(pass, repeatPass), message: "As senhas não coincidem." },
  //   ];

  //   const anyInvalid = Object.values(validationResults).some((result) => !result);

  //   return anyInvalid ? objectValidation : +200;
}
