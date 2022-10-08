export default class UserInfo {
    constructor({userName, userJob}) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        const userInfo = {userName: this._userName.value, };
         this._userName.value;

    }
}