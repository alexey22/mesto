export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = document.querySelector(this._popupSelector);
    this._closeButtonElement = this._element.querySelector(".popup__close");
    this._closePopupOnOverlayClick = this._closePopupOnOverlayClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
    this._element.addEventListener("click", this._closePopupOnOverlayClick);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
    this._element.removeEventListener("click", this._closePopupOnOverlayClick);
  }

  _closePopupOnOverlayClick(evt) {
    if (evt.currentTarget === evt.target) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButtonElement.addEventListener("click", this.close);
  }
}
