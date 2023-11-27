import { formatBrazilianDate } from "../../utils/formatBrazilianDate.js";

import { openUpdatePatientModal } from "./modalHelpers.js";
import { addRegisterPatient } from "../../model/patientControll/addOrUpdateRegister.js";
import { deletePatient } from "../../model/patientControll/deletePatient.js";
export function renderPatientsTable(patientsList) {
  const patientsTable = document.querySelector("#patientsTable");
  patientsTable.innerHTML = "";

  if (!Array.isArray(patientsList)) {
    console.error("A lista de pacientes não é uma matriz válida.");
    return;
  }

  const target = document.querySelector("#patientsTable");
  patientsList.forEach((item) => {
    const patientContainer = `              
    <div class="accordion">
    <div class="accordion-item">
      <div class="frontContainer">
        <img src="src/assets/profile-user.png" alt="Profile Image">
        <div class="nameContainer"><span class="title">Nome</span><span>${item?.patientInfo?.name ?? ""}</span></div>
        <div class="phoneContainer"><span class="title">Telefone</span><span>${item?.patientInfo?.phone ?? ""}</span></div>
        <div class="dentistContainer"><span class="title">Dentista responsável</span><span>${item?.latestConsult?.dentist?.dentistName ?? ""}</span></div>
        <div class="dateConsultContainer"><span class="title">Data da consulta</span><span>${formatBrazilianDate(item?.latestConsult?.dateInfo?.date) ?? ""} ${item?.latestConsult?.dateInfo?.time ?? ""}</span></div>
        <div class="actions">
          <img class="iconActions" id="viewIcon" src="src/assets/view-more.png" alt="View Icon" data-actionid=${item.id}>
          <img class="iconActions" id="editIcon" src="src/assets/edit.png" alt="Edit Icon" data-actionid=${item.id}>
          <img class="iconActions" id="deleteIcon" src="src/assets/delete.png" alt="Delete Icon" data-actionid=${item.id}>
        </div>
      </div>
      <input type="checkbox" id="accordion-item-${item?.id ?? ""}" class="item-input">
      <label for="accordion-item-${item?.id ?? ""}" class="item-label">Mais detalhes</label>
      <div class="item-content">
        <div class="addressContainer"><span>Endereço: <span>${item?.patientInfo?.adress?.fullAddress ?? ""}</div>
        <div class="observationContainer"><span>Observações da última consulta: <span>${item?.latestConsult?.observation ?? ""}</div>
      </div>
    </div>
  </div>
`;
    target.insertAdjacentHTML("beforeend", patientContainer);
  });

  const actionIcons = document.querySelectorAll(".iconActions");
  actionIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const triggerId = e.target.getAttribute("id");
      const editIconActionId = e.target.dataset.actionid;
      const patientData = patientsList.find((item) => item.id === editIconActionId);
      console.log(patientData);

      if (triggerId === "viewIcon") {
        const btnSalvarNewRegister = document.querySelector("#btnSalvarNewRegister");
        const clearDialogBtn = document.querySelector("#clearDialogBtn");
        btnSalvarNewRegister.style.display = "none";
        clearDialogBtn.style.display = "none";

        openUpdatePatientModal(patientData);
      }

      if (triggerId === "editIcon") {
        openUpdatePatientModal(patientData);
        const btnSalvarNewRegister = document.querySelector("#btnSalvarNewRegister");
        btnSalvarNewRegister.style.display = "none";
        let novoBotao = document.querySelector("#novoBotao");
        if (!novoBotao) {
          novoBotao = document.createElement("button");
          novoBotao.id = "novoBotao";
          novoBotao.innerText = "Salvar...";

          const clearDialogBtn = document.getElementById("clearDialogBtn");
          clearDialogBtn.parentNode.insertBefore(novoBotao, clearDialogBtn);

          novoBotao.addEventListener("click", (e) => {
            e.preventDefault();
            addRegisterPatient(editIconActionId);

            clientRegistrationDialog.close();

            novoBotao.parentNode.removeChild(novoBotao);
            btnSalvarNewRegister.style.display = "flex";
          });
        }

        openUpdatePatientModal(patientData);
      }

      if (triggerId === "deleteIcon") {
        deletePatient(editIconActionId);
      }
    });
  });
}
