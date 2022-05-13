import Popup from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
  }
  // Открытие попапа
  open(card) {
    super.open();
    this._card = card;
  }
  // Установка слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._btnSubmit.addEventListener('click', () => {
      this.renderLoading(true);
      this._handleConfirm(this._card);
    });
  }
}

export default PopupWithConfirmation;
