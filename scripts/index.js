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

function handleEsc(evt) {
  evt.preventDefault();
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keypress", handleEsc);
  popup.removeEventListener("click", closePopupOnOverlayClick);

  // скрываем ошибки валидации при закрытии (подчеркивание красным input-a и вывод сообщения с описанием ошибки)
  Array.from(popup.querySelectorAll(".popup__error_visible")).forEach(
    (errorElem) => errorElem.classList.remove("popup__error_visible")
  );
  Array.from(popup.querySelectorAll(".popup__input_type_error")).forEach(
    (errorElem) => errorElem.classList.remove("popup__input_type_error")
  );
}

const closePopupOnOverlayClick = (evt) => {
  if (evt.currentTarget === evt.target) {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleEsc);
  popup.addEventListener("click", closePopupOnOverlayClick);
}

////////////////////////////////////////////
// setting popup for images

const popupImage = document.querySelector(".popup_type_show-image");
const imageElem = popupImage.querySelector(".popup__image");
const subtitle = popupImage.querySelector(".popup__subtitle");
const popupCloseButton = popupImage.querySelector(".popup__close");
popupCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});

/////////////////////////////////////////////
// make card from template

const cardTemplateContent = document.querySelector("#card-template").content;
function makeCard(name, link) {
  const card = cardTemplateContent.cloneNode(true);
  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").alt = name;
  card.querySelector(".card__title").textContent = name;

  //add event for card delete
  card.querySelector(".card__delete").addEventListener("click", (event) => {
    event.target.closest(".card").remove();
  });

  //add event for card like
  card.querySelector(".card__like").addEventListener("click", (event) => {
    event.target.classList.toggle("card__like_liked");
  });

  //add events for image popup
  card.querySelector(".card__image").addEventListener("click", (event) => {
    imageElem.src = link;
    imageElem.alt = name;
    subtitle.textContent = name;
    openPopup(popupImage);
  });

  return card;
}

// where card are stored in in HTML
const cardsContainer = document.querySelector(".elements");

// add cards from initial array to cards's container
cardsContainer.append(
  ...initialCards.map((card) => makeCard(card.name, card.link))
);

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
  cardsContainer.prepend(
    makeCard(formAddCardInputTitle.value, formAddCardInputImg.value)
  );
  formAddCard.reset();
  closePopup(popupAddCard);
});

// index.js - индексный файл, "точка входа" в JS
// validate.js - своего рода "библиотека", которая подключается перед index.js
// и применятся в нем. поэтому функции из validate.js вызываются(используются)
// в "основной программе" index.js

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
