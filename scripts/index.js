import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/////////////////////////////////////////////
// popup Open and Close

// скрываем ошибки валидации при закрытии (подчеркивание красным input-a и вывод сообщения с описанием ошибки)
function hideErrors(popup) {
  Array.from(popup.querySelectorAll(".popup__error_visible")).forEach(
    (errorElem) => errorElem.classList.remove("popup__error_visible")
  );
  Array.from(popup.querySelectorAll(".popup__input_type_error")).forEach(
    (errorElem) => errorElem.classList.remove("popup__input_type_error")
  );
}

function handleEsc(evt) {
  evt.preventDefault();
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    if (activePopup.querySelector(".popup__form")) {
      activePopup.querySelector(".popup__form").reset();
      hideErrors(activePopup);
    }
    closePopup(activePopup);
  }
}

function closePopupOnOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    const activePopup = document.querySelector(".popup_opened");
    if (activePopup.querySelector(".popup__form")) {
      activePopup.querySelector(".popup__form").reset();
      hideErrors(activePopup);
    }
    closePopup(activePopup);
  }
}

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keyup", handleEsc);
  popup.removeEventListener("click", closePopupOnOverlayClick);
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleEsc);
  popup.addEventListener("click", closePopupOnOverlayClick);
}

////////////////////////////////////////////
// setting popup for images

const popupImage = document.querySelector(".popup_type_show-image");

const popupCloseButton = popupImage.querySelector(".popup__close");
popupCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});

initialCards.forEach((elem) => {
  const card = new Card(
    elem.name,
    elem.link,
    "#card-template",
    popupImage,
    openPopup
  );
  card.render(".elements");
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
  hideErrors(formAddCard);
  closePopup(popupAddCard);
});

formAddCard.addEventListener("submit", function (e) {
  e.preventDefault();
  const card = new Card(
    formAddCardInputTitle.value,
    formAddCardInputImg.value,
    "#card-template",
    popupImage,
    openPopup
  );
  card.render(".elements");
  formAddCard.reset();
  // через готовый, имеющуйся метод валидатора формы делаем кнопку сабмита неактивной, так как поля только что были очищены и стали пустыми
  cardAddFormValidator.toggleButtonState(
    [formAddCardInputTitle, formAddCardInputImg],
    formAddCard.querySelector(".popup__button")
  );
  hideErrors(popupAddCard);
  closePopup(popupAddCard);
});

const profileFormValidator = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  document.querySelector(".form-profile-info")
);
profileFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  document.querySelector(".form-add-card")
);
cardAddFormValidator.enableValidation();
