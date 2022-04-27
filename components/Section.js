export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  // Вставить элемент в разметку
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
  // Отрисовать карточки по-умолчанию при загрузке страницы
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }
}
