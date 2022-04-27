import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  // Открытие попапа
  open(name, link, alt) {
    const popupImg = this._modalWindow.querySelector('.popup__image');
    const popupImgCaption = this._modalWindow.querySelector('.popup__image-caption');
    popupImg.src = link;
    popupImg.alt = alt || name;
    popupImgCaption.textContent = name;
    super.open();
  }
}
