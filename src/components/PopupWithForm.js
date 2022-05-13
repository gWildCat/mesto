import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitHandler = this._submitHandler.bind(this);
    this._form = this._modalWindow.querySelector('.form');
    this._formInputList = Array.from(this._form.querySelectorAll('.form__input'));
  }
  // Получение значений полей ввода
  _getInputValues() {
    const data = {};
    this._formInputList.forEach((input) => (data[input.name] = input.value));
    return data;
  }
  // Коллбэк слушателя действия Submit
  _submitHandler(evt) {
    this.renderLoading(true);
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
  }
  // Заполнение инпутов
  setInputValues(userData) {
    this._formInputList.forEach((input) => (input.value = userData[input.name]));
  }
}
