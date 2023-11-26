export function initModalControl(adminList) {
  const openDialogBtn = document.getElementById("openDialogBtn");
  const clientRegistrationDialog = document.getElementById("clientRegistrationDialog");
  const clearDialogBtn = document.getElementById("clearDialogBtn");
  const closeDialogBtn = document.getElementById("closeDialogBtn");
  const clientRegistrationForm = document.getElementById("clientRegistrationForm");

  openDialogBtn.addEventListener("click", () => {
    clientRegistrationDialog.showModal();
    listDentists(adminList);
  });

  clearDialogBtn.addEventListener("click", () => {
    clearFormFields();
  });

  clientRegistrationDialog.addEventListener("close", () => {
    clearFormFields();
  });

  closeDialogBtn.addEventListener("click", () => {
    clientRegistrationDialog.close();
  });

  clientRegistrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmission(clientRegistrationDialog);
  });

  ///////////MODAL FUNCTIONS
  function listDentists(adminList) {
    const dentistSelect = document.getElementById("dentist");

    if (Array.isArray(adminList)) {
      adminList.forEach((dentist) => {
        const option = document.createElement("option");
        option.value = dentist.id;
        option.text = dentist.name;
        dentistSelect.appendChild(option);
      });
    } else {
      console.error("adminList não é um array definido.");
    }
  }

  function clearFormFields() {
    const fieldsToClear = ["#clientName", "#clientPhone", "#street", "#number", "#complement", "#neighborhood", "#city", "#cep", "#clientAppointmentDate", "#clientAppointmentTime", "#dentist", "#observation"];

    fieldsToClear.forEach((field) => {
      document.querySelector(field).value = "";
    });
  }

  function handleFormSubmission(clientRegistrationDialog) {
    const clientName = document.querySelector("#clientName").value;
    const clientPhone = document.querySelector("#clientPhone").value;
    const street = document.getElementById("street").value;
    const number = document.getElementById("number").value;
    const complement = document.getElementById("complement").value;
    const neighborhood = document.getElementById("neighborhood").value;
    const city = document.getElementById("city").value;
    const cep = document.getElementById("cep").value;

    const addressComponents = [street, number, complement, neighborhood, city, cep];
    const nonEmptyComponents = addressComponents.filter((component) => component);
    const fullAddress = nonEmptyComponents.length > 0 ? nonEmptyComponents.join(", ") : "";

    const clientAppointmentDate = document.querySelector("#clientAppointmentDate").value;
    const clientAppointmentTime = document.querySelector("#clientAppointmentTime").value;
    const dentist = document.querySelector("#dentist").value;
    const observation = document.querySelector("#observation").value;

    console.log(fullAddress);
    console.log(clientName);
    console.log(clientPhone);
    console.log(clientAppointmentDate);
    console.log(clientAppointmentTime);
    console.log(dentist);
    console.log(observation);

    clientRegistrationDialog.close();
    clearFormFields();
  }
}
