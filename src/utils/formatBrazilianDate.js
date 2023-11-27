export function formatBrazilianDate(dateString) {
  if (!dateString) {
    return ""; // Retorna uma string vazia se a data for indefinida ou nula
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return ""; // Retorna uma string vazia se a data resultante for inválida
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const dateFormatted = `${day}/${month}/${year}`;

  return dateFormatted;
}
