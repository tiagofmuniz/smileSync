export function registerPatient(patient) {
  let patientList = JSON.parse(window.localStorage.getItem("patientList")) || [];

  patientList.push(patient);
  window.localStorage.setItem("patientList", JSON.stringify(patientList));
  console.log(patientList);

  //   redirectWithCountdown(".homeScreen", "#formLogin", "#formRegisterFeedback", "Usuário cadastrado com sucesso <br>Você será redirecionado para página de login em:");
}
