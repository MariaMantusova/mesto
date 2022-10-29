import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, api) {
        super(popupSelector);
        this._api = api
    }

    open(card) {
        super.open()
        this._card = card
    }

    close() {
        super.close()
        this._card = null
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._api.deleteCard(this._card._id)
                .then(() => {
                    this._card.remove();
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    this._popup.classList.remove('popup_opened');
                })
            this._popup.querySelector('.popup__button_theme_confirm').setAttribute('disabled', '');
        });
    }
}