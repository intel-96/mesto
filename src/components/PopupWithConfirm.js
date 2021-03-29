import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor ({ popupSelector, handleFormConfirm }) {
    super(popupSelector);
    this._handleFormConfirm = handleFormConfirm;
    this._submitHandler = this._submitHandler.bind(this);
  }

  open(card) {
    this._card = card;
    super.open();
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._handleFormConfirm(this._card);
  }

  setEventListeners() {
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', this._submitHandler);
    super.setEventListeners();
  }



}
