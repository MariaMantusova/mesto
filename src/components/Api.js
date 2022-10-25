export default class Api {
    constructor(config) {
        this._url = config.url;
        this._token = config.token;
        this._header = config.headers;
    }
}