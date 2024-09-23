const showInputError = (formEl, inputEl, errorMsg, options) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(options.inputErrorClass);
};

const hideInputError = (formEl, inputEl, options) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(options.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, options) => {
    console.log(inputEl.validationMessage)
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, options) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, options);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(options.inactiveButtonClass);
  }
};

const disableButton = (buttonEl, options) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(options.inactiveButtonClass);
};
const resetValidation = (formEl, inputList, options) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, options);
  });
};

const setEventListeners = (formEl, options) => {
  const inputList = Array.from(formEl.querySelectorAll(options.inputSelector));
  const buttonElement = formEl.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const enableValidation = (options) => {
  const formList = document.querySelectorAll(options.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, options);
  });
};

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(settings);
