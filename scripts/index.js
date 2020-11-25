let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__input_username');
let jobInput = document.querySelector('.popup__input_subtitle');

// Открытие попапа
function openPopup() {
  popup.classList.add('popup_opened');
}
  editButton.addEventListener('click', openPopup);

// Закрытие попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}
  closeButton.addEventListener('click', closePopup);

// Заполнение формы данными со страницы
function fillProfileInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}
editButton.addEventListener('click', fillProfileInputs);

// Редактирование формы изменения профиля
let formElement = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}
  formElement.addEventListener('submit', formSubmitHandler);
