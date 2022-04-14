// Импортирование модулей

import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';

// Навигация по DOM

const editBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup#edit-profile');
const popupNewCard = document.querySelector('.popup#new-card');
const popupViewImg = document.querySelector('.popup#view-image');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditForm = document.querySelector('.form#profile-form');
const addCardForm = document.querySelector('.form#new-card-form');
const inputName = profileEditForm.querySelector('input[name="name"]');
const inputJob = profileEditForm.querySelector('input[name="job"]');
const inputTitle = addCardForm.querySelector('input[name=title]');
const inputLink = addCardForm.querySelector('input[name=link]');
const cardsContainer = document.querySelector('.elements');
const popupImg = popupViewImg.querySelector('.popup__image');
const popupImgCaption = popupViewImg.querySelector('.popup__image-caption');

//Конфигурация валидации

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error-message_active',
};

//Включение валидации форм

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Закрытие попапов

function closePopup(modalWindow) {
  document.removeEventListener('keydown', handleEsc);
  modalWindow.removeEventListener('click', handleClosePopup);
  modalWindow.classList.remove('popup_opened');
}

// Открытие попапов

function openPopup(modalWindow) {
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
  modalWindow.addEventListener('click', handleClosePopup);
}

// Обработчик закрытия попапа по кнопке Escape

function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Обработчик закрытия попапа по клику на крестик или оверлей

function handleClosePopup(evt) {
  if (
    evt.target.classList.contains('popup__close-button') ||
    evt.target.classList.contains('popup')
  ) {
    closePopup(evt.currentTarget);
  }
}

// Редактирование профиля

function editProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  profileEditFormValidator.resetValidation();
  openPopup(popupEditProfile);
}

// Открытие формы с добавлением карточки

function openAddCard() {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  openPopup(popupNewCard);
}

// Обновление данных профиля

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

// Добавление новой карточки

function addCard(evt) {
  evt.preventDefault();
  const cardData = { name: inputTitle.value, link: inputLink.value };
  renderCard(cardData);
  closePopup(popupNewCard);
}

// Обработчик просмотра изображения

function viewImage() {
  popupImg.src = this._link;
  popupImg.alt = this._alt || this._name;
  popupImgCaption.textContent = this._name;
  openPopup(popupViewImg);
}

// Создание новой карточки

function createCard(cardData) {
  // Создание новой карточки
  const newCard = new Card(cardData, viewImage);
  // Генерация html-кода для вставки в страницу
  return newCard.generateCard();
}

// Отрисовка карточки

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  // Вставка в страницу
  cardsContainer.prepend(cardElement);
}

// Отрисовка карточек по-умолчанию

initialCards.forEach(function (item) {
  renderCard(item);
});

// Обработчики событий

editBtn.addEventListener('click', editProfile);
profileEditForm.addEventListener('submit', updateProfile);
addCardBtn.addEventListener('click', () => openAddCard());
addCardForm.addEventListener('submit', addCard);
