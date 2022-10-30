export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorSpan) {
        inputElement.classList.add(this._inputErrorClass);
        errorSpan.textContent = inputElement.validationMessage;
        errorSpan.classList.add(this._errorClass);
    }

    _hideInputError(inputElement, errorSpan) {
        inputElement.classList.remove(this._inputErrorClass);
        errorSpan.classList.remove(this._errorClass);
        errorSpan.textContent = '';
    }

    disableButton() {
        this._submitButton.setAttribute('disabled', 'disabled');
        this._submitButton.classList.add(this._inactiveButtonClass);
    }

    _toggleSubmitButton() {
        if (this._isInputListInvalid(this._inputList)) {
            this.disableButton();
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.removeAttribute('disabled', 'disabled');
        }
    }

    _isInputListInvalid(inputList) {
        return inputList.some((inputItem) => {
            return !inputItem.validity.valid
        });
    }

    _setInputItemVisibility(inputItem, errorElement) {
        if (!inputItem.validity.valid) {
            this._showInputError(inputItem, errorElement);
        } else {
            this._hideInputError(inputItem, errorElement);
        }
    }

    resetValidation() {
        this._toggleSubmitButton();

        this._inputList.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
            this._hideInputError(inputElement, errorElement);
        });

    }

    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleSubmitButton();

        this._inputList.forEach((inputItem) => {
            const errorElement = this._formElement.querySelector(`.${inputItem.id}-error`);
            inputItem.addEventListener('input', () => {
                this._setInputItemVisibility(inputItem, errorElement);
                this._toggleSubmitButton();
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}