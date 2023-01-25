const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", function () {
  const popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");

  const profileNameElement = document.querySelector(".profile__name");
  const popupInputName = document.querySelector(".popup__input_name");
  popupInputName.value = profileNameElement.textContent;

  const profileProfessionElement = document.querySelector(
    ".profile__profession"
  );
  const popupInputProfession = document.querySelector(
    ".popup__input_profession"
  );
  popupInputProfession.value = profileProfessionElement.textContent;
});

const popupClose = document.querySelector(".popup__close");
popupClose.addEventListener("click", function (e) {
  e.preventDefault();
  const popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
});

const popupSubmitButton = document.querySelector(".popup__submit-button");
popupSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  const profileNameElement = document.querySelector(".profile__name");
  const popupInputName = document.querySelector(".popup__input_name");
  profileNameElement.textContent = popupInputName.value;

  const profileProfessionElement = document.querySelector(
    ".profile__profession"
  );
  const popupInputProfession = document.querySelector(
    ".popup__input_profession"
  );
  profileProfessionElement.textContent = popupInputProfession.value;

  const popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
});
