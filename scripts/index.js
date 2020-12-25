const editProfilePopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addCardPopup = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_username');
const jobInput = document.querySelector('.popup__input_subtitle');
const root = document.querySelector('.page__container')
const templateCard = document.querySelector('.cards-template');
const sectionCards = document.querySelector('.cards');
const formProfile = document.querySelector('.popup__form_type_profile');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupTypeImage = document.querySelector('.popup_type_image');
const formCard = document.querySelector('.popup__form_type_card');

addButton.addEventListener('click', () => {
  resetValidation(addCardPopup);
  openPopup(addCardPopup);
});
editButton.addEventListener('click', () => {
  resetValidation(editProfilePopup);
  fillProfileInputs();
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

function closePopupByButtons (evt) {
  if ((evt.target.classList.contains('popup__close-button')) || (evt.target.classList.contains('popup__save-button'))) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupByOverlay (evt) {
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
function handleProfileSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}



function composeItem({name, link}) {
  const newCard = templateCard.content.cloneNode(true);
  const cardImage = newCard.querySelector('.cards__image');
  const cardName = newCard.querySelector('.cards__name');
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  const likeButton = newCard.querySelector('.cards__like-button');
  likeButton.addEventListener('click', function(e){
    toggleLike(e.currentTarget);
  });

  const removeButton = newCard.querySelector('.cards__delete-button');
  removeButton.addEventListener('click', function(e){
    removeItem(e.currentTarget);
  })

  cardImage.addEventListener('click', function() {
    openImagePopup({name, link});
  })
  return newCard;
}


function openImagePopup(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupImageName.textContent = item.name;
  openPopup(popupTypeImage);
}


function removeItem(item) {
  item.closest('.cards__element').remove();
}


function toggleLike(like) {
  like.classList.toggle('cards__like-button_active');
}


function addNewCard(evt) {
  evt.preventDefault();
  const inputCardName = document.querySelector('.popup__input_name');
  const inputCardLink = document.querySelector('.popup__input_link');
  const inputText = inputCardName.value;
  const inputLink = inputCardLink.value;
  const newItem = composeItem({name: inputText, link: inputLink});
  sectionCards.prepend(newItem);
  formCard.reset();
  const saveCardButton = document.querySelector('.popup__save-button_type_card');
  saveCardButton.classList.add('popup__save-button_type_invalid');
  saveCardButton.disabled = true;
}

function renderElements() {
  const cardsArray = initialCards.map(composeItem);
  sectionCards.append(...cardsArray);
}


renderElements();
