// updatePatient.js
export function updatePatient(patientData) {
    let patientsList = JSON.parse(window.localStorage.getItem("patientsList")) || [];
    const index = patientsList.findIndex((patient) => patient.id === patientData.id);
  
    if (index !== -1) {
      patientsList[index] = patientData;
      window.localStorage.setItem("patientsList", JSON.stringify(patientsList));
    }
  }
  
  // You can add other utility functions related to updating patients if needed.
  