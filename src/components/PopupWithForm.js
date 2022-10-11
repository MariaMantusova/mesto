import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit',(evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}