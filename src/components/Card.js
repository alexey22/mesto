class Card {
  /**
   * @param {string} name
   * @param {string} link
   * @param {string} templateSelector
   * @param {function} openPopupCallback
   */
  constructor({
    name,
    link,
    likes,
    _id,
    ownerId,
    userId,
    templateSelector,
    openPopupCallback,
    api, // сюда передан объект с коллбекам, а не сам класс (имя поля объекта совпадает с названием метода класса)
    popupDeleteCard, // сюда передан объект с коллбекам, а не сам класс (имя поля объекта совпадает с названием метода класса)
  }) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._ownerId = ownerId;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._openPopupCallback = openPopupCallback;
    this._api = api; // сюда передан объект с коллбекам, а не сам класс (имя поля объекта совпадает с названием метода класса)
    this._popupDeleteCard = popupDeleteCard; // сюда передан объект с коллбекам, а не сам класс (имя поля объекта совпадает с названием метода класса)
    this._isMyCard = this._ownerId === this._userId;
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
    this._titleElement = this._element.querySelector(".card__title");
    this._titleElement.textContent = this._name;
    this._likeElement = this._element.querySelector(".card__like");
    this._likeCounterElement = this._element.querySelector(
      ".card__like-counter"
    );
    this._likeCounterElement.textContent = this._likes.length;
    this._deleteElement = this._element.querySelector(".card__delete");
    if (this._isMyCard) {
      this._deleteCardHandler = this._deleteCardHandler.bind(this);
    } else {
      this._deleteElement.remove();
    }

    this._likeCardHandler = this._likeCardHandler.bind(this);
    this._openImagePopupHandler = this._openImagePopupHandler.bind(this);

    this._addEventListeners();

    if (
      this._likes.some((like) => {
        return like._id === this._userId;
      })
    ) {
      this._likeElement.classList.add("card__like_liked");
    }

    return this._element;
  }

  _deleteCardHandler() {
    this._popupDeleteCard.open((evt) => {
      // formSubmitHandler
      evt.preventDefault();
      this._api
        .deleteCard(this._id)
        .then((res) => {
          this._removeEventListeners();
          this._element.remove();
          this._popupDeleteCard.close();
          //delete this;
        })
        .catch((err) => alert(err));
    });
  }

  _likeCardHandler() {
    if (this._likeElement.classList.contains("card__like_liked")) {
      this._api
        .deleteLike(this._id)
        .then((card) => {
          this._likeElement.classList.remove("card__like_liked");
          this._likes = card.likes;
          this._likeCounterElement.textContent = card.likes.length;
        })
        .catch((err) => alert(err));
    } else {
      this._api
        .addLike(this._id)
        .then((card) => {
          this._likeElement.classList.add("card__like_liked");
          this._likes = card.likes;
          this._likeCounterElement.textContent = card.likes.length;
        })
        .catch((err) => alert(err));
    }
  }

  _openImagePopupHandler() {
    this._openPopupCallback(this._name, this._link);
  }

  _addEventListeners() {
    //add event for card delete
    if (this._isMyCard)
      this._deleteElement.addEventListener("click", this._deleteCardHandler);

    //add event for card like
    this._likeElement.addEventListener("click", this._likeCardHandler);

    //add event for image popups
    this._imageElement.addEventListener("click", this._openImagePopupHandler);
  }

  _removeEventListeners() {
    //remove event for card delete
    if (this._isMyCard)
      this._deleteElement.removeEventListener("click", this._deleteCardHandler);

    //remove event for card like
    this._likeElement.removeEventListener("click", this._likeCardHandler);

    //remove event for image popup
    this._imageElement.removeEventListener(
      "click",
      this._openImagePopupHandler
    );
  }
}

export default Card;
