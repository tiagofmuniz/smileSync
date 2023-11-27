export function getLatestConsultation(consultationInfo) {
    if (!consultationInfo || consultationInfo.length === 0) {
      return null; // Retorna null se não houver consultas
    }
  
    // Ordena as consultas pela data em ordem decrescente
    const sortedConsultations = consultationInfo.sort((a, b) => {
      const dateA = new Date(a.dateInfo.date + " " + a.dateInfo.time);
      const dateB = new Date(b.dateInfo.date + " " + b.dateInfo.time);
      return dateB - dateA;
    });
  
    // A primeira consulta no array ordenado é a mais recente
    return sortedConsultations[0];
  }
  