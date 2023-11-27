// deletePatient.js
export function getPatient(patientId) {
    let patientsList = JSON.parse(window.localStorage.getItem("patientsList")) || [];
    const updatedList = patientsList.filter((patient) => patient.id !== patientId);
    window.localStorage.setItem("patientsList", JSON.stringify(updatedList));
  }
  
  // You can add other utility functions related to deleting patients if needed.
  