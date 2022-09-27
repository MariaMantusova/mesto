export class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorInputClass, errorSpan, errorSpanClass) {
        inputElement.classList.add(errorInputClass);
        errorSpan.textContent = inputElement.validationMessage;
        errorSpan.classList.add(errorSpanClass);
    }

    _hideInputError(inputElement, errorInputClass, errorSpan, errorSpanClass) {
        inputElement.classList.remove(errorInputClass);
        errorSpan.classList.remove(errorSpanClass);
        errorSpan.textContent = '';
    }

    _toggleSubmitButton(inputList, submitButton, inactiveButtonClass) {
        if (this._isInputListInvalid(inputList)) {
            submitButton.setAttribute('disabled', 'disabled');
            submitButton.classList.add(inactiveButtonClass);
        } else {
            submitButton.classList.remove(inactiveButtonClass);
            submitButton.removeAttribute('disabled', 'disabled');
        }
    }

    _isInputListInvalid(inputList) {
        return inputList.some((inputItem) => {
            return !inputItem.validity.valid
        })
    }

    _setInputItemVisibility(inputItem, errorElement) {
        if (!inputItem.validity.valid) {
            this._showInputError(inputItem, this._inputErrorClass, errorElement, this._errorClass);
        } else {
            this._hideInputError(inputItem, this._inputErrorClass, errorElement, this._errorClass);
        }
    }

    _setEventListeners(formItem) {
        const inputList = Array.from(formItem.querySelectorAll(this._inputSelector));
        const submitButton = formItem.querySelector(this._submitButtonSelector);

        this._toggleSubmitButton(inputList, submitButton, this._inactiveButtonClass);

        inputList.forEach((inputItem) => {
            const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
            inputItem.addEventListener('input', () => {
                this._setInputItemVisibility(inputItem, errorElement);
                this._toggleSubmitButton(inputList, submitButton, this._inactiveButtonClass);
            })
        })
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formElement));
        formList.forEach((formItem) => {
            formItem.addEventListener('submit', (evt) => {
                evt.preventDefault();
            })
            this._setEventListeners(formItem);
        })
    }
}