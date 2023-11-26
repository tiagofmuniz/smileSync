// iconHelpers.js

export function createIcon(className, iconName, patientId) {
    const icon = document.createElement("img");
    icon.className = className;
    icon.src = `src/assets/${iconName}`;
    icon.alt = "Icon";
    icon.dataset.patientId = patientId;
    icon.addEventListener("click", handleIconClick);
    return icon;
  }
  
  export function handleIconClick(event) {
    const patientId = event.target.dataset.patientId;
    const iconType = event.target.src.split("/").pop();
  
    switch (iconType) {
      case "edit.png":
        handleEditPatient(patientId);
        break;
      case "delete.png":
        handleDeletePatient(patientId);
        break;
      case "view-more.png":
        handleViewMorePatient(patientId);
        break;
      default:
        console.error("Ação não reconhecida para o ícone:", iconType);
    }
  }
  
  // Funções para manipular ações dos ícones
  function handleEditPatient(patientId) {
    console.log("Editar paciente com ID:", patientId);
  }
  
  function handleDeletePatient(patientId) {
    console.log("Apagar paciente com ID:", patientId);
  }
  
  function handleViewMorePatient(patientId) {
    console.log("Visualizar mais do paciente com ID:", patientId);
  }
  