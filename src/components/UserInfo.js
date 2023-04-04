export default class UserInfo {
  constructor({ nameSelector, professionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(professionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name,
      profession: this._profession,
      avatar: this._avatar,
      _id: this._id,
    };
  }

  getAvatarElement() {
    return this._avatarElement;
  }

  setUserAvatar(url) {
    this._avatar = url;
    this._avatarElement.src = this._avatar;
  }

  getUserId() {
    return this._id;
  }

  setUserInfo({ name, profession, avatar, _id }) {
    this._name = name;
    this._profession = profession;
    if (avatar) {
      this._avatar = avatar;
      this._avatarElement.src = this._avatar;
    }
    if (_id) this._id = _id;
    this._nameElement.textContent = this._name;
    this._professionElement.textContent = this._profession;
  }
}
