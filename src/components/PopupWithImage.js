import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._modalWindow.querySelector('.popup__image');
    this._popupImgCaption = this._modalWindow.querySelector('.popup__image-caption');
  }
  // Открытие попапа
  open(name, link, alt) {
    this._popupImg.src = link;
    this._popupImg.alt = alt || name;
    this._popupImgCaption.textContent = name;
    super.open();
  }
}
