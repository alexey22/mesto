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

// make card from template
function makeCard(name, link) {
  const card = document.getElementById("card-template").content.cloneNode(true);

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

  return card;
}

// where card are stored in in HTML
const cardsContainer = document.querySelector(".elements");

// add cards from initial array to cards's container
cardsContainer.append(
  ...initialCards.map((card) => makeCard(card.name, card.link))
);

/////////////////////////////////////////////
// popup Open and Close

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

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

profileEditButton.addEventListener("click", function () {
  openPopup(popupProfileInfo);
  formProfileInfoInputName.value = profileNameElement.textContent;
  formProfileInfoInputProfession.value = profileProfessionElement.textContent;
});

const popupProfileInfoCloseButton =
  popupProfileInfo.querySelector(".popup__close");
popupProfileInfoCloseButton.addEventListener("click", function () {
  closePopup(popupProfileInfo);
});

const formProfileInfo = popupProfileInfo.querySelector(".form-profile-info");
formProfileInfo.addEventListener("submit", function (e) {
  e.preventDefault();
  profileNameElement.textContent = formProfileInfoInputName.value;
  profileProfessionElement.textContent = formProfileInfoInputProfession.value;
  closePopup(popupProfileInfo);
});

////////////////////////////////////////////////
//Form for add cards
const cardAddButton = document.querySelector(".profile__add-button");

const popupAddCard = document.querySelector(".popup_type_add-card");

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
  closePopup(popupAddCard);
});

const formAddCard = popupAddCard.querySelector(".form-add-card");
formAddCard.addEventListener("submit", function (e) {
  e.preventDefault();
  cardsContainer.prepend(
    makeCard(formAddCardInputTitle.value, formAddCardInputImg.value)
  );
  formAddCard.reset();
  closePopup(popupAddCard);
});
