//Карточки по-умолчанию

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Изображение гор Архыза',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Изображение озера в Челябинской области',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Изображение жилого массива в Иваново',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Изображение гор на Камчатке',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Изображение железнодорожных путей в лесу',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Изображение озера Байкал зимой',
  },
];

//Навигация по DOM

const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelectorAll('.popup__close-button');
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

//Открытие попапа с редактированием профиля

function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

//Открытие попапа с добавлением карточки

function openPopupNewCard() {
  popupNewCard.classList.add('popup_opened');
}

//Закрытие попапов

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

//Обновление данных профиля

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(evt);
}

//Создание новой карточки

function createCard(evt) {
  evt.preventDefault();
  renderCard(inputTitle.value, inputLink.value);
  inputTitle.value = '';
  inputLink.value = '';
  closePopup(evt);
}

//Удаление карточки

function deleteCard(evt) {
  evt.preventDefault();
  evt.target.closest('.element').remove();
}

//Просмотр изображения

function viewImg(evt) {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  popupImgCaption.textContent = evt.target
    .closest('.element')
    .querySelector('.element__title').textContent;
  popupViewImg.classList.add('popup_opened');
}

//Отрисовка карточки

function renderCard(title, link, alt) {
  //Клонирование шаблона
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = alt;
  cardElement.querySelector('.element__title').textContent = title;
  //Кнопка лайка
  const likeBtn = cardElement.querySelector('.element__like-button');
  likeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
  //Кнопка удаления
  const deleteBtn = cardElement.querySelector('.element__delete-button');
  deleteBtn.addEventListener('click', deleteCard);
  //Просмотр изображения
  const cardImg = cardElement.querySelector('.element__image');
  cardImg.addEventListener('click', viewImg);
  //Вставка в страницу
  cardsContainer.prepend(cardElement);
}

//Отрисовка карточек по-умолчанию

initialCards.forEach(function (item) {
  renderCard(item.name, item.link, item.alt);
});

//Обработчики событий

editBtn.addEventListener('click', openPopupEditProfile);
profileEditForm.addEventListener('submit', updateProfile);
addCardBtn.addEventListener('click', openPopupNewCard);
closeBtn.forEach((btn) => {
  btn.addEventListener('click', closePopup);
});
addCardForm.addEventListener('submit', createCard);
