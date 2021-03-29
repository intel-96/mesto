export default class Card {

  constructor({ data, handleCardClick, handleLikeClick, handleRemoveClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._idOwner = data.owner._id;
    this._currentId = data.currentId;
    this._cardId = data._id;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;



    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const templateCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.cards__element')
    .cloneNode(true);

    return templateCard;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardsImage = this._element.querySelector('.cards__image');
    this._cardsImageName = this._element.querySelector('.cards__name');
    this._cardsRemoveButton = this._element.querySelector('.cards__delete-button');
    this._cardsLikeButton = this._element.querySelector('.cards__like-button');
    this._likeCount = this._element.querySelector('.cards__like-count');



    this._cardsImage.src = this._link;
    this._cardsImageName.textContent = this._name;
    this._cardsImage.alt = this._name;

    this._likeLength();
    this._activeLike();
    this._setRemoveButton();
    this._setEventListeners();

    return this._element;
  }

  changeLikeLength (data) {
    this._likeCount.textContent = data.likes.length;
  }

  _likeLength () {
    this._likeCount.textContent = this._likes.length;
  }

  isLiked () {
    if (this._cardsLikeButton.classList.contains('cards__like-button_active')) {
      return true;
    } else {
      return false;
    }
  }

  _activeLike() {
    if (this._likes.some(like => like._id === this._currentId)) {
      this._cardsLikeButton.classList.add('cards__like-button_active');
    }
  }

  _setRemoveButton() {
    if (this._idOwner == this._currentId) {
      this._cardsRemoveButton.classList.add('cards__delete-button_display');
    }
  }

  toggleLike() {
    this._cardsLikeButton.classList.toggle('cards__like-button_active');
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardsLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardsRemoveButton.addEventListener('click', () => {
      this._handleRemoveClick();
    });

    this._cardsImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
