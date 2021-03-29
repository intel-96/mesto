import { nameInput } from "../utils/constants";

export default class Api {
  constructor({ url, headers, groupId }) {
    this._headers = headers;
    this._url = url;
    this._groupId = groupId;
  }

  getAllInfo() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }
  getInitialCards() {
    return fetch(`${this._url}/v1/${this._groupId}/cards`, {
      headers: this._headers
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  addCard(name, link) {
    return fetch(`${this._url}/v1/${this._groupId}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  removeCard(card) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  likeCard(card) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  removeLike(card) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  getUserData() {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  patchUserInfo(name, job) {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._url}/v1/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

}
