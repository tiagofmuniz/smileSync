// modalHelpers.js

import { renderPatientsTable } from "./renderPatientsTable.js";

export function openUpdatePatientModal(patientData) {
  console.log(patientData)
  const modal = document.querySelector("#clientRegistrationDialog");
  modal.showModal();

  // Limpar o conteúdo do modal antes de abrir
  // clearFormFields();
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];


  document.getElementById("clientName").value = patientData?.patientInfo?.name ?? "";
  document.getElementById("clientPhone").value = patientData?.patientInfo?.phone ?? "";
  document.getElementById("street").value = patientData?.patientInfo?.adress.street || "";
  document.getElementById("number").value = patientData?.patientInfo?.adress.number || "";
  document.getElementById("complement").value = patientData?.patientInfo?.adress.complement || "";
  document.getElementById("neighborhood").value = patientData?.patientInfo?.adress.neighborhood || "";
  document.getElementById("city").value = patientData?.patientInfo?.adress.city || "";
  document.getElementById("cep").value = patientData?.patientInfo?.adress.cep || "";
  document.getElementById("clientAppointmentDate").value = patientData?.latestConsult?.dateInfo.date || "";
  document.getElementById("clientAppointmentTime").value = patientData?.latestConsult?.dateInfo.time || "";
  document.getElementById("observation").value = patientData?.observation ?? "";

  const dentistSelect = document.getElementById("dentist");
  dentistSelect.innerHTML = "";

  adminList.forEach((admin) => {
    const option = document.createElement("option");
    option.value = admin.id;
    option.text = admin.name;
    dentistSelect.add(option);
  });

  dentistSelect.value = patientData?.latestConsult?.dentist?.dentistId ?? "";

  // const updateButton = document.getElementById("clientRegistrationForm").querySelector('[type="submit"]');
  // updateButton.removeEventListener("click", handleUpdateButtonClick);
  // updateButton.addEventListener("click", () => handleUpdateButtonClick(patientData));
}

// export function handleUpdatePatient(updatedPatient) {
//   const patientId = updatedPatient.patientInfo.id; // Corrigido para acessar o ID corretamente
//   let patientsList = JSON.parse(window.localStorage.getItem("patientsList")) || [];
//   const patientIndex = patientsList.findIndex((patient) => patient.patientInfo.id === patientId);

//   if (patientIndex === -1) {
//     console.error("Paciente não encontrado na lista.");
//     return;
//   }

//   patientsList[patientIndex] = updatedPatient;
//   window.localStorage.removeItem("patientsList"); // Corrigido para "patientsList"
//   window.localStorage.setItem("patientsList", JSON.stringify(patientsList));

//   const modal = document.getElementById("clientRegistrationDialog");
//   modal.close();

//   renderPatientsTable(patientsList);
// }

// function handleUpdateButtonClick(updatedPatient) {
//   handleUpdatePatient(updatedPatient);
// }
