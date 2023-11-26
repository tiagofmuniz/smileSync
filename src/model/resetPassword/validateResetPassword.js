export function validateResetPassword(email, pass, repeatPass) {
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];
// console.log(adminList)
  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function emailExists(email, adminList) {
    if (adminList.length > 0) {
      const emailExists = adminList.some((newAdmin) => newAdmin.email === email);
      return emailExists;
    }
  }

  function isPasswordValid(value) {
    return value.length >= 8;
  }

  function arePasswordsEqual(password, confirmPassword) {
    return password === confirmPassword;
  }

  const validationResults = {
    isEmailValid: isValidEmail(email),
    isPasswordValid: isPasswordValid(pass),
    arePasswordsEqual: arePasswordsEqual(pass, repeatPass),
    emailExists: emailExists(email, adminList),
  };

  const objectValidation = [
    { feedbackContainer: "#forgottenEmailFeedback", fieldOrigin: "#inputForgottenEmail", isValid: isValidEmail(email), message: "Digite um e-mail válido." },
    { feedbackContainer: "#forgottenEmailFeedback", fieldOrigin: "#inputForgottenEmail", isValid: emailExists(email, adminList), message: "Email não registrado" },
    { feedbackContainer: "#forgottenPassFeedback", fieldOrigin: "#inputForgottenPass", isValid: isPasswordValid(pass), message: "A senha deve ter pelo menos 8 caracteres." },
    { feedbackContainer: "#forgottenPassRepeatFeedback", fieldOrigin: "#inputForgottenRepeatPass", isValid: arePasswordsEqual(pass, repeatPass), message: "As senhas não coincidem." },
  ];

  const anyInvalid = Object.values(validationResults).some((result) => !result);

  return anyInvalid ? objectValidation : +200;
}
