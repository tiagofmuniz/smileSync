// iconHelpers.js

import { addRegisterPatient } from "../../model/patientControll/addOrUpdateRegister.js";
import { deletePatient } from "../../model/patientControll/deletePatient.js";
import { handleFormSubmission } from "../../model/patientControll/initModalControl.js";
import { getLatestConsultation } from "../../utils/getLatestConsultation.js";
import { openUpdatePatientModal } from "./modalHelpers.js";

// export function createIcon(className, iconName, patientId, patientData) {
//   // console.log(className)
//   // console.log(iconName)
//   // console.log(patientId)
//   // console.log(patientData)
//   const icon = document.createElement("img");
//   icon.className = className;
//   icon.src = `src/assets/${iconName}`;
//   icon.alt = "Icon";
//   icon.dataset.patientId = patientId;
//   icon.dataset.patientData = JSON.stringify(patientData);
//   icon.addEventListener("click", handleIconClick);
//   return icon;
// }

export function handleIconClick(event) {
  const patientId = event.target.dataset.patientId;
  const patientData = JSON.parse(event.target.dataset.patientData || "{}");
  // console.log(patientId)
  // console.log(patientData)

  const iconType = event.target.src.split("/").pop();
  switch (iconType) {
    case "edit.png":
      const btnSalvarNewRegister = document.querySelector("#btnSalvarNewRegister");
      btnSalvarNewRegister.style.display = "none";
      // Verificar se o botão já existe
      let novoBotao = document.querySelector("#novoBotao");
      if (!novoBotao) {
        novoBotao = document.createElement("button");
        novoBotao.id = "novoBotao";
        novoBotao.innerText = "Salvar...";

        const clearDialogBtn = document.getElementById("clearDialogBtn");
        clearDialogBtn.parentNode.insertBefore(novoBotao, clearDialogBtn);

        novoBotao.addEventListener("click", (e) => {
          e.preventDefault();
          addRegisterPatient(patientId)

          clientRegistrationDialog.close();

          novoBotao.parentNode.removeChild(novoBotao);
          btnSalvarNewRegister.style.display = "flex";

        });
      }
      
      openUpdatePatientModal(patientData);
      // clearFormFields();

      break;
    case "delete.png":
      // handleDeletePatient(patientId);
      deletePatient(patientId)
      

      break;
    case "view-more.png":
      handleViewMorePatient(patientId);
      break;
    default:
      console.error("Ação não reconhecida para o ícone:", iconType);
  }
}

function handleDeletePatient(patientId) {
  console.log("Apagar paciente com ID:", patientId);
}

function handleViewMorePatient(patientId) {
  console.log("Visualizar mais do paciente com ID:", patientId);
}
