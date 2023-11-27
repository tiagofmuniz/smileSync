
export function openUpdatePatientModal(patientData) {
  console.log(patientData)
  const modal = document.querySelector("#clientRegistrationDialog");
  modal.showModal();

  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];


  document.getElementById("clientName").value = patientData?.patientInfo?.name ?? "";
  document.getElementById("clientPhone").value = patientData?.patientInfo?.phone ?? "";
  document.getElementById("street").value = patientData?.patientInfo?.adress.street || "";
  document.getElementById("number").value = patientData?.patientInfo?.adress.number || "";
  document.getElementById("complement").value = patientData?.patientInfo?.adress.complement || "";
  document.getElementById("neighborhood").value = patientData?.patientInfo?.adress.neighborhood || "";
  document.getElementById("city").value = patientData?.patientInfo?.adress.city || "";
  document.getElementById("cep").value = patientData?.patientInfo?.adress.cep || "";
  document.getElementById("clientAppointmentDate").value = patientData?.latestConsult?.dateInfo.date || "";
  document.getElementById("clientAppointmentTime").value = patientData?.latestConsult?.dateInfo.time || "";
  document.getElementById("observation").value = patientData?.latestConsult?.observation ?? "";

  const dentistSelect = document.getElementById("dentist");
  dentistSelect.innerHTML = "";

  adminList.forEach((admin) => {
    const option = document.createElement("option");
    option.value = admin.id;
    option.text = admin.name;
    dentistSelect.add(option);
  });

  dentistSelect.value = patientData?.latestConsult?.dentist?.dentistId ?? "";

}
