function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formItem) => {
        formItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formItem, config);
    })
}

function showInputError(inputElement, errorInputClass, errorSpan, errorSpanClass) {
    inputElement.classList.add(errorInputClass);
    errorSpan.textContent = inputElement.validationMessage;
    errorSpan.classList.add(errorSpanClass);
}

function hideInputError(inputElement, errorInputClass, errorSpan, errorSpanClass) {
    inputElement.classList.remove(errorInputClass);
    errorSpan.classList.remove(errorSpanClass);
    errorSpan.textContent = '';
}

function toggleSubmitButton(inputList, submitButton, inactiveButtonClass) {
    if (isInputListInvalid(inputList)) {
        submitButton.setAttribute('disabled', 'disabled');
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.removeAttribute('disabled', 'disabled');
    }
}

function isInputListInvalid(inputList) {
    return inputList.some((inputItem) => {
        return !inputItem.validity.valid
    })
}
function setInputItemVisibility(inputItem, errorElement, config) {
    if (!inputItem.validity.valid) {
        showInputError(inputItem, config.inputErrorClass, errorElement, config.errorClass);
    } else {
        hideInputError(inputItem, config.inputErrorClass, errorElement, config.errorClass);
    }
}

function setEventListeners(formItem, config) {
    const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
    const submitButton = formItem.querySelector(config.submitButtonSelector);

    toggleSubmitButton(inputList, submitButton, config.inactiveButtonClass);

    inputList.forEach((inputItem) => {
        const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
        inputItem.addEventListener('input', () => {
            setInputItemVisibility(inputItem, errorElement, config);
            toggleSubmitButton(inputList, submitButton,config.inactiveButtonClass);
        })
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
});
