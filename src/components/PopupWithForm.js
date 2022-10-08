import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const inputsList = Array.from(this._popupSelector.querySelectorAll('.popup__item'));

        const inputsValues = inputsList.map((item) => {
            return item.value
        })

        return inputsValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.querySelector('.popup__form').addEventListener('submit',(evt) => {
            this._submitForm(evt);
        });
    }

    close() {
        super.close();
        this._popupSelector.querySelector('.popup__form').reset();
    }
}