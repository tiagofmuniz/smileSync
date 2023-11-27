import { createIcon, handleIconClick } from "./iconHelpers.js";
import { addSortIconsToColumns, addColumnSortingListeners, handleColumnClick } from "./sortingHelpers.js";
import { renderPagination, renderPaginationControls } from "./paginationHelpers.js";
import { getLatestConsultation } from "../../utils/getLatestConsultation.js";
import { formatBrazilianDate } from "../../utils/formatBrazilianDate.js";
export function renderPatientsTable(patientsList) {
  const patientsTable = document.querySelector("#patientsTable");
  patientsTable.innerHTML = "";

  if (!Array.isArray(patientsList)) {
    console.error("A lista de pacientes não é uma matriz válida.");
    return;
  }
  console.log(patientsList);

  const target = document.querySelector("#patientsTable");
  patientsList.forEach((item) => {
    const patientContainer = `              
    <div class="accordion">
  <div class="accordion-item">
    <div class="frontContainer">
      <img src="../../../assets/profile-user.png" alt="Profile Image">
      <div class="nameContainer">${item?.patientInfo?.name ?? ""}</div>
      <div class="phoneContainer">${item?.patientInfo?.phone ?? ""}</div>
      <div class="dentistContainer">${item?.latestConsult?.dentist?.dentistName ?? ""}</div>
      <div class="dateConsultContainer">${item?.latestConsult?.dateInfo?.date ?? ""}</div>
      <div class="actions">
        <img class="iconActions" id="viewIcon" src="src/assets/view-more.png" alt="View Icon">
        <img class="iconActions" id="editIcon" src="src/assets/edit.png" alt="Edit Icon">
        <img class="iconActions" id="deleteIcon" src="src/assets/delete.png" alt="Delete Icon">
      </div>
    </div>
  </div>
  <input type="checkbox" id="accordion-item-${item?.id ?? ""}" class="item-input">
  <label for="accordion-item-${item?.id ?? ""}" class="item-label">Mais detalhes</label>
  <div class="item-content">
    <div class="addressContainer">${item?.patientInfo?.adress?.fullAddress ?? ""}</div>
    <div class="observationContainer">${item?.latestConsult?.observation ?? ""}</div>
  </div>
</div>
`;
    target.insertAdjacentHTML("beforeend", patientContainer);
  });

  // addSortIconsToColumns();
  // addColumnSortingListeners();

  // const itemsPerPage = 5;
  // const currentPage = 1;
  // renderPagination(tableBody, itemsPerPage, currentPage, rows);
  // renderPaginationControls(tableBody, itemsPerPage, currentPage, rows);
}
