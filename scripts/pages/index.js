import {Card} from '../components/Card.js'
import {initialCards} from '../utils/cards.js'
import {FormValidator} from '../components/FormValidator.js'
import {openPopup, closePopup} from '../cardHelp.js'

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupProfileInfo = document.querySelector('.popup_theme_profile-info');
const formProfileInfo = document.querySelector('.popup__form_theme_profile-info');
const profileNameInput = document.querySelector('.popup__item_el_name');
const profileJobInput = document.querySelector('.popup__item_el_job');
const profileNameField = document.querySelector('.profile__name');
const profileJobField = document.querySelector('.profile__description');
const buttonClosePopupProfileInfo = document.querySelector('.popup__button-close_theme_profile-info');
const cards = document.querySelector('.cards');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_theme_add-card');
const buttonClosePopupAddCard = document.querySelector('.popup__button-close_theme_add-card');
const formAddCard = document.querySelector('.popup_theme_add-card');
const cardTitle = document.querySelector('.popup__item_el_title');
const cardImage = document.querySelector('.popup__item_el_image');
const popupThemeImage = document.querySelector('.popup_theme_image');
const buttonClosePopupImage = document.querySelector('.popup__button-close_theme_image');
const buttonSubmitAddCard = popupAddCard.querySelector('.popup__button');
const profileInfoValidator = new FormValidator({
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
}, formProfileInfo);
const addCardValidator = new FormValidator({
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
}, formAddCard);

function openPopupProfileInfo() {
    openPopup(popupProfileInfo);
    initProfileInfo();
}

function changeProfileInfo(evt) {
    evt.preventDefault();
    profileNameField.textContent = profileNameInput.value;
    profileJobField.textContent = profileJobInput.value;

    closePopup(popupProfileInfo);
}

function closePopupProfileInfo() {
    closePopup(popupProfileInfo);
}

function openPopupAddCard() {
    openPopup(popupAddCard);
}

function createCard(name, link, templateSelector) {
    return new Card(name, link, templateSelector).generateCard()
}

function addCard(card) {
    cards.prepend(createCard(card.name, card.link, '#card'));
}

initialCards.forEach((card) => {
    addCard({
        name: card.name,
        link: card.link
    })
})

function submitAddCard(evt) {
    evt.preventDefault();
    addCard({
        link: cardImage.value,
        name: cardTitle.value
    });
    evt.target.reset();
    addCardValidator.disableButton(buttonSubmitAddCard);
    closePopupAddCard();
}

function closePopupAddCard() {
    closePopup(popupAddCard);
}

function closePopupImage() {
    closePopup(popupThemeImage);
}

function initPopupsClosers() {
    const popupsList = Array.from(document.querySelectorAll('.popup'));

    popupsList.forEach(addPopupCloserByBackground);
}

function addPopupCloserByBackground(popup) {
    popup.addEventListener('click', (evt) => {
        if (popup.classList.contains('popup_opened') && evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
}

function initProfileInfo() {
    profileNameInput.value = profileNameField.textContent;
    profileJobInput.value = profileJobField.textContent;
}

function initValidation() {
    addCardValidator.enableValidation();
    profileInfoValidator.enableValidation();
}

initProfileInfo();
initValidation();
initPopupsClosers();
buttonOpenPopupProfile.addEventListener('click', openPopupProfileInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonClosePopupProfileInfo.addEventListener('click', closePopupProfileInfo);
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
buttonClosePopupImage.addEventListener('click', closePopupImage);
formProfileInfo.addEventListener('submit', changeProfileInfo);
formAddCard.addEventListener('submit', submitAddCard);