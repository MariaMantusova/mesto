import Popup from "../components/Popup.js";

export default class PopupWithConfirmation extends Popup {
    _card;

    constructor(popupSelector) {
        super(popupSelector);
    }

    setCard(card) {
        this._card = card;
    }
}