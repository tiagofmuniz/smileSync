import { renderPatientsTable } from "../../view/renderPatientsTable/renderPatientsTable.js";

export function deletePatient(patientId) {
  // Obter a lista de pacientes do armazenamento local
  let patientsList = JSON.parse(window.localStorage.getItem("patientsList")) || [];

  // Encontrar o índice do paciente com o ID fornecido
  const patientIndex = patientsList.findIndex((p) => p.id === patientId);

  if (patientIndex !== -1) {
    // Confirmar a exclusão com o usuário
    const isConfirmed = confirm("Tem certeza de que deseja excluir este registro?");

    if (isConfirmed) {
      // Remover o paciente da lista
      patientsList.splice(patientIndex, 1);

      // Atualizar a lista no armazenamento local e re-renderizar a tabela de pacientes
      window.localStorage.setItem("patientsList", JSON.stringify(patientsList));
      renderPatientsTable(patientsList);
    }
  } else {
    console.error("Paciente com ID fornecido não encontrado na lista.");
  }
}
