// Импортирование стилей

import './index.css';

// Импортирование модулей

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// Навигация по DOM

const btnEdit = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const btnChangeAvatar = document.querySelector('.profile__avatar-change-button');
const profileEditForm = document.querySelector('.form#profile-form');
const formAddCard = document.querySelector('.form#new-card-form');
const formChangeAvatar = document.querySelector('.form#new-avatar-form');
const inputName = profileEditForm.querySelector('input[name="name"]');
const inputAbout = profileEditForm.querySelector('input[name="about"]');

// Селекторы

const selector = {
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
const formChangeAvatardValidator = new FormValidator(config, formChangeAvatar);
profileEditFormValidator.enableValidation();
formAddCardValidator.enableValidation();
formChangeAvatardValidator.enableValidation();

// Создание экземпляра UserInfo

const userInfo = new UserInfo({
  userNameSelector: selector.userName,
  userAboutSelector: selector.userAbout,
  userAvatarSelector: selector.userAvatar,
});

// Создание экземпляров попапов

const popupViewImg = new PopupWithImage(selector.popupViewImage);
const popupEditProfile = new PopupWithForm(selector.popupEditProfile, updateProfile);
const popupNewCard = new PopupWithForm(selector.popupNewCard, addCard);
const popupConfirmDelete = new PopupWithConfirmation(selector.popupConfirmDelete, deleteCard);
const popupChangeAvatar = new PopupWithForm(selector.popupChangeAvatar, changeAvatar);

// Создание экземпляра Section

const cardList = new Section(renderer, selector.container);

// Создание экземпляра API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '0e6a347a-7327-44ee-b427-b6e9dceb3c49',
    'Content-Type': 'application/json',
  },
});

// Запрос данных пользователя и карточек с сервера

let currentUserId = null;

api.getInitialData().then(([initialCards, profileData]) => {
  currentUserId = profileData._id;
  userInfo.setUserInfo(profileData);
  userInfo.setUserAvatar(profileData);
  cardList.renderItems(initialCards);
});

// Обработчик просмотра изображения

function viewImage(name, link, alt) {
  popupViewImg.open(name, link, alt);
}

// Обработчик добавления новой карточки

function addCard(cardData) {
  api
    .addCard(cardData)
    .then((updatedData) => {
      const cardElement = createCard(updatedData, selector.cardTemplate);
      cardList.addItem(cardElement, true);
    })
    .finally(() => {
      popupNewCard.renderLoading(false);
      popupNewCard.close();
    });
}

// Обработчик обновления данных профиля

function updateProfile(userData) {
  api
    .setProfileData(userData)
    .then((updatedData) => userInfo.setUserInfo(updatedData))
    .finally(() => {
      popupEditProfile.close();
      popupEditProfile.renderLoading(false);
    });
}

// Обработчик смены аватара

function changeAvatar(avatarData) {
  api
    .changeAvatar(avatarData)
    .then((userData) => userInfo.setUserAvatar(userData))
    .finally(() => {
      popupChangeAvatar.close();
      popupChangeAvatar.renderLoading(false);
    });
}

// Обработчик удаления карточки

function deleteCard(cardId, card) {
  api.deleteCard(cardId).finally(() => {
    card.deleteCard();
    popupConfirmDelete.close();
    popupConfirmDelete.renderLoading(false);
  });
}

// Обработчик добавления лайка

function addLike(cardId) {
  return api.addLike(cardId);
}

// Обработчик удаления лайка

function removeLike(cardId) {
  return api.removeLike(cardId);
}

// Создание новой карточки

function createCard(cardData, templateSelector) {
  // Создание новой карточки
  const newCard = new Card(
    cardData,
    templateSelector,
    currentUserId,
    viewImage,
    addLike,
    removeLike,
    openConfirmDelete
  );
  // Генерация html-кода для вставки в страницу
  return newCard.generateCard();
}

// Отрисовка карточек по-умолчанию

function renderer(item) {
  cardList.addItem(createCard(item, selector.cardTemplate));
}

// Коллбэк нажатия на кнопку редактирования профиля

function openEditProfile() {
  const { userName, userAbout } = userInfo.getUserInfo();
  inputName.value = userName;
  inputAbout.value = userAbout;
  profileEditFormValidator.resetValidation();
  popupEditProfile.open();
}

// Коллбэк нажатия на кнопку добавления новой карточки

function openAddCard() {
  formAddCardValidator.resetValidation();
  popupNewCard.open();
}

// Коллбэк нажатия на кнопку смены аватара

function openChangeAvatar() {
  formChangeAvatardValidator.resetValidation();
  popupChangeAvatar.open();
}

// Коллбэк нажатия на кнопку удаления карточки

function openConfirmDelete(cardId, card) {
  popupConfirmDelete.open(cardId, card);
}

// Установка слушателей событий

btnEdit.addEventListener('click', openEditProfile);
btnAddCard.addEventListener('click', openAddCard);
btnChangeAvatar.addEventListener('click', openChangeAvatar);
popupViewImg.setEventListeners();
popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();
popupConfirmDelete.setEventListeners();
popupChangeAvatar.setEventListeners();
