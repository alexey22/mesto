export default class UserInfo {
  constructor({ nameSelector, professionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(professionSelector);
    this._name = this._nameElement.textContent;
    this._profession = this._professionElement.textContent;
  }

  getUserInfo() {
    return { name: this._name, profession: this._profession };
  }

  setUserInfo({ name, profession }) {
    this._name = name;
    this._profession = profession;
    this._nameElement.textContent = this._name;
    this._professionElement.textContent = this._profession;
  }
}
