const profileEditButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup");
const profileNameElement = document.querySelector(".profile__name");
const popupInputName = document.querySelector(".popup__input_name");
const profileProfessionElement = document.querySelector(".profile__profession");
const popupInputProfession = document.querySelector(".popup__input_profession");

profileEditButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  popupInputName.value = profileNameElement.textContent;
  popupInputProfession.value = profileProfessionElement.textContent;
});

const popupClose = document.querySelector(".popup__close");
popupClose.addEventListener("click", function (e) {
  e.preventDefault();
  popup.classList.remove("popup_opened");
});

const popupSubmitButton = document.querySelector(".popup__submit-button");
popupSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  profileProfessionElement.textContent = popupInputProfession.value;
  profileNameElement.textContent = popupInputName.value;
  popup.classList.remove("popup_opened");
});
