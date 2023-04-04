import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._element.querySelector(".popup__form");
    this._submitButtonElement = this._element.querySelector(".popup__button");
    this._inputElements = this._element.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputElements.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButtonElement.addEventListener("click", (evt) => {
      this._formSubmitHandler(evt, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setInputValues(data) {
    this._inputElements.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setButtonTitle(title) {
    this._submitButtonElement.textContent = title;
  }
}
