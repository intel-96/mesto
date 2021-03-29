export default class UserInfo {

  constructor( profileNameSelector, profileJobSelector, avatarSelector ) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = '';
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent
    }
  }

  getMyId() {
    return this._id;
  }

  loadUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._job.textContent = about;
  }
}
