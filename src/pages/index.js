import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import popupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import { acceptButton, addCardSaveButton, editProfileSaveButton, avatarSaveButton, editButton, addButton, editAvatarButton, nameInput, jobInput, formCard, formCardSelector, formAvatarSelector, formProfileSelector, cardsTemplateSelector, validationConfig, apiConfig } from '../utils/constants.js';
import { preloader } from '../utils/utils.js'
import './index.css';


// Подключение валидации к формам

const validationFormAdd = new FormValidator(validationConfig, formCardSelector);
validationFormAdd.enableValidation();

const validationFormEdit = new FormValidator(validationConfig, formProfileSelector);
validationFormEdit.enableValidation();

const validationFormAvatar = new FormValidator(validationConfig, formAvatarSelector);
validationFormAvatar.enableValidation();

const api = new Api(apiConfig);

let userId = null;
let thisCard = null;

const fullSizeImage = new PopupWithImage('.popup_type_image');
fullSizeImage.setEventListeners();


const createCard = (dataCard) => {
  const card = new Card({
    data: { ...dataCard, currentId: userId },
    handleCardClick: (name, link) => {
      fullSizeImage.open(name, link);
    },
    handleLikeClick: () => {
      if (card.isLiked()) {
        api.removeLike(dataCard)
          .then((res) => {
            card.toggleLike();
            card.changeLikeLength(res);
          })
          .catch((err) => {
            return console.log(`${err}`);
          })
      } else {
        api.likeCard(dataCard)
          .then((res) => {
            card.toggleLike();
            card.changeLikeLength(res);
          })
          .catch((err) => {
            return console.log(`${err}`);
          })
      }
    },
    handleRemoveClick: () => {
      confirmPopup.open(dataCard);
      thisCard = card;
    }
  }, cardsTemplateSelector);

  const cardElement = card.generateCard();
  return cardElement;
}


const newCards = new Section({
  renderer: (data) => {
    const card = createCard(data);
    newCards.addItem(card);
  }
}, '.cards');


const userInfo = new UserInfo('.profile__name', '.profile__subtitle', '.profile__image');

const confirmPopup = new popupWithConfirm({
  popupSelector: '.popup_type_accept',
  handleFormConfirm: (data) => {

    preloader(acceptButton, true, 'Да');

    api.removeCard(data)
      .then(() => {
        confirmPopup.close();
        thisCard.removeCard();
        confirmPopup.close()
      })
      .catch((err) => {
        return console.log(`${err}`);
      })
      .finally(() => {
        preloader(acceptButton, false, 'Да');
      })
  }
})


const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleFormSubmit: (inputs) => {

    preloader(avatarSaveButton, true, 'Сохранить');

    api.patchUserAvatar(inputs.link)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        editAvatarPopup.close()
      })
      .catch((err) => {
        return console.log(`${err}`)
      })
      .finally(() => {
        preloader(avatarSaveButton, false, 'Сохранить');
      })
  }
});

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputs) => {

    preloader(editProfileSaveButton, true, 'Сохранить');

    api.patchUserInfo(inputs.username, inputs.job)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        editProfilePopup.close()
      })
      .catch((err) => {
        return console.log(`${err}`)
      })
      .finally(() => {
        preloader(editProfileSaveButton, false, 'Сохранить');
      })
  }
})

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (inputs) => {

    preloader(addCardSaveButton, true, 'Создать');

    api.addCard(inputs.name, inputs.link)
      .then((res) => {
        const newCard = createCard(res);
        newCards.prependItem(newCard);
        addCardPopup.close()
      })
      .catch((err) => {
        return console.log(`${err}`)
      })
      .finally(() => {
        preloader(addCardSaveButton, false, 'Создать');
      })
  }
})

// Функция, заполняющая данными форму профиля
function fillProfileInputs () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
}

editButton.addEventListener('click', () => {
  fillProfileInputs();
  validationFormEdit.resetError();
  validationFormEdit.setButtonState(false);
  editProfilePopup.open();
});

addButton.addEventListener('click', () => {
  validationFormAdd.resetError();
  validationFormAdd.setButtonState(formCard.checkValidity());
  addCardPopup.open();
});

editAvatarButton.addEventListener('click', () => {
  validationFormAvatar.resetError();
  validationFormAvatar.setButtonState(false);
  editAvatarPopup.open();
})

confirmPopup.setEventListeners();
addCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();


api.getAllInfo()
  .then((data) => {
    const userData = data[0];
    userInfo.loadUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      _id: userData._id
    });
    userId = userInfo.getMyId();
    const cardsArray = data[1];
    newCards.renderItems(cardsArray);
  });

