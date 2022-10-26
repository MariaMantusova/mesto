export default class Api {
    constructor(config) {
        this._url = config.url;
        this._token = config.token;
        this._header = config.headers;
    }

    getUserInfo() {
        return fetch(this._url, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(new Error(res.status.toString()))
                }
            })
            .catch((err) => Promise.reject(err))
    }

    getCards() {
        return fetch(this._url, {
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(new Error(res.status.toString()))
                }
            })
            .catch((err) => Promise.reject(err))
    }

    changeUserInfo(name, about) {
        return fetch(this._url, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(new Error(res.status.toString()))
                }
            })
            .catch((err) => Promise.reject(err))
    }
}