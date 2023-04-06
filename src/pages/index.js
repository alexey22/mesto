import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

import { formValidatorConfig } from "../utils/constants.js";

import "../pages/index.css";

////////////////////////////////////////////////////
// api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "fc75adb2-6a66-4f85-8c97-c6dd58414106",
    "Content-Type": "application/json",
  },
});

///////////////////////////////////////////////////////////////////
// Попап с изображением
const popupWithImage = new PopupWithImage(".popup_type_show-image");
popupWithImage.setEventListeners();

////////////////////////////////////////////////////////////////////
// Попап удаления карточки
const popupDeleteCard = new PopupDeleteCard(".popup_type_delete-card");
popupDeleteCard.setEventListeners();

///////////////////////////////////////////////////////////
// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
  avatarSelector: ".profile__avatar",
});

//////
//получаем информацию о пользователе
let section = {};

api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      profession: user.about,
      avatar: user.avatar,
      _id: user._id,
    });
    ///после того, как получили информацию о пользователе, запрашиваем карточки
    //////////////////////////////////////////////////////////
    /**
     * Создает кароточку Card
     * @param {string} name
     * @param {string} link
     */
    function createCard({
      name,
      link,
      likes,
      _id,
      ownerId,
      userId,
      api,
      popupDeleteCard,
    }) {
      const card = new Card({
        name,
        link,
        likes,
        _id,
        ownerId,
        userId,
        templateSelector: "#card-template",
        openPopupCallback: popupWithImage.open,
        api,
        popupDeleteCard,
      });
      return card.makeCard();
    }

    api
      .getInitialCards()
      .then((initialCards) => {
        section = new Section(
          {
            items: initialCards,
            renderer: ({
              name,
              link,
              likes,
              _id,
              ownerId,
              userId,
              containerElement,
              api, // Передаем объект с коллбеками, а не сам класс (см.ниже)
              popupDeleteCard, // Передаем объек с коллбеками, а не сам класс (см.ниже)
            }) => {
              return createCard({
                name,
                link,
                likes,
                _id,
                ownerId,
                userId,
                api, // Передаем объект с коллбеками, а не сам класс (см.ниже)
                popupDeleteCard, // Передаем объект с коллбеками, а не сам класс (см.ниже)
              });
            },
          },
          ".elements",
          // Передаем объек с коллбеками, а не сам класс (вот тут передаем)
          {
            deleteCard: (...args) => api.deleteCard(...args),
            addLike: (...args) => api.addLike(...args),
            deleteLike: (...args) => api.deleteLike(...args),
          },
          userInfo.getUserId(),
          // Передаем объек с коллбеками, а не сам класс (вот тут передаем)
          {
            open: (...args) => popupDeleteCard.open(...args),
            close: (...args) => popupDeleteCard.close(...args),
          }
        );
        section.renderAll();
      })
      .catch((err) => alert(err));
  })
  .catch((err) => alert(err));

//////////////////////////////////////////////////////////
// Попап редактирования аватарки

const popupEditAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  // колбэк при сабмите формы
  function (evt, inputValues) {
    evt.preventDefault();
    popupEditAvatar.setButtonTitle("Сохранение...");
    api
      .setUserAvatar(inputValues["avatar"])
      .then((avatar) => {
        userInfo.setUserAvatar(avatar.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupEditAvatar.setButtonTitle("Сохранить");
      });
  }
);

popupEditAvatar.setEventListeners();

userInfo.getAvatarElement().addEventListener("click", () => {
  popupEditAvatar.open();
  editAvatarFormValidator.resetValidation();
});

///////////////////////////////////////////////////////////
// Попап профиля пользователя
const popupProfileInfo = new PopupWithForm(
  ".popup_type_profile-info",
  // колбэк при сабмите формы
  function (evt, inputValues) {
    evt.preventDefault();
    popupProfileInfo.setButtonTitle("Сохранение...");
    api
      .setUserInfo({
        name: inputValues["name"],
        about: inputValues["profession"],
      })
      .then((user) => {
        userInfo.setUserInfo({
          name: user.name,
          profession: user.about,
        });
        popupProfileInfo.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupProfileInfo.setButtonTitle("Сохранить");
      });
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
    popupAddCard.setButtonTitle("Сохранение...");
    api
      .addCard(inputValues["title"], inputValues["img"])
      .then((card) => {
        section.addItem(card.name, card.link, card.likes, card._id);
        popupAddCard.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupAddCard.setButtonTitle("Сохранить");
      });
  }
);

popupAddCard.setEventListeners();

/////////////////////////////////////////////////////////////
// enable validators for 3 instances of FormWithInput
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

const editAvatarFormValidator = new FormValidator(
  formValidatorConfig,
  document.querySelector(".form-edit-avatar")
);
editAvatarFormValidator.enableValidation();
