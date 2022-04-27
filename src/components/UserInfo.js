export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userJob = document.querySelector(this._userJobSelector);
  }
  // Получить информацию о пользователе
  getUserInfo() {
    return { userName: this._userName.textContent, userJob: this._userJob.textContent };
  }
  // Изменить информацию о пользователе на странице
  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.job;
  }
}
