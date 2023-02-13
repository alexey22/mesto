// показываем ошибку визуально на самом input-e и выводим сообщение об ошибке под ним
function showInputError(
  formElem,
  inputElem,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.add(inputErrorClass);
  errorElem.classList.add(errorClass);
  errorElem.textContent = errorMessage;
}

// убираем ошибку на самом input-e и убираем сообщение об ошибке под ним
function hideInputError(formElem, inputElem, inputErrorClass, errorClass) {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(inputErrorClass);
  errorElem.classList.remove(errorClass);
  errorElem.textContent = "";
}

// проверяем валидность конкретного input-а и выводим или прячем ошибку на нем и сообщения об ошибку рядом с ним
function checkInputValidity(formElem, inputElem, inputErrorClass, errorClass) {
  if (!inputElem.validity.valid) {
    showInputError(
      formElem,
      inputElem,
      inputElem.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElem, inputElem, inputErrorClass, errorClass);
  }
}

// проверяем есть ли невалидный input на форме
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

// переключаем состояние кнопки в зависимости от валидности всех input-ов её формы
function toggleButtonState(inputList, buttonElem, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add(inactiveButtonClass);
    buttonElem.disabled = true;
  } else {
    buttonElem.classList.remove(inactiveButtonClass);
    buttonElem.disabled = false;
  }
}

function addEventListenerToForm({
  formElem,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  // отменяем действие по умолчанию
  formElem.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  // находим все input-ы формы
  const inputsList = Array.from(formElem.querySelectorAll(inputSelector));
  // находим кнопку формы
  const buttonElem = formElem.querySelector(submitButtonSelector);
  toggleButtonState(inputsList, buttonElem, inactiveButtonClass);
  inputsList.forEach((inputElem) => {
    inputElem.addEventListener("input", function () {
      checkInputValidity(formElem, inputElem, inputErrorClass, errorClass);
      toggleButtonState(inputsList, buttonElem, inactiveButtonClass);
    });
  });
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  // находим все формы
  const formsList = Array.from(document.querySelectorAll(formSelector));

  // обходим все формы
  formsList.forEach((formElem) => {
    addEventListenerToForm({
      formElem,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    });
  });
}
