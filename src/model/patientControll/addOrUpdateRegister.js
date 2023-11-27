import { generateId } from "../../utils/generateId.js";
import { getLatestConsultation } from "../../utils/getLatestConsultation.js";
import { renderPatientsTable } from "../../view/renderPatientsTable/renderPatientsTable.js";

export function addRegisterPatient(patientId) {
  // Obter a lista de pacientes do armazenamento local
  let patientsList = JSON.parse(window.localStorage.getItem("patientsList")) || [];

  // Obter os valores dos campos do formulário
  const clientName = document.querySelector("#clientName").value ?? "";
  const clientPhone = document.querySelector("#clientPhone").value ?? "";
  const clientAppointmentDate = document.querySelector("#clientAppointmentDate").value ?? "";
  const clientAppointmentTime = document.querySelector("#clientAppointmentTime").value ?? "";
  const observation = document.querySelector("#observation").value ?? "";

  // Obter valores do dentista selecionado
  const dentistSelect = document.querySelector("#dentist");
  let dentistName = "";
  let dentistId = "";

  if (dentistSelect && dentistSelect.options.length > 0 && dentistSelect.selectedIndex !== -1) {
    dentistName = dentistSelect.options[dentistSelect.selectedIndex].text || "";
    dentistId = dentistSelect.options[dentistSelect.selectedIndex].value || "";
  } else {
    console.error("Selecione um dentista válido.");
  }

  // Obter valores do endereço
  const street = document.getElementById("street").value ?? "";
  const number = document.getElementById("number").value ?? "";
  const complement = document.getElementById("complement").value ?? "";
  const neighborhood = document.getElementById("neighborhood").value ?? "";
  const city = document.getElementById("city").value ?? "";
  const cep = document.getElementById("cep").value ?? "";
  const addressComponents = [street, number, complement, neighborhood, city, cep] ?? "";
  const nonEmptyComponents = addressComponents.filter((component) => component) ?? "";
  const fullAddress = nonEmptyComponents.length > 0 ? nonEmptyComponents.join(", ") : "";

  // Construir objeto de dados do paciente
  let patientsData = {
    id: patientId || generateId(),
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

  // Obter e adicionar a última consulta
  const lastConsult = getLatestConsultation(patientsData?.consultations);
  patientsData.latestConsult = lastConsult;

  // Verificar se o paciente já existe
  const existingPatientIndex = patientsList.findIndex((p) => p.id === patientsData.id);

  if (existingPatientIndex !== -1) {
    // Paciente já existe, atualiza os dados
    patientsList[existingPatientIndex] = patientsData;
  } else {
    // Paciente não existe, adiciona à lista
    patientsList.push(patientsData);
  }

  // Atualizar a lista no armazenamento local e re-renderizar a tabela de pacientes
  window.localStorage.setItem("patientsList", JSON.stringify(patientsList));
  renderPatientsTable(patientsList);
}
