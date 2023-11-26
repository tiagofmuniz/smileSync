export function addRegister() {
  const tabela = document.getElementById("pacientesTable").getElementsByTagName("tbody")[0];

  for (const paciente of pacientesData) {
    const linha = tabela.insertRow();
    const keys = Object.keys(paciente);

    for (let i = 0; i < keys.length; i++) {
      const cell = linha.insertCell(i);
      cell.textContent = paciente[keys[i]];
    }

    // Coluna de Ações
    const cellAcoes = linha.insertCell(keys.length);
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => editarPaciente(paciente));
    cellAcoes.appendChild(btnEditar);

    const btnDeletar = document.createElement("button");
    btnDeletar.textContent = "Deletar";
    btnDeletar.addEventListener("click", () => deletarPaciente(linha.rowIndex));
    cellAcoes.appendChild(btnDeletar);
  }
}
