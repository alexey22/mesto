import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._titleElement = this._element.querySelector(".popup__subtitle");
    this._imageElement = this._element.querySelector(".popup__image");
  }

  open(title, imgLink) {
    this._titleElement.textContent = title;
    this._imageElement.src = imgLink;
    this._imageElement.alt = title;
    super.open();
  }
}
