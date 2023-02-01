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
