import {Card} from '../components/Card.js'
import {initialCards} from '../utils/cards.js'
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

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
const PopupAddCard = new Popup(popupAddCard);
const PopupProfileInfo = new Popup(popupProfileInfo);
export const PopupThemeImage = new PopupWithImage(popupThemeImage)

function openPopupProfileInfo() {
    PopupProfileInfo.open();
    initProfileInfo();
}

function changeProfileInfo(evt) {
    evt.preventDefault();
    profileNameField.textContent = profileNameInput.value;
    profileJobField.textContent = profileJobInput.value;

    PopupProfileInfo.close();
}

function closePopupProfileInfo() {
    PopupProfileInfo.close()
}

function openPopupAddCard() {
    PopupAddCard.open();
}

const addCardList = new Section({data: initialCards, renderer: ((item) => {
    const card = new Card(item.name, item.link, '#card');
        const cardElement = card.generateCard();

        addCardList.addItem(cardElement);
    })
}, cards);

addCardList.renderItems();

const addCard = new Section({
    data: [{}], renderer: (() => {
        const card = new Card(cardTitle.value, cardImage.value, '#card');
        const cardElement = card.generateCard();

        addCardList.addItem(cardElement);
    })
}, cards);

function submitAddCard(evt) {
    evt.preventDefault();
    addCard.renderItems();
    evt.target.reset();
    addCardValidator.disableButton(buttonSubmitAddCard);
    closePopupAddCard();
}

function closePopupAddCard() {
    PopupAddCard.close();
}

function closePopupImage() {
    PopupThemeImage.close();
}

function initPopupsClosers() {
    const popupsList = Array.from(document.querySelectorAll('.popup'));

    popupsList.forEach((popup) => {
        new Popup(popup).setEventListeners();
    });
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