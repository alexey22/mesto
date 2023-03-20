class Card {
  /**
   * @param {string} name
   * @param {string} link
   * @param {string} templateSelector
   * @param {function} openPopupCallback
   */
  constructor(name, link, templateSelector, openPopupCallback) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openPopupCallback = openPopupCallback;
  }

  /**
   * Создает и возврашает HTMLElement карточки
   * @returns HTMLElement
   */
  makeCard() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.children[0].cloneNode(true);

    this._imageElement = this._element.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._like = this._element.querySelector(".card__like");

    this._deleteCardHandler = this._deleteCardHandler.bind(this);
    this._likeCardHandler = this._likeCardHandler.bind(this);
    this._openImagePopupHandler = this._openImagePopupHandler.bind(this);

    this._addEventListeners();

    return this._element;
  }

  _deleteCardHandler() {
    this._removeEventListeners();
    this._element.remove();
    delete this;
  }

  _likeCardHandler() {
    this._like.classList.toggle("card__like_liked");
  }

  _openImagePopupHandler() {
    this._openPopupCallback(this._name, this._link);
  }

  _addEventListeners() {
    //add event for card delete
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", this._deleteCardHandler);

    //add event for card like
    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._likeCardHandler);

    //add event for image popups
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._openImagePopupHandler);
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
