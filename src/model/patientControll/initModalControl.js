import { generateId } from "../../utils/generateId.js";
import { getLatestConsultation } from "../../utils/getLatestConsultation.js";
import { addRegisterPatient } from "./addOrUpdateRegister.js";

function clearFormFields() {
  const fieldsToClear = ["#clientName", "#clientPhone", "#street", "#number", "#complement", "#neighborhood", "#city", "#cep", "#clientAppointmentDate", "#clientAppointmentTime", "#dentist", "#observation"];

  fieldsToClear.forEach((field) => {
    document.querySelector(field).value = "";
  });
}
export function initModalControl() {
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];

  const openDialogBtn = document.getElementById("openDialogBtn");
  const clientRegistrationDialog = document.getElementById("clientRegistrationDialog");
  const clearDialogBtn = document.getElementById("clearDialogBtn");
  const closeDialogBtn = document.getElementById("closeDialogBtn");
  const clientRegistrationForm = document.getElementById("clientRegistrationForm");

  openDialogBtn.addEventListener("click", () => {
    clientRegistrationDialog.showModal();
    listDentists(adminList);
  });

  clearDialogBtn.addEventListener("click", () => {
    clearFormFields();
  });

  clientRegistrationDialog.addEventListener("close", () => {
    clearFormFields();
  });

  closeDialogBtn.addEventListener("click", () => {
    clientRegistrationDialog.close();
  });

  clientRegistrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmission(clientRegistrationDialog);
  });

  ///////////MODAL FUNCTIONS
  function listDentists(adminList) {
    const dentistSelect = document.getElementById("dentist");

    // Limpar a lista existente
    dentistSelect.innerHTML = "";

    if (Array.isArray(adminList)) {
      adminList.forEach((dentist) => {
        const option = document.createElement("option");
        option.value = dentist.id;
        option.text = dentist.name;
        option.dataset.IdDentist = dentist.id;
        dentistSelect.appendChild(option);
      });
    } else {
      console.error("adminList não é um array definido.");
    }
  }
}
export function handleFormSubmission(clientRegistrationDialog) {
 
  const clientName = document.querySelector("#clientName").value ?? "";
  const clientPhone = document.querySelector("#clientPhone").value;
  const clientAppointmentDate = document.querySelector("#clientAppointmentDate").value;
  console.log(clientAppointmentDate)
  const clientAppointmentTime = document.querySelector("#clientAppointmentTime").value;
  const observation = document.querySelector("#observation").value;

  const dentistSelect = document.querySelector("#dentist");
  const dentistName = dentistSelect.options[dentistSelect.selectedIndex].text;
  const dentistId = dentistSelect.options[dentistSelect.selectedIndex].value;

  const street = document.getElementById("street").value;
  const number = document.getElementById("number").value;
  const complement = document.getElementById("complement").value;
  const neighborhood = document.getElementById("neighborhood").value;
  const city = document.getElementById("city").value;
  const cep = document.getElementById("cep").value;
  const addressComponents = [street, number, complement, neighborhood, city, cep];
  const nonEmptyComponents = addressComponents.filter((component) => component);
  const fullAddress = nonEmptyComponents.length > 0 ? nonEmptyComponents.join(", ") : "";

  let patientsData = {
    id: "",
    patientInfo: {
      name: clientName,
      phone: clientPhone ?? "",
      adress: {
        street: street ?? "",
        number: number ?? "",
        complement: complement ?? "",
        neighborhood: neighborhood ?? "",
        city: city ?? "",
        cep: cep ?? "",
        fullAddress: fullAddress ?? "",
      },
    },
    consultations: [
      {
        dateInfo: { date: clientAppointmentDate, time: clientAppointmentTime },
        dentist: { dentistName, dentistId: dentistId },
        observation: observation,
      },
    ],
  };

  addRegisterPatient("", patientsData);

  clientRegistrationDialog.close();
  clearFormFields();
}
