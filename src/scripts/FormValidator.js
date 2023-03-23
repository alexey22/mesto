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

    // находим все input-ы формы
    this._inputList = Array.from(
      this._formElem.querySelectorAll(this._inputSelector)
    );
    // находим кнопку формы
    this._buttonElem = this._formElem.querySelector(this._submitButtonSelector);
  }

  /**
   * 1) Сбрасывает поля формы до пустого состояния
   * 2) Убирает отображение ошибок на полях формы (подчеркивание input-a + вывод текста ошибки)
   */
  hideErrors() {
    Array.from(this._formElem.querySelectorAll("." + this._errorClass)).forEach(
      (errorElem) => errorElem.classList.remove(this._errorClass)
    );
    Array.from(
      this._formElem.querySelectorAll("." + this._inputErrorClass)
    ).forEach((errorElem) => errorElem.classList.remove(this._inputErrorClass));
  }

  /**
   * Для данного input-а
   * 1) подчеркивает его красным
   * 2) выводит сообщение с текстом ошибки под ним
   * @param {HTMLElement} inputElem
   * @param {string} errorMessage
   */
  _showInputError(inputElem, errorMessage) {
    const errorElem = this._formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(this._inputErrorClass);
    errorElem.classList.add(this._errorClass);
    errorElem.textContent = errorMessage;
  }

  /**
   * Для данного input-а
   * 1) удалет подчеркивание красным
   * 2) скрывает сообщение с текстом ошибки под ним
   * @param {HTMLElement} inputElem
   */
  _hideInputError(inputElem) {
    const errorElem = this._formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(this._inputErrorClass);
    errorElem.classList.remove(this._errorClass);
    errorElem.textContent = "";
  }

  /**
   * проверяем валидность конкретного input-а и выводим или прячем ошибку на нем (подчеркивание + текст ошибки под ним)
   * @param {HTMLElement} inputElem
   */
  _checkInputValidity(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  }

  /**
   * проверяем есть ли невалидный input на форме
   * @returns {boolean} true - если есть невалидные поля, false - невалидные поля отсутствуют
   */
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  /**
   * переключаем состояние кнопки в зависимости от валидности всех input-ов её формы
   * этот метод так же публичный, так как нужно поменять состояние кнопки отправки формы добавления карточки
   * после успешного создания новой карточки
   */
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElem.classList.add(this._inactiveButtonClass);
      this._buttonElem.disabled = true;
    } else {
      this._buttonElem.classList.remove(this._inactiveButtonClass);
      this._buttonElem.disabled = false;
    }
  }

  /**
   * Для каждого input формы добавляет слушателя события input
   */
  _addEventListenerToForm() {
    this._formElem.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this.toggleButtonState();
    this._inputList.forEach((inputElem) => {
      inputElem.addEventListener("input", () => {
        this._checkInputValidity(inputElem);
        this.toggleButtonState();
      });
    });
  }
  /**
   * Публичный метода запуска валидации формы
   */
  enableValidation() {
    this._addEventListenerToForm();
  }
}

export default FormValidator;
