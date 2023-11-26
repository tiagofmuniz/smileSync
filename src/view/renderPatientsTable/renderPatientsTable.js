// renderPatientsTable.js

import { createIcon, handleIconClick } from './iconHelpers.js';
import { addSortIconsToColumns, addColumnSortingListeners, handleColumnClick } from './sortingHelpers.js';
import { renderPagination, renderPaginationControls } from './paginationHelpers.js'; // Certifique-se de importar os ajudantes de paginação

export function renderPatientsTable(patientsList) {
  const tableBody = document.getElementById("pacientesTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  
  // Criar array de linhas
  const rows = patientsList.map((patient) => {
    const row = tableBody.insertRow();
    const cells = [
      row.insertCell(0),
      row.insertCell(1),
      row.insertCell(2),
      row.insertCell(3),
      row.insertCell(4),
      row.insertCell(5),
      row.insertCell(6)
    ];

    cells[0].textContent = patient.name;
    cells[1].textContent = patient.phone;
    cells[2].textContent = patient.address;
    cells[3].textContent = patient.appointmentDate;
    cells[4].textContent = patient.dentist;
    cells[5].textContent = patient.observation;

    const editIcon = createIcon("tableIcon", "edit.png", patient.id);
    const deleteIcon = createIcon("tableIcon", "delete.png", patient.id);
    const viewMoreIcon = createIcon("tableIcon", "view-more.png", patient.id);

    cells[6].appendChild(editIcon);
    cells[6].appendChild(deleteIcon);
    cells[6].appendChild(viewMoreIcon);

    return row;
  });

  // Adicionar ícones de ordenação às colunas específicas
  addSortIconsToColumns();

  // Adicionar event listener para ordenar colunas
  addColumnSortingListeners();

  // Adicionar paginação
  const itemsPerPage = 5;
  const currentPage = 1;
  renderPagination(tableBody, itemsPerPage, currentPage, rows);
  renderPaginationControls(tableBody, itemsPerPage, currentPage, rows);
}
