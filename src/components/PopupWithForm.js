import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__item'));
        this._popupForm = this._popupSelector.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputsValues = this._inputList.map((item) => {
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
        this._popupForm.reset();
    }
}