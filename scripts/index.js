const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
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


root.addEventListener('click', closePopup);
editButton.addEventListener('click', () => openPopup(editProfilePopup));
addButton.addEventListener('click', () => openPopup(addCardPopup));
editButton.addEventListener('click', fillProfileInputs);



// Открытие попапа
function openPopup(modal) {
  modal.classList.add('popup_opened');
}


// Закрытие попапа
function closePopup(evt) {
  const targetElement = evt.target;
  if ((targetElement.classList.contains('popup__close-button')) || (targetElement.classList.contains('popup__save-button'))) {
    targetElement.closest('.popup').classList.remove('popup_opened');
  }
}


// Заполнение формы данными со страницы
function fillProfileInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}


// Редактирование формы изменения профиля
const formElement = document.querySelector('.popup__form_type_profile');
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);


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
  const popupImage = document.querySelector('.popup__image');
  const popupImageName = document.querySelector('.popup__image-name');
  const popupTypeImage = document.querySelector('.popup_type_image');
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
  document.querySelector('.popup__form_type_card').reset();
}


function addCardListener() {
  const addCardButton = document.querySelector('.popup__save-button_type_card');
  addCardButton.addEventListener('click', addNewCard);
}


function renderElements() {
  const cardsArray = initialCards.map(composeItem);
  sectionCards.append(...cardsArray);
}


renderElements();
addCardListener()
