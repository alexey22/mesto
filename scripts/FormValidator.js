class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    formElem
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElem = formElem;
  }

  _showInputError(inputElem, errorMessage) {
    const errorElem = this._formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(this._inputErrorClass);
    errorElem.classList.add(this._errorClass);
    errorElem.textContent = errorMessage;
  }

  // убираем ошибку на самом input-e и убираем сообщение об ошибке под ним
  _hideInputError(inputElem) {
    const errorElem = this._formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(this._inputErrorClass);
    errorElem.classList.remove(this._errorClass);
    errorElem.textContent = "";
  }

  // проверяем валидность конкретного input-а и выводим или прячем ошибку на нем и сообщения об ошибку рядом с ним
  _checkInputValidity(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  }

  // проверяем есть ли невалидный input на форме
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // переключаем состояние кнопки в зависимости от валидности всех input-ов её формы
  // этот метод так же публичный, так как нужно поменять состояние кнопки отправки формы добавления карточки
  // после успешного создания новой карточки
  toggleButtonState(inputList, buttonElem) {
    if (this._hasInvalidInput(inputList)) {
      buttonElem.classList.add(this._inactiveButtonClass);
      buttonElem.disabled = true;
    } else {
      buttonElem.classList.remove(this._inactiveButtonClass);
      buttonElem.disabled = false;
    }
  }

  _addEventListenerToForm() {
    // отменяем действие по умолчанию
    this._formElem.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    // находим все input-ы формы
    const inputsList = Array.from(
      this._formElem.querySelectorAll(this._inputSelector)
    );
    // находим кнопку формы
    const buttonElem = this._formElem.querySelector(this._submitButtonSelector);
    this.toggleButtonState(inputsList, buttonElem);
    inputsList.forEach((inputElem) => {
      inputElem.addEventListener("input", () => {
        this._checkInputValidity(inputElem);
        this.toggleButtonState(inputsList, buttonElem);
      });
    });
  }

  enableValidation() {
    this._addEventListenerToForm();
  }
}

export default FormValidator;
