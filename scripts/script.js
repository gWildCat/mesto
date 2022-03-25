//Навигация по DOM

const editBtn = document.querySelector('.profile__edit-button');
const closeBtnList = document.querySelectorAll('.popup__close-button');
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
const cardTemplate = document.querySelector('#card-template').content;
const popupImg = popupViewImg.querySelector('.popup__image');
const popupImgCaption = popupViewImg.querySelector('.popup__image-caption');

//Закрытие попапов

function closePopup(modalWindow) {
  document.removeEventListener('keydown', (evt) => handleEsc);
  modalWindow.removeEventListener('click', handleClosePopup);
  modalWindow.classList.remove('popup_opened');
}

//Открытие попапов

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

//Обработчик закрытия попапа по клику на крестик или оверлей

function handleClosePopup(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (
    evt.target.classList.contains('popup__close-button') ||
    evt.target.classList.contains('popup')
  ) {
    closePopup(activePopup);
  }
}

//Редактирование профиля

function EditProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  setInitialState(popupEditProfile);
  openPopup(popupEditProfile);
}

//Открытие формы с добавлением карточки

function openAddCard() {
  setInitialState(popupNewCard);
  addCardForm.reset();
  openPopup(popupNewCard);
}

//Обновление данных профиля

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

//Добавление новой карточки

function addCard(evt) {
  evt.preventDefault();
  const cardData = { name: inputTitle.value, link: inputLink.value };
  renderCard(cardData);
  addCardForm.reset();
  closePopup(popupNewCard);
}

//Удаление карточки

function deleteCard(evt) {
  evt.preventDefault();
  evt.target.closest('.element').remove();
}

//Просмотр изображения

function viewImg(link, alt, name) {
  popupImg.src = link;
  popupImg.alt = alt;
  popupImgCaption.textContent = name;
  openPopup(popupViewImg);
}

//Создание карточки

function createCard(cardData) {
  //Клонирование шаблона
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImg = cardElement.querySelector('.element__image');
  cardImg.src = cardData.link;
  cardImg.alt = cardData.alt || cardData.name;
  cardElement.querySelector('.element__title').textContent = cardData.name;
  //Кнопка лайка
  const likeBtn = cardElement.querySelector('.element__like-button');
  likeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
  //Кнопка удаления
  const deleteBtn = cardElement.querySelector('.element__delete-button');
  deleteBtn.addEventListener('click', deleteCard);
  //Просмотр изображения
  cardImg.addEventListener('click', () => {
    viewImg(cardData.link, cardData.alt, cardData.name);
  });
  return cardElement;
}

//Отрисовка карточки

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  //Вставка в страницу
  cardsContainer.prepend(cardElement);
}

//Отрисовка карточек по-умолчанию

initialCards.forEach(function (item) {
  renderCard(item);
});

//Обработчики событий

editBtn.addEventListener('click', EditProfile);
profileEditForm.addEventListener('submit', updateProfile);
addCardBtn.addEventListener('click', () => openAddCard());
addCardForm.addEventListener('submit', addCard);
