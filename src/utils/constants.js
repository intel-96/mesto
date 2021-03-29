const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__edit-image')
const nameInput = document.querySelector('.popup__input_username');
const jobInput = document.querySelector('.popup__input_subtitle');
const formCard = document.querySelector('.popup__form_type_card');
const formCardSelector = '.popup__form_type_card';
const formProfileSelector = '.popup__form_type_profile';
const formAvatarSelector = '.popup__form_type_change-avatar';
const cardsTemplateSelector = '.cards-template';
const avatarSaveButton = document.querySelector('.popup__save-button_type_change-avatar');
const editProfileSaveButton = document.querySelector('.popup__save-button_type_profile');
const addCardSaveButton = document.querySelector('.popup__save-button_type_card');
const acceptButton = document.querySelector('.popup__save-button_type_accept');
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  buttonInvalidClass: 'popup__save-button_type_invalid',
  inputInvalidClass: 'popup__input_state_invalid',
};
const apiConfig = {
  groupId: "cohort-20",
  url: "https://mesto.nomoreparties.co",
  headers: {
    authorization: 'b5c77d3f-94ce-45f7-a118-77a3d38457c1',
    'Content-Type': 'application/json'
  }
};

export { acceptButton, addCardSaveButton, editProfileSaveButton, avatarSaveButton, editButton, addButton, editAvatarButton, nameInput, jobInput, formCard, formCardSelector, formProfileSelector, formAvatarSelector, cardsTemplateSelector, validationConfig, apiConfig };
