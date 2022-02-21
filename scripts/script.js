const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditForm = document.querySelector('.form');
const inputName = profileEditForm.querySelector('input[name="name"]');
const inputJob = profileEditForm.querySelector('input[name="job"]');

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function updateProfile(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
profileEditForm.addEventListener('submit', updateProfile);
