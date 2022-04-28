// Импортирование стилей

import './index.css';

// Импортирование модулей

import Card from '../components/Card.js';
import { initialCards } from '../components/cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// Навигация по DOM

const btnEdit = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const profileEditForm = document.querySelector('.form#profile-form');
const formAddCard = document.querySelector('.form#new-card-form');
const inputName = profileEditForm.querySelector('input[name="name"]');
const inputJob = profileEditForm.querySelector('input[name="job"]');

// Селекторы

const selector = {
  cardTemplate: '#card-template',
  userName: '.profile__name',
  userJob: '.profile__job',
  container: '.elements',
  popupViewImage: '.popup#view-image',
  popupEditProfile: '.popup#edit-profile',
  popupNewCard: '.popup#new-card',
};

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
const formAddCardValidator = new FormValidator(config, formAddCard);
profileEditFormValidator.enableValidation();
formAddCardValidator.enableValidation();

// Обработчик просмотра изображения

function viewImage(name, link, alt) {
  popupViewImg.open(name, link, alt);
}

// Обработчик добавления новой карточки

function addCard(cardData) {
  const cardElement = createCard(cardData, selector.cardTemplate);
  cardList.addItem(cardElement);
  popupNewCard.close();
}

// Обработчик обновления данных профиля

function updateProfile(userData) {
  userInfo.setUserInfo(userData);
  this.close();
}

// Создание экземпляра UserInfo

const userInfo = new UserInfo({
  userNameSelector: selector.userName,
  userJobSelector: selector.userJob,
});

// Создание экземпляров попапов

const popupViewImg = new PopupWithImage(selector.popupViewImage);
const popupEditProfile = new PopupWithForm(selector.popupEditProfile, updateProfile);
const popupNewCard = new PopupWithForm(selector.popupNewCard, addCard);

// Создание новой карточки

function createCard(cardData, templateSelector) {
  // Создание новой карточки
  const newCard = new Card(cardData, templateSelector, viewImage);
  // Генерация html-кода для вставки в страницу
  return newCard.generateCard();
}

// Отрисовка карточек по-умолчанию

const cardList = new Section(
  {
    items: initialCards,
    renderer(item) {
      cardList.addItem(createCard(item, selector.cardTemplate));
    },
  },
  selector.container
);

cardList.renderItems();

// Коллбэк нажатия на кнопку редактирования профиля

function openEditProfile() {
  const { userName, userJob } = userInfo.getUserInfo();
  inputName.value = userName;
  inputJob.value = userJob;
  profileEditFormValidator.resetValidation();
  popupEditProfile.open();
}

// Коллбэк нажатия на кнопку добавления новой карточки

function openAddCard() {
  formAddCardValidator.resetValidation();
  popupNewCard.open();
}

// Установка слушателей событий

btnEdit.addEventListener('click', openEditProfile);
btnAddCard.addEventListener('click', openAddCard);
popupViewImg.setEventListeners();
popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();
