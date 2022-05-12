export default class Card {
  constructor(
    cardData,
    cardTemplateSelector,
    currentUserId,
    viewImage,
    addLike,
    removeLike,
    openConfirmDelete
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._cardTemplateSelector = cardTemplateSelector;
    this._currentUserId = currentUserId;
    this._viewImage = viewImage;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._openConfirmDelete = openConfirmDelete;
  }
  // Копирование шаблона
  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector).content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  // Генерация html-кода карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.element__image');
    this._cardName = this._element.querySelector('.element__title');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardName.textContent = this._name;
    this._likeBtn = this._element.querySelector('.element__like-button');
    this._deleteBtn = this._element.querySelector('.element__delete-button');
    this._likesCounter = this._element.querySelector('.element__like-counter');
    this._likesCounter.textContent = this._likes.length;
    if (this._checkIsOwn()) this._deleteBtn.classList.add('element__delete-button_active');
    if (this._checkIsLiked()) {
      this._addLikedSymbol();
      this._likedState = true;
    }
    this._setEventListeners();
    return this._element;
  }
  // Добавление символа лайка карточке
  _addLikedSymbol() {
    this._likeBtn.classList.add('element__like-button_active');
  }
  // Удаление символа лайка карточке
  _removeLikedSymbol() {
    this._likeBtn.classList.remove('element__like-button_active');
  }
  // Проверка, создана ли карточка текущим пользователем
  _checkIsOwn() {
    return this._ownerId === this._currentUserId;
  }
  // Проверка состояния лайка
  _checkIsLiked() {
    return this._likes.some((user) => user._id === this._currentUserId);
  }
  // Обработчик кнопки лайка
  _handleLike() {
    if (this._likedState) {
      this._removeLike(this._id).then(
        (cardData) => (this._likesCounter.textContent = cardData.likes.length)
      );
      this._removeLikedSymbol();
      this._likedState = false;
    } else {
      this._addLike(this._id).then(
        (cardData) => (this._likesCounter.textContent = cardData.likes.length)
      );
      this._addLikedSymbol();
      this._likedState = true;
    }
  }
  // Удаление карточки из разметки
  deleteCard() {
    this._element.remove();
  }
  // Установка слушателей
  _setEventListeners() {
    // Кнопка лайка
    this._likeBtn.addEventListener('click', this._handleLike.bind(this));
    // Кнопка удаления карточки
    this._deleteBtn.addEventListener('click', () => this._openConfirmDelete(this._id, this));
    // Просмотр изображения
    this._cardImg.addEventListener('click', () => this._viewImage(this._name, this._link));
  }
}
