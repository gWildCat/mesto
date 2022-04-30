export default class Popup {
  constructor(popupSelector) {
    this._modalWindow = document.querySelector(popupSelector);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  // Открытие попапа
  open() {
    this._modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  // Закрытие попапа
  close() {
    this._modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  // Коллбэк слушателя закрытия попапа по клику
  _handleClosePopup(evt) {
    if (
      evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup')
    ) {
      this.close();
    }
  }
  // Коллбэк слушателя закрытия попапа по клавише Escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  // Установка слушателей событий
  setEventListeners() {
    this._modalWindow.addEventListener('click', this._handleClosePopup);
  }
}
