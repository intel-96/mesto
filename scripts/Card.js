export default class Card {

  constructor(data, templateSelector, openCallbackImage) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._showPopup = openCallbackImage;

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
    this._setEventListeners();
    this._cardsImage = this._element.querySelector('.cards__image');
    this._cardsImage.src = this._image;
    this._element.querySelector('.cards__name').textContent = this._name;
    this._cardsImage.alt = this._name;
    return this._element;
  }

  _toggleLike() {
    this._cardsLikeButton = this._element.querySelector('.cards__like-button');
    this._cardsLikeButton.classList.toggle('cards__like-button_active');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__like-button').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.cards__delete-button').addEventListener('click', () => {
      this._removeCard();
    });

    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._showPopup(this._image, this._name);
    });
  }
}
