export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  // Вставить элемент в разметку
  addItem(cardElement) {
    const card = this._renderer(cardElement);
    this._container.prepend(card);
  }
  // Отрисовать карточки по-умолчанию при загрузке страницы
  renderItems(initialCards) {
    initialCards.reverse().forEach((item) => this.addItem(item));
  }
}
