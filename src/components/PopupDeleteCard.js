import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._element.querySelector(".popup__form");
    this._submitButtonElement = this._element.querySelector(".popup__button");
    //this._formSubmitHandler = () => {};
  }

  open(formSubmitHandler) {
    super.open();
    this._formSubmitHandler = formSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButtonElement.addEventListener("click", (evt) => {
      this._formSubmitHandler(evt);
    });
  }
}
