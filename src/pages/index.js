import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { editButton, addButton, nameInput, jobInput, formCard, formCardSelector, formProfileSelector, cardsTemplateSelector, validationConfig } from '../utils/constants.js';
import './index.css';

const validationFormAdd = new FormValidator(validationConfig, formCardSelector);
validationFormAdd.enableValidation();

const validationFormEdit = new FormValidator(validationConfig, formProfileSelector);
validationFormEdit.enableValidation();

const createCard = (item) => {
  const card = new Card (item, cardsTemplateSelector, handleCardClick);
  return card;
}


const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (item) => {
    const card = createCard(item).generateCard();
    newCard.prependItem(card);
  }
});

const newCard = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item).generateCard();
    newCard.addItem(card);
  }
},
'.cards'
);
newCard.renderItems();

const fullsizeImagePopup = new PopupWithImage ('.popup_type_image');
fullsizeImagePopup.setEventListeners();


function handleCardClick (name, link) {
  fullsizeImagePopup.open(name, link);
}

const userInfo = new UserInfo ('.profile__name', '.profile__subtitle');

const editProfilePopup = new PopupWithForm ({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

// Функция, заполняющая данными форму профиля
function handleProfileSubmit () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.username;
  jobInput.value = userData.job;
}

editButton.addEventListener('click', () => {
  userInfo.getUserInfo();
  handleProfileSubmit();
  validationFormEdit.resetError();
  validationFormEdit.setButtonState(false);
  editProfilePopup.open();
});

addButton.addEventListener('click', () =>{
  validationFormAdd.resetError();
  validationFormAdd.setButtonState(formCard.checkValidity());
  addCardPopup.open();
});

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
