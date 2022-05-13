// Навигация по DOM

export const btnEdit = document.querySelector('.profile__edit-button');
export const btnAddCard = document.querySelector('.profile__add-button');
export const btnChangeAvatar = document.querySelector('.profile__avatar-change-button');
export const formValidators = {};

// Селекторы

export const selectors = {
  cardTemplate: '#card-template',
  userName: '.profile__name',
  userAbout: '.profile__about',
  userAvatar: '.profile__avatar',
  container: '.elements',
  popupViewImage: '.popup#view-image',
  popupEditProfile: '.popup#edit-profile',
  popupNewCard: '.popup#new-card',
  popupConfirmDelete: '.popup#confirm',
  popupChangeAvatar: '.popup#new-avatar',
};

//Конфигурация валидации

export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error-message_active',
};
