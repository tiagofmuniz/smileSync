import { createIcon, handleIconClick } from "./iconHelpers.js";
import { addSortIconsToColumns, addColumnSortingListeners, handleColumnClick } from "./sortingHelpers.js";
import { renderPagination, renderPaginationControls } from "./paginationHelpers.js";
import { getLatestConsultation } from "../../utils/getLatestConsultation.js";
import { formatBrazilianDate } from "../../utils/formatBrazilianDate.js";

export function renderPatientsTable(patientsList) {
  // console.log(patientsList);

  const tableBody = document.getElementById("pacientesTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  if (!Array.isArray(patientsList)) {
    console.error("A lista de pacientes não é uma matriz válida.");
    return;
  }

  const rows = patientsList.map((patient) => {
    console.log(patient);
    const row = tableBody.insertRow();
    const cells = [row.insertCell(0), row.insertCell(1), row.insertCell(2), row.insertCell(3), row.insertCell(4), row.insertCell(5), row.insertCell(6)];

    cells[0].textContent = patient.patientInfo?.name ?? "";
    cells[1].textContent = patient.patientInfo?.phone ?? "";
    cells[2].textContent = patient.patientInfo.adress.fullAddress ?? "";
    cells[3].textContent = `${formatBrazilianDate(patient.latestConsult.dateInfo.date)} ${patient.latestConsult.dateInfo.time}`;
    cells[4].textContent = patient.latestConsult?.dentist?.dentistName ?? "";
    cells[5].textContent = patient.latestConsult?.observation ?? "";

    const patientId = patient.id;
    console.log(patientId);
    // console.log(patientId)
    const editIcon = createIcon("tableIcon", "edit.png", patientId, patient);
    const deleteIcon = createIcon("tableIcon", "delete.png", patientId, patient);
    const viewMoreIcon = createIcon("tableIcon", "view-more.png", patientId, patient);

    cells[6].appendChild(editIcon);
    cells[6].appendChild(deleteIcon);
    cells[6].appendChild(viewMoreIcon);

    return row;
  });
  // debugger
// 
  addSortIconsToColumns();
  addColumnSortingListeners();

  const itemsPerPage = 5;
  const currentPage = 1;
  renderPagination(tableBody, itemsPerPage, currentPage, rows);
  renderPaginationControls(tableBody, itemsPerPage, currentPage, rows);
}
