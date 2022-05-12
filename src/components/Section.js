export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  // Вставить элемент в разметку
  addItem(cardElement, newCard) {
    newCard ? this._container.prepend(cardElement) : this._container.append(cardElement);
  }
  // Отрисовать карточки по-умолчанию при загрузке страницы
  renderItems(initialCards) {
    initialCards.forEach((item) => this._renderer(item));
  }
}
