class Card {
  constructor(name, link, templateSelector, popupImage, openPopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._popupImage = popupImage;
    this._openPopup = openPopup;
  }

  _makeCard() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.children[0].cloneNode(true);

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._addEventListeners();
  }

  render(renderToSelector) {
    this._makeCard();
    document.querySelector(renderToSelector).prepend(this._element);
  }

  _deleteCardHandler() {
    this._removeEventListeners();
    this._element.remove();
    delete this;
  }

  _likeCardHandler(event) {
    event.target.classList.toggle("card__like_liked");
  }

  _openImagePopupHandler() {
    const imageElem = this._popupImage.querySelector(".popup__image");
    const subtitle = this._popupImage.querySelector(".popup__subtitle");
    imageElem.src = this._link;
    imageElem.alt = this._name;
    subtitle.textContent = this._name;
    this._openPopup(this._popupImage);
  }

  _addEventListeners() {
    //add event for card delete
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", this._deleteCardHandler.bind(this));

    //add event for card like
    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._likeCardHandler.bind(this));

    //add event for image popup
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._openImagePopupHandler.bind(this));
  }

  _removeEventListeners() {
    //remove event for card delete
    this._element
      .querySelector(".card__delete")
      .removeEventListener("click", this._deleteCardHandler);

    //remove event for card like
    this._element
      .querySelector(".card__like")
      .removeEventListener("click", this._likeCardHandler);

    //remove event for image popup
    this._element
      .querySelector(".card__image")
      .removeEventListener("click", this._openImagePopupHandler);
  }
}

export default Card;
