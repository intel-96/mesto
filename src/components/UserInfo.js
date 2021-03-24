export default class UserInfo {

  constructor(profileNameSelector, profileJobSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);

  }

  getUserInfo() {
    this._profile = {};
    this._profile.username = this._name.textContent;
    this._profile.job = this._job.textContent;
    return this._profile;
  }

  setUserInfo({username, job}) {
    this._name.textContent = username;
    this._job.textContent = job;
  }

}
