//Конфигурация

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error-message_active',
};

//Показать ошибку

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

//Спрятать ошибку

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

//Проверить валидность

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

//Включить слушателей

function setEventListeners(formElement, config) {
  //Выбрать поля ввода и кнопку отправки
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleSubmitBtnState(inputList, buttonElement, config);
    });
  });
}

//Изменение состояния кнопок submit

function toggleSubmitBtnState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = hasInvalidInput(inputList);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = hasInvalidInput(inputList);
  }
}

//Проверка валидности формы

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

//Включение валидации форм

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => setEventListeners(formElement, config));
}
enableValidation(config);

//Задание начального состояния валидации при открытии попапа

function setInitialState(modalWindow) {
  const formElement = modalWindow.querySelector(config.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, config)
  );
  toggleSubmitBtnState(inputList, buttonElement, config);
}
