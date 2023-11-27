// sortingHelpers.js

export function addSortIconsToColumns() {
  const headerRow = document.getElementById("pacientesTable").getElementsByClassName("headerRow")[0];

  // Remover ícones de ordenação existentes
  const existingIcons = headerRow.querySelectorAll(".tableIcon.sortIcons");
  existingIcons.forEach(icon => icon.remove());

  // Adicionar ícone de ordenação à coluna de Nome (índice 0)
  const nameColumn = headerRow.getElementsByClassName("tableCell1")[0];
  nameColumn.appendChild(createSortIcon(0));

  // Adicionar ícone de ordenação à coluna de Data da Consulta (índice 3)
  const dateColumn = headerRow.getElementsByClassName("tableCell4")[0];
  dateColumn.appendChild(createSortIcon(3));

  // Adicionar ícone de ordenação à coluna de Dentista Responsável (índice 4)
  const dentistColumn = headerRow.getElementsByClassName("tableCell5")[0];
  dentistColumn.appendChild(createSortIcon(4));
}

// Função para criar ícone de ordenação
export function createSortIcon(columnIndex) {
  const icon = document.createElement("img");
  icon.className = "tableIcon sortIcons";
  icon.src = "src/assets/sort.png";
  icon.alt = "Sort Icon";
  icon.addEventListener("click", () => handleColumnClick(columnIndex));
  return icon;
}

// Função para adicionar event listener para ordenar colunas
export function addColumnSortingListeners() {
  const tableHeaders = document.getElementById("pacientesTable").getElementsByClassName("headerRow")[0].getElementsByClassName("tableCells");

  // Remover EventListeners existentes para evitar duplicação
  Array.from(tableHeaders).forEach((header, index) => {
    header.removeEventListener("click", () => handleColumnClick(index));
  });

  // Adicionar EventListeners atualizados
  Array.from(tableHeaders).forEach((header, index) => {
    header.addEventListener("click", (event) => {
      // Verificar se o clique ocorreu no ícone
      const isIconClick = event.target.classList.contains("tableIcon") && event.target.classList.contains("sortIcons");
      
      // Chamar handleColumnClick apenas se não for um clique no ícone
      if (!isIconClick) {
        handleColumnClick(index);
      }
    });
  });
}
  
 // Função para manipular o clique em uma coluna
export function handleColumnClick(columnIndex) {
  console.log("Clicado na coluna:", columnIndex);

  const tableBody = document.getElementById("pacientesTable").getElementsByClassName("tbody")[0];
  const rows = Array.from(tableBody.getElementsByClassName("tableRow"));

  // Obter a direção atual da ordenação
  const currentDirection = tableBody.dataset.sortDirection || "asc";

  // Obter o índice da coluna pela qual ordenar
  const sortColumn = tableBody.dataset.sortColumn || "";

  // Verificar se é a mesma coluna clicada novamente
  const isSameColumn = sortColumn === columnIndex.toString();

  // Atualizar a direção da ordenação
  tableBody.dataset.sortDirection = isSameColumn ? (currentDirection === "asc" ? "desc" : "asc") : "asc";

  // Armazenar o índice da coluna ordenada
  tableBody.dataset.sortColumn = columnIndex;

  // Obter a propriedade pela qual ordenar
  let propertyName;
  switch (columnIndex) {
    case 0:
      propertyName = "name";
      break;
    case 1:
      propertyName = "phone";
      break;
    case 2:
      propertyName = "address";
      break;
    case 3:
      propertyName = "appointmentDate";
      break;
    case 4:
      propertyName = "dentist";
      break;
    case 5:
      propertyName = "observation";
      break;
    default:
      // Se o índice da coluna não corresponder a nenhuma propriedade conhecida, não fazer nada
      return;
  }

  // Ordenar os dados
  const sortedRows = rows.sort((a, b) => {
    const aValue = a.getElementsByClassName("tableCells")[columnIndex].textContent.toLowerCase();
    const bValue = b.getElementsByClassName("tableCells")[columnIndex].textContent.toLowerCase();

    if (currentDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Limpar e recriar as linhas ordenadas na tabela
  tableBody.innerHTML = "";
  sortedRows.forEach((row) => tableBody.appendChild(row));
}
