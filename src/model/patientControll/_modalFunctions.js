  export function listDentists(adminList) {
    const dentistSelect = document.getElementById("dentist");

    if (Array.isArray(adminList)) {
      console.log(adminList);
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

  export function clearFormFields() {
    const fieldsToClear = ["#clientName", "#clientPhone", "#street", "#number", "#complement", "#neighborhood", "#city", "#cep", "#clientAppointmentDate", "#clientAppointmentTime", "#dentist", "#observation"];

    fieldsToClear.forEach((field) => {
      document.querySelector(field).value = "";
    });
  }

  export function handleFormSubmission(clientRegistrationDialog) {
    const clientName = document.querySelector("#clientName").value;
    const clientPhone = document.querySelector("#clientPhone").value;
    const street = document.getElementById("street").value;
    const number = document.getElementById("number").value;
    const complement = document.getElementById("complement").value;
    const neighborhood = document.getElementById("neighborhood").value;
    const city = document.getElementById("city").value;
    const cep = document.getElementById("cep").value;
    const fullAddress = `${street}, ${number}${complement ? ", " + complement : ""}, ${neighborhood}, ${city}, ${cep}`;
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

