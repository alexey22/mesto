import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import initialCards from "./initialCards.js";

import "../pages/index.css";

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

// HTMLElements of popup with image
const popupWithImageElement = document.querySelector(".popup_type_show-image");
const popupWithImage = {
  popup: popupWithImageElement,
  image: popupWithImageElement.querySelector(".popup__image"),
  subtitle: popupWithImageElement.querySelector(".popup__subtitle"),
  closeButton: popupWithImageElement.querySelector(".popup__close"),
};

popupWithImage.closeButton.addEventListener("click", () => {
  closePopup(popupWithImage);
});

/**
 * Создает кароточку Card
 * @param {string} name
 * @param {string} link
 */
function createCard(name, link) {
  // 4ым аргументом передаем callback, который знает про openPopup и popupWithImage, так что класс Card теперь не должен знать о них
  // класс Card сообщит колбэку imgLink - адрес своего изображение и title - свой заголовок
  const card = new Card(name, link, "#card-template", (imgLink, title) => {
    popupWithImage.image.src = imgLink;
    popupWithImage.image.alt = title;
    popupWithImage.subtitle.textContent = title;
    openPopup(popupWithImage.popup);
  });
  return card.makeCard();
}

const cardsContainer = document.querySelector(".elements");
function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

// Создает первоначальные карточки
initialCards.forEach((elem) => {
  renderCard(createCard(elem.name, elem.link));
});

/**
 * Профиль пользователя
 * 1) кнопка редактирования
 * 2) имя
 * 3) профессия
 * 4) кнопка добавления новой карточки
 */

const profile = {
  editButton: document.querySelector(".profile__edit-button"),
  name: document.querySelector(".profile__name"),
  profession: document.querySelector(".profile__profession"),
  cardAddButton: document.querySelector(".profile__add-button"),
};

/**
 * Попап редактирования профиля
 */
const popupProfileInfoElement = document.querySelector(
  ".popup_type_profile-info"
);
const popupProfileInfo = {
  popup: popupProfileInfoElement,
  inputName: popupProfileInfoElement.querySelector(
    ".form-profile-info__input_el_name"
  ),
  inputProfession: popupProfileInfoElement.querySelector(
    ".form-profile-info__input_el_profession"
  ),
  form: popupProfileInfoElement.querySelector(".form-profile-info"),
  closeButton: popupProfileInfoElement.querySelector(".popup__close"),
};

profile.editButton.addEventListener("click", function () {
  profileFormValidator.hideErrorsAndReset();
  openPopup(popupProfileInfo.popup);
  popupProfileInfo.inputName.value = profile.name.textContent;
  popupProfileInfo.inputProfession.value = profile.profession.textContent;
  // генерируем событие input на первом текстовом поле, чтобы форма свалидировалась после открытия, так как
  // изменение textContent не вызывает этого события и форма считает что текстовые поля пустые
  // хотя они заполнены
  popupProfileInfo.form
    .querySelector(".popup__input")
    .dispatchEvent(new Event("input"));
});

popupProfileInfo.closeButton.addEventListener("click", function () {
  closePopup(popupProfileInfo.popup);
});

popupProfileInfo.form.addEventListener("submit", function (e) {
  e.preventDefault();
  profile.name.textContent = popupProfileInfo.inputName.value;
  profile.profession.textContent = popupProfileInfo.inputProfession.value;
  closePopup(popupProfileInfo.popup);
});

/**
 * Попап добавления новой карточки
 */
const popupAddCardElement = document.querySelector(".popup_type_add-card");
const popupAddCard = {
  popup: popupAddCardElement,
  inputTitle: popupAddCardElement.querySelector(
    ".form-add-card__input_el_title"
  ),
  inputImg: popupAddCardElement.querySelector(".form-add-card__input_el_img"),
  form: popupAddCardElement.querySelector(".form-add-card"),
  closeButton: popupAddCardElement.querySelector(".popup__close"),
};

profile.cardAddButton.addEventListener("click", function () {
  cardAddFormValidator.hideErrorsAndReset();
  openPopup(popupAddCard.popup);
});

popupAddCard.closeButton.addEventListener("click", function () {
  popupAddCard.form.reset();
  closePopup(popupAddCard.popup);
});

popupAddCard.form.addEventListener("submit", function (e) {
  e.preventDefault();

  renderCard(
    createCard(popupAddCard.inputTitle.value, popupAddCard.inputImg.value)
  );

  popupAddCard.form.reset();
  // через готовый, имеющуйся метод валидатора формы делаем кнопку сабмита неактивной, так как поля только что были очищены и стали пустыми
  cardAddFormValidator.toggleButtonState();
  closePopup(popupAddCard.popup);
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
  popupProfileInfo.form
);
profileFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(
  formValidatorConfig,
  popupAddCard.form
);
cardAddFormValidator.enableValidation();
