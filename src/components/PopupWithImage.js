import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
    }

    open(name, image) {
        this._popupImage.setAttribute('src', image);
        this._popupImage.setAttribute('alt', name)
        this._popupCaption.textContent = name;
        super.open();
    }
}