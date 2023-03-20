import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(title, imgLink) {
    this._element.querySelector(".popup__subtitle").textContent = title;
    this._element.querySelector(".popup__image").src = imgLink;
    this._element.querySelector(".popup__image").alt = title;
    super.open();
  }
}
