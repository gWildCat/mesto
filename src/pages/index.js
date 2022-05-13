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
import {
  btnEdit,
  btnAddCard,
  btnChangeAvatar,
  selectors,
  config,
  formValidators,
} from '../utils/constants.js';

//Включение валидации форм

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(config);

// Создание экземпляра UserInfo

const userInfo = new UserInfo({
  userNameSelector: selectors.userName,
  userAboutSelector: selectors.userAbout,
  userAvatarSelector: selectors.userAvatar,
});

// Создание экземпляров попапов

const popupViewImg = new PopupWithImage(selectors.popupViewImage);
const popupEditProfile = new PopupWithForm(selectors.popupEditProfile, updateProfile);
const popupNewCard = new PopupWithForm(selectors.popupNewCard, addCard);
const popupConfirmDelete = new PopupWithConfirmation(selectors.popupConfirmDelete, deleteCard);
const popupChangeAvatar = new PopupWithForm(selectors.popupChangeAvatar, changeAvatar);

// Создание экземпляра Section

const cardList = new Section(renderer, selectors.container);

// Создание экземпляра API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '0e6a347a-7327-44ee-b427-b6e9dceb3c49',
    'Content-Type': 'application/json',
  },
});

// Обработка ошибок
function handleError(error) {
  console.error(`🔥ERROR: ${error}`);
  alert(`ОШИБКА: ${error}`);
}

// Запрос данных пользователя и карточек с сервера

let currentUserId = null;

api
  .getInitialData()
  .then(([initialCards, profileData]) => {
    currentUserId = profileData._id;
    userInfo.setUserInfo(profileData);
    cardList.renderItems(initialCards);
  })
  .catch((error) => handleError(error));

// Обработчик добавления новой карточки

function addCard(cardData) {
  api
    .addCard(cardData)
    .then((updatedCardData) => {
      cardList.addItem(updatedCardData);
      popupNewCard.close();
    })
    .finally(() => popupNewCard.renderLoading(false))
    .catch((error) => handleError(error));
}

// Обработчик обновления данных профиля

function updateProfile(userData) {
  api
    .setProfileData(userData)
    .then((updatedData) => {
      userInfo.setUserInfo(updatedData);
      popupEditProfile.close();
    })
    .finally(() => popupEditProfile.renderLoading(false))
    .catch((error) => handleError(error));
}

// Обработчик смены аватара

function changeAvatar(avatarData) {
  api
    .changeAvatar(avatarData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupChangeAvatar.close();
    })
    .finally(() => popupChangeAvatar.renderLoading(false))
    .catch((error) => handleError(error));
}

// Обработчик удаления карточки

function deleteCard(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      popupConfirmDelete.close();
      card._element.remove();
    })
    .finally(() => popupConfirmDelete.renderLoading(false))
    .catch((error) => handleError(error));
}

// Обработчик добавления / удаления лайка

function handleLike(card) {
  if (card._likedState) {
    api
      .removeLike(card._id)
      .then((cardData) => {
        card._likesCounter.textContent = cardData.likes.length;
        card.removeLikedSymbol();
        card._likedState = false;
      })
      .catch((error) => handleError(error));
  } else {
    api
      .addLike(card._id)
      .then((cardData) => {
        card._likesCounter.textContent = cardData.likes.length;
        card.addLikedSymbol();
        card._likedState = true;
      })
      .catch((error) => handleError(error));
  }
}

// Обработчик просмотра изображения

function viewImage(name, link, alt) {
  popupViewImg.open(name, link, alt);
}

// Создание новой карточки

function createCard(cardData, templateSelector) {
  // Создание новой карточки
  const newCard = new Card(
    cardData,
    templateSelector,
    currentUserId,
    viewImage,
    handleLike,
    openConfirmDelete,
    handleError
  );
  // Генерация html-кода для вставки в страницу
  return newCard.generateCard();
}

// Отрисовка карточек по-умолчанию

function renderer(item) {
  return createCard(item, selectors.cardTemplate);
}

// Коллбэк нажатия на кнопку редактирования профиля

function openEditProfile() {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  formValidators['profile-form'].resetValidation();
  popupEditProfile.open();
}

// Коллбэк нажатия на кнопку добавления новой карточки

function openAddCard() {
  formValidators['new-card-form'].resetValidation();
  popupNewCard.open();
}

// Коллбэк нажатия на кнопку смены аватара

function openChangeAvatar() {
  formValidators['new-avatar-form'].resetValidation();
  popupChangeAvatar.open();
}

// Коллбэк нажатия на кнопку удаления карточки

function openConfirmDelete(card) {
  popupConfirmDelete.open(card);
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
