// paginationHelpers.js

// Função para criar e exibir páginas
export function renderPagination(tableBody, itemsPerPage, currentPage, data) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = data.slice(startIndex, endIndex);
  
    // Limpar tabela
    tableBody.innerHTML = "";
  
    // Adicionar linhas da tabela com os dados da página atual
    displayedData.forEach((row) => {
      tableBody.appendChild(row);
    });
  }
  
  // Função para criar e exibir controles de paginação
  export function renderPaginationControls(tableBody, itemsPerPage, currentPage, data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    // Limpar controles de paginação
    const paginationControls = document.getElementById("paginationControls");
    if (paginationControls) {
      paginationControls.remove();
    }
  
    // Criar controles de paginação
    const controlsContainer = document.createElement("div");
    controlsContainer.id = "paginationControls";
  
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.addEventListener("click", () => handlePageClick(i, tableBody, itemsPerPage, data));
      controlsContainer.appendChild(button);
    }
  
    // Adicionar controles à tabela
    document.getElementById("pacientesTable").appendChild(controlsContainer);
  
    // Atualizar estado do botão da página atual
    updateCurrentPageButton(currentPage);
  }
  
  // Função para atualizar o estado do botão da página atual
  function updateCurrentPageButton(currentPage) {
    const buttons = document.getElementById("paginationControls").getElementsByTagName("button");
    Array.from(buttons).forEach((button, index) => {
      button.classList.toggle("active", index + 1 === currentPage);
    });
  }
  
  // Função para manipular o clique em um botão de página
  function handlePageClick(page, tableBody, itemsPerPage, data) {
    renderPagination(tableBody, itemsPerPage, page, data);
    updateCurrentPageButton(page);
  }
  