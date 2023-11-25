export function resetForms(arrayForms) {
    arrayForms.forEach((form) => {
      const formElement = document.querySelector(form);
  
      // Verifique se o elemento foi encontrado antes de chamar reset
      if (formElement) {
        formElement.reset();
      } else {
        console.error(`Elemento não encontrado para o seletor: ${form}`);
      }
    });
  }
  