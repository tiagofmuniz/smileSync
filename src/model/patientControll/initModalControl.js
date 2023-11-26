import { formatBrazilianDate } from "../../utils/formatBrazilianDate.js";
import { generateId } from "../../utils/generateId.js";
import { registerPatient } from "./addRegister.js";

export function initModalControl() {
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];
  // console.log(adminList);

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
        option.value = dentist.name;
        option.text = dentist.name;
        option.dataset.IdDentist = dentist.id;
        dentistSelect.appendChild(option);
      });
    } else {
      console.error("adminList não é um array definido.");
    }
  }

  function clearFormFields() {
    const fieldsToClear = ["#clientName", "#clientPhone", "#street", "#number", "#complement", "#neighborhood", "#city", "#cep", "#clientAppointmentDate", "#clientAppointmentTime", "#dentist", "#observation"];

    fieldsToClear.forEach((field) => {
      document.querySelector(field).value = "";
    });
  }

  function handleFormSubmission(clientRegistrationDialog) {
    const clientName = document.querySelector("#clientName").value;
    const clientPhone = document.querySelector("#clientPhone").value;
    const street = document.getElementById("street").value;
    const number = document.getElementById("number").value;
    const complement = document.getElementById("complement").value;
    const neighborhood = document.getElementById("neighborhood").value;
    const city = document.getElementById("city").value;
    const cep = document.getElementById("cep").value;

    const addressComponents = [street, number, complement, neighborhood, city, cep];
    const nonEmptyComponents = addressComponents.filter((component) => component);
    const fullAddress = nonEmptyComponents.length > 0 ? nonEmptyComponents.join(", ") : "";
    const clientAppointmentDate = formatBrazilianDate(document.querySelector("#clientAppointmentDate").value);
    const clientAppointmentTime = document.querySelector("#clientAppointmentTime").value;
    const dentist = document.querySelector("#dentist").value;
    console.log(dentist)
    const observation = document.querySelector("#observation").value;

    const patientsData = {
      id: generateId(),
      name: clientName,
      phone: clientPhone,
      address: fullAddress,
      appointmentDate: clientAppointmentDate,
      appointmentTime: clientAppointmentTime,
      dentist: dentist,
      observation: observation,
    };

    console.log(patientsData);
    registerPatient(patientsData);

    clientRegistrationDialog.close();
    clearFormFields();
  }
}
