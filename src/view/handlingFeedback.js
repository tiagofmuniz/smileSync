

export function renderFeedback(feedbackContainerId, message) {
  document.querySelector(feedbackContainerId).innerHTML = message;
}

export function hideErrorOnInput(triggerField, targetClear) {
  const inputField = document.querySelector(triggerField);

  if (inputField) {
    inputField.addEventListener("input", () => {
      const containerClear = document.querySelector(targetClear);
      if (containerClear) containerClear.innerHTML = "";
    });
  }
}

export function userRegistrationFlowFeedback(resultValidateFields) {
  // console.log(resultValidateFields);
  resultValidateFields.forEach((feedback) => {
    if (!feedback.isValid) {
      renderFeedback(feedback.feedbackContainer, feedback.message);
      hideErrorOnInput(feedback.fieldOrigin, feedback.feedbackContainer);
    }
  });
}


