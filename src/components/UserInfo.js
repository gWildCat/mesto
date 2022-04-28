export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
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
