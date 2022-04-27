export default class Card {
  constructor(cardData, cardTemplateSelector, viewImage) {
    this._title = cardData.title;
    this._link = cardData.link;
    this._alt = cardData.alt;
    this._cardTemplateSelector = cardTemplateSelector;
    this._viewImage = viewImage;
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
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._alt || this._title;
    this._cardTitle.textContent = this._title;
    this._likeBtn = this._element.querySelector('.element__like-button');
    this._deleteBtn = this._element.querySelector('.element__delete-button');
    this._setEventListeners();
    return this._element;
  }
  // Обработчик кнопки лайка
  _toggleLike() {
    this._likeBtn.classList.toggle('element__like-button_active');
  }
  // Обработчик кнопки удаления карточки
  _deleteCard() {
    this._element.remove();
  }
  // Установка слушателей
  _setEventListeners() {
    // Кнопка лайка
    this._likeBtn.addEventListener('click', this._toggleLike.bind(this));
    // Кнопка удаления карточки
    this._deleteBtn.addEventListener('click', this._deleteCard.bind(this));
    // Просмотр изображения
    this._cardImg.addEventListener('click', () =>
      this._viewImage(this._title, this._link, this._alt)
    );
  }
}
