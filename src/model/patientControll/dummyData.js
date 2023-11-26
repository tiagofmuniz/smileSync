export function fillFormWithDummyData() {
  // Valores fictícios
  const dummyData = {
    clientName: "John Doe",
    clientPhone: "(12) 34567-8901",
    street: "123 Main St",
    number: "456",
    neighborhood: "Suburbia",
    city: "Cityville",
    cep: "12345-678",
    clientAppointmentDate: "2023-12-01",
    clientAppointmentTime: "15:30",
    complement: "apt 1401",
    dentist: "dentist-123",
    observation: "Some notes about the client",
  };

  // Preencher os campos do formulário com os valores fictícios
  document.querySelector("#clientName").value = dummyData.clientName;
  document.querySelector("#clientPhone").value = dummyData.clientPhone;
  document.querySelector("#street").value = dummyData.street;
  document.querySelector("#number").value = dummyData.number;
  document.querySelector("#neighborhood").value = dummyData.neighborhood;
  document.querySelector("#city").value = dummyData.city;
  document.querySelector("#cep").value = dummyData.cep;
  document.querySelector("#clientAppointmentDate").value = dummyData.clientAppointmentDate;
  document.querySelector("#clientAppointmentTime").value = dummyData.clientAppointmentTime;
  document.querySelector("#complement").value = dummyData.complement;
  document.querySelector("#dentist").value = dummyData.dentist;
  document.querySelector("#observation").value = dummyData.observation;
}
