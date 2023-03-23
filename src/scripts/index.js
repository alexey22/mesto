import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";

import initialCards from "./initialCards.js";

import "../pages/index.css";

///////////////////////////////////////////////////////////
// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
});

userInfo.setUserInfo({
  name: "Жак-Ив Кусто",
  profession: "Исследователь океана",
});

///////////////////////////////////////////////////////////
// Попап профиля пользователя
const popupProfileInfo = new PopupWithForm(
  ".popup_type_profile-info",
  // колбэк при сабмите формы
  function (evt) {
    evt.preventDefault();
    userInfo.setUserInfo({
      name: popupProfileInfo._getInputValues()[0], //document.querySelector(".form-profile-info__input_el_name").value,
      profession: popupProfileInfo._getInputValues()[1], //document.querySelector(".form-profile-info__input_el_profession").value,
    });
    popupProfileInfo.close();
  }
);

popupProfileInfo.setEventListeners();

//////////////////////////////////////////////////////////////
// Профиль пользователя
const profile = {
  editButton: document.querySelector(".profile__edit-button"),
  name: document.querySelector(".profile__name"),
  profession: document.querySelector(".profile__profession"),
  cardAddButton: document.querySelector(".profile__add-button"),
};

// слушатель кнопки редактирования профиля
profile.editButton.addEventListener("click", function () {
  profileFormValidator.hideErrors();
  popupProfileInfo.open();
  document.querySelector(".form-profile-info__input_el_name").value =
    userInfo.getUserInfo().name;
  document.querySelector(".form-profile-info__input_el_profession").value =
    userInfo.getUserInfo().profession;
  // генерируем событие input на первом текстовом поле,
  //чтобы форма свалидировалась после открытия, так как
  // изменение textContent не вызывает этого события
  //и форма считает что текстовые поля пустые хотя они заполнены
  document
    .querySelector(".form-profile-info")
    .querySelector(".popup__input")
    .dispatchEvent(new Event("input"));
});

////////////////////////////////////////////////////////////
//Попап добавления новой карточки

profile.cardAddButton.addEventListener("click", function () {
  cardAddFormValidator.hideErrors();
  popupAddCard.open();
});

const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  // колбэк при отправке формы
  function (evt) {
    evt.preventDefault();
    section.addItem(
      popupAddCard._getInputValues()[0], //document.querySelector(".form-add-card__input_el_title").value,
      popupAddCard._getInputValues()[1] //document.querySelector(".form-add-card__input_el_img").value
    );
    popupAddCard.close();
    // через готовый, имеющийся метод валидатора формы делаем кнопку сабмита неактивной,
    // так как поля после сабмита были очищены и стали пустыми
    cardAddFormValidator.toggleButtonState();
  }
);

popupAddCard.setEventListeners();

///////////////////////////////////////////////////////////////////
// Попап с изображением
const popupWithImage = new PopupWithImage(".popup_type_show-image");
popupWithImage.setEventListeners();

//////////////////////////////////////////////////////////
/**
 * Создает кароточку Card
 * @param {string} name
 * @param {string} link
 */
function createCard(name, link) {
  const card = new Card(name, link, "#card-template", popupWithImage.open);
  return card.makeCard();
}
function renderCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}

const section = new Section(
  {
    items: initialCards,
    renderer: (name, link, containerElement) => {
      renderCard(createCard(name, link), containerElement);
    },
  },
  ".elements"
);
section.renderAll();

//////////////////////////////////////////////////////////
// config and enable validators for 2 instances of FormWithInput
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
