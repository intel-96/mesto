export default class FormValidator {
  constructor(configValidation, formSelector) {
    this._config = configValidation;
    this._formEl = document.querySelector(formSelector);
    this._buttonSubmit = this._formEl.querySelector(this._config.submitButtonSelector);
    this._inputs = this._formEl.querySelectorAll(configValidation.inputSelector);
  }

  _showError(input) {
    const error = this._formEl.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputInvalidClass);
  }

  _hideError(input) {
    const error = this._formEl.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputInvalidClass);
  }

  resetError() {
    this._inputs.forEach(item => {
      this._hideError(item);
    });
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  setButtonState(isActive) {
    if (isActive) {
      this._buttonSubmit.classList.remove(this._config.buttonInvalidClass);
      this._buttonSubmit.disabled = false;
    } else {
      this._buttonSubmit.classList.add(this._config.buttonInvalidClass);
      this._buttonSubmit.disabled = 'disabled';
    }
  }

  _setEventListeners() {
    this._formEl.addEventListener('input', (evt) => {
      const input = evt.target;
      this._checkInputValidity(input);
      this.setButtonState(this._formEl.checkValidity());
    });
  }

  enableValidation() {
    this._setEventListeners()
    this._formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.setButtonState(this._formEl.checkValidity());
  }
}
