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

const profileEditButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup");
const profileNameElement = document.querySelector(".profile__name");
const formProfileInfoInputName = document.querySelector(
  ".form-profile-info__input_el_name"
);
const profileProfessionElement = document.querySelector(".profile__profession");
const formProfileInfoInputProfession = document.querySelector(
  ".form-profile-info__input_el_profession"
);

profileEditButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  formProfileInfoInputName.value = profileNameElement.textContent;
  formProfileInfoInputProfession.value = profileProfessionElement.textContent;
});

function closePopup() {
  popup.classList.remove("popup_opened");
}

const popupClose = document.querySelector(".popup__close");
popupClose.addEventListener("click", function (e) {
  e.preventDefault();
  closePopup();
});

const formProfileInfo = document.querySelector(".form-profile-info");
formProfileInfo.addEventListener("submit", function (e) {
  e.preventDefault();
  profileNameElement.textContent = formProfileInfoInputName.value;
  profileProfessionElement.textContent = formProfileInfoInputProfession.value;
  closePopup();
});
