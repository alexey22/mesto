import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import { initialCards, formValidatorConfig } from "../utils/constants.js";

import "../pages/index.css";

///////////////////////////////////////////////////////////
// Поля формы редактрирования профиля пользователя
// Имя профиля
const profileInfoFormInputNameElement = document.querySelector(
  ".form-profile-info__input_el_name"
);
// Профессия профиля
const profileInfoFormInputProfessionElement = document.querySelector(
  ".form-profile-info__input_el_profession"
);

//////////////////////////////////////////////////////////
// Поля формы добавления новой карточки
// Заголовок
const cardAddFormInputTitleElement = document.querySelector(
  ".form-add-card__input_el_title"
);
// Фото
const cardAddFormInputImgElement = document.querySelector(
  ".form-add-card__input_el_img"
);

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
  function (evt, inputValues) {
    evt.preventDefault();
    userInfo.setUserInfo({
      name: inputValues["name"],
      profession: inputValues["profession"],
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
  popupProfileInfo.open();
  const userInfoObj = userInfo.getUserInfo();
  popupProfileInfo.setInputValues({
    name: userInfoObj.name,
    profession: userInfoObj.profession,
  });
  profileFormValidator.resetValidation();
});

////////////////////////////////////////////////////////////
//Попап добавления новой карточки

profile.cardAddButton.addEventListener("click", function () {
  popupAddCard.open();
  cardAddFormValidator.resetValidation();
});

const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  // колбэк при отправке формы
  function (evt, inputValues) {
    evt.preventDefault();
    section.addItem(inputValues["title"], inputValues["img"]);
    popupAddCard.close();
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

/////////////////////////////////////////////////////////////
// enable validators for 2 instances of FormWithInput
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
