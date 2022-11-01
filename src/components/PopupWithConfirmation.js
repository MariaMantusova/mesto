import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button_theme_confirm');
    }

    setEventListener() {
        this._button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submitAction();
        });
    }

    setSubmitAction(_submitAction) {
        this._submitAction = _submitAction;
    }
}