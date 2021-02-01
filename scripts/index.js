import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
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
const editProfilePopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addCardPopup = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_username');
const jobInput = document.querySelector('.popup__input_subtitle');
const sectionCards = document.querySelector('.cards');
const formProfile = document.querySelector('.popup__form_type_profile');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupTypeImage = document.querySelector('.popup_type_image');
const formCard = document.querySelector('.popup__form_type_card');
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  buttonInvalidClass: 'popup__save-button_type_invalid',
  inputInvalidClass: 'popup__input_state_invalid',
};

const validationFormAdd = new FormValidator(validationConfig, '.popup__form_type_card');
validationFormAdd.enableValidation();

const validationFormEdit = new FormValidator(validationConfig, '.popup__form_type_profile');
validationFormEdit.enableValidation();


addButton.addEventListener('click', () => {
  formCard.reset();
  validationFormAdd.resetError();
  validationFormAdd.setButtonState(false);
  openPopup(addCardPopup);
});

editButton.addEventListener('click', () => {
  fillProfileInputs();
  validationFormEdit.resetError();
  validationFormEdit.setButtonState(false);
  openPopup(editProfilePopup);
});

formCard.addEventListener('submit', addNewCard);
formProfile.addEventListener('submit', handleProfileSubmit);

// Открытие попапа
function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('mousedown', closePopupByOverlay);
  document.addEventListener('click', closePopupByButtons);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('mousedown', closePopupByOverlay);
  document.removeEventListener('click', closePopupByButtons)
}

function closePopupByButtons(evt) {
  if ((evt.target.classList.contains('popup__close-button')) || (evt.target.classList.contains('popup__save-button'))) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

// Заполнение формы данными со страницы
function fillProfileInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}


// Редактирование формы изменения профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
  openPopup(popupTypeImage);
}

function createCard(item) {
  const sampleCard = new Card(item, '.cards-template', openImagePopup);
  const card = sampleCard.generateCard();
  return card;
}

function addNewCard(evt) {
  evt.preventDefault();

  const inputText = document.querySelector('.popup__input_name').value;
  const inputLink = document.querySelector('.popup__input_link').value;
  const newItem = createCard({ name: inputText, link: inputLink });
  sectionCards.prepend(newItem);

  formCard.reset();

  validationFormAdd.setButtonState(formCard.checkValidity());
}

initialCards.forEach((data) => {
  const firstCards = createCard(data);
  sectionCards.append(firstCards);
});



