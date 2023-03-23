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
    const values = Array.from(this._inputElements).map((elem) => elem.value);
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButtonElement.addEventListener(
      "click",
      this._formSubmitHandler
    );
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
