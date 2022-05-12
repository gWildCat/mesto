import Popup from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
  }
  // Открытие попапа
  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
  // Установка слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._btnSubmit.addEventListener('click', () => {
      this.renderLoading(true);
      this._handleConfirm(this._cardId, this._card);
    });
  }
}

export default PopupWithConfirmation;
