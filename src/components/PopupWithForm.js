import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitHandler = this._submitHandler.bind(this);
    this._form = this._modalWindow.querySelector('.form');
  }
  // Получение значений полей ввода
  _getInputValues() {
    const data = {};
    Array.from(this._form.querySelectorAll('.form__input')).forEach(
      (input) => (data[input.name] = input.value)
    );
    return data;
  }
  // Коллбэк слушателя действия Submit
  _submitHandler(evt) {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
  }
  // Установка слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }
  // Закрытие попапа
  close() {
    super.close();
    this._form.reset();
    this._form.removeEventListener('submit', this._submitHandler);
  }
}
