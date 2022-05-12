export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }
  // Получить информацию о пользователе
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
      userId: this._userId,
    };
  }
  // Изменить информацию о пользователе на странице
  setUserInfo({ name, about, _id }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userId = _id;
  }
  // Установить аватар пользователя на странице
  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}
