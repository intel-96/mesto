export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_username');
const jobInput = document.querySelector('.popup__input_subtitle');
const formCard = document.querySelector('.popup__form_type_card');
const formCardSelector = '.popup__form_type_card';
const formProfileSelector = '.popup__form_type_profile';
const cardsTemplateSelector = '.cards-template';
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  buttonInvalidClass: 'popup__save-button_type_invalid',
  inputInvalidClass: 'popup__input_state_invalid',
};

export { editButton, addButton, nameInput, jobInput, formCard, formCardSelector, formProfileSelector, cardsTemplateSelector, validationConfig };
