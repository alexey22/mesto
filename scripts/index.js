import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import initialCards from "./initialCards.js";

/**
 * Скрывает ошибки валидации форм ( Убирает подчеркивание красным input-a и вывод сообщения с описанием ошибки),
 * а так же сбрасывает значения текстовых полей формы до пустого состояния:
 * 1) формы добавления новой карточки
 * 2) формы редактирования профиля
 */
function hideErrorsAndReset() {
  cardAddFormValidator.hideErrorsAndReset();
  profileFormValidator.hideErrorsAndReset();
}

/**
 * Обработчик события
 * при нажатии Esc на document
 * Находит активный popup и закрывает его
 * @param {Event} evt - событие, на котором сработал слушатель, запускающий данный обработчик
 */
function handleEsc(evt) {
  evt.preventDefault();
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

/**
 * Обработчик события
 * при клике на Overlay popup-a
 * Находит активный попап и закрывает его
 * @param {Event} evt
 */
function closePopupOnOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

/**
 * Закрывает popup
 * @param {HTMLElement} popup
 */
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  hideErrorsAndReset();
  document.removeEventListener("keyup", handleEsc);
  popup.removeEventListener("click", closePopupOnOverlayClick);
};

/**
 * Отрывает popup
 * @param {HTMLElement} popup
 */
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleEsc);
  popup.addEventListener("click", closePopupOnOverlayClick);
}

// HTMLElement of popup with image
const popupImage = document.querySelector(".popup_type_show-image");
const popupCloseButton = popupImage.querySelector(".popup__close");
popupCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});

const popupImageFotoElement = popupImage.querySelector(".popup__image");
const popupImageSubtitleElement = popupImage.querySelector(".popup__subtitle");

/**
 * Создает кароточку Card и размещает ее в верстке страницы
 * @param {string} name
 * @param {string} link
 */
function createAndRenderCard(name, link) {
  // 4ым аргументом передаем callback, который знает про openPopup и popupImage, так что класс Card теперь не должен знать о них
  // класс Card сообщит колбэку imgLink - адрес своего изображение и title - свой заголовок
  const card = new Card(name, link, "#card-template", (imgLink, title) => {
    popupImageFotoElement.src = imgLink;
    popupImageFotoElement.alt = title;
    popupImageSubtitleElement.textContent = title;
    openPopup(popupImage);
  });
  document.querySelector(".elements").prepend(card.makeCard());
}

// Создает первоначальные карточки
initialCards.forEach((elem) => {
  createAndRenderCard(elem.name, elem.link);
});

////////////////////////////////////////////////
//Form for edit profile info

const profileEditButton = document.querySelector(".profile__edit-button");

const profileNameElement = document.querySelector(".profile__name");
const profileProfessionElement = document.querySelector(".profile__profession");

const popupProfileInfo = document.querySelector(".popup_type_profile-info");

const formProfileInfoInputName = popupProfileInfo.querySelector(
  ".form-profile-info__input_el_name"
);
const formProfileInfoInputProfession = popupProfileInfo.querySelector(
  ".form-profile-info__input_el_profession"
);

const popupAddCard = document.querySelector(".popup_type_add-card");

const formProfileInfo = popupProfileInfo.querySelector(".form-profile-info");
const formAddCard = popupAddCard.querySelector(".form-add-card");

profileEditButton.addEventListener("click", function () {
  openPopup(popupProfileInfo);
  formProfileInfoInputName.value = profileNameElement.textContent;
  formProfileInfoInputProfession.value = profileProfessionElement.textContent;
  // генерируем событие input на первом текстовом поле, чтобы форма свалидировалась после открытия, так как
  // изменение textContent не вызывает этого события и форма считает что текстовые поля пустые
  // хотя они заполнены
  formProfileInfo
    .querySelector(".popup__input")
    .dispatchEvent(new Event("input"));
});

const popupProfileInfoCloseButton =
  popupProfileInfo.querySelector(".popup__close");
popupProfileInfoCloseButton.addEventListener("click", function () {
  closePopup(popupProfileInfo);
});

formProfileInfo.addEventListener("submit", function (e) {
  e.preventDefault();
  profileNameElement.textContent = formProfileInfoInputName.value;
  profileProfessionElement.textContent = formProfileInfoInputProfession.value;
  closePopup(popupProfileInfo);
});

////////////////////////////////////////////////
//Form for add cards
const cardAddButton = document.querySelector(".profile__add-button");

const formAddCardInputTitle = popupAddCard.querySelector(
  ".form-add-card__input_el_title"
);
const formAddCardInputImg = popupAddCard.querySelector(
  ".form-add-card__input_el_img"
);

cardAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");
popupAddCardCloseButton.addEventListener("click", function () {
  formAddCard.reset();

  closePopup(popupAddCard);
});

formAddCard.addEventListener("submit", function (e) {
  e.preventDefault();

  createAndRenderCard(formAddCardInputTitle.value, formAddCardInputImg.value);

  formAddCard.reset();
  // через готовый, имеющуйся метод валидатора формы делаем кнопку сабмита неактивной, так как поля только что были очищены и стали пустыми
  cardAddFormValidator.toggleButtonState();
  closePopup(popupAddCard);
});

const formValidatorConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileFormValidator = new FormValidator(
  formValidatorConfig,
  document.querySelector(".form-profile-info")
);
profileFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(
  formValidatorConfig,
  document.querySelector(".form-add-card")
);
cardAddFormValidator.enableValidation();
