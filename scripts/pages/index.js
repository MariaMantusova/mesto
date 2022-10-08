import {Card} from '../components/Card.js'
import {initialCards} from '../utils/cards.js'
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";

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
const PopupAddCard = new PopupWithForm(popupAddCard, (evt) => {
    evt.preventDefault();
    addCard.renderItems();
    addCardValidator.disableButton(buttonSubmitAddCard);
    PopupAddCard.close();
});
const PopupProfileInfo = new PopupWithForm(popupProfileInfo, (evt) => {
    evt.preventDefault();
    profileNameField.textContent = profileNameInput.value;
    profileJobField.textContent = profileJobInput.value;
    PopupProfileInfo.close();
});
export const PopupThemeImage = new PopupWithImage(popupThemeImage)

PopupAddCard.setEventListeners();
PopupProfileInfo.setEventListeners();
PopupThemeImage.setEventListeners();

function openPopupProfileInfo() {
    PopupProfileInfo.open();
    initProfileInfo();
}

function closePopupProfileInfo() {
    PopupProfileInfo.close()
}

function openPopupAddCard() {
    PopupAddCard.open();
}

const addCardList = new Section({data: initialCards, renderer: ((item) => {
    const card = new Card(item.name, item.link, '#card', () => {
        PopupThemeImage.open(item.link, item.name);
    });
        const cardElement = card.generateCard();

        addCardList.addItem(cardElement);
    })
}, cards);

addCardList.renderItems();

const addCard = new Section({
    data: [{}], renderer: (() => {
        const card = new Card(cardTitle.value, cardImage.value, '#card', (item) => {
            PopupThemeImage.open(item[0], item[1])
        });
        const cardElement = card.generateCard();

        addCardList.addItem(cardElement);
    })
}, cards);

function closePopupAddCard() {
    PopupAddCard.close();
}

function closePopupImage() {
    PopupThemeImage.close();
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
buttonOpenPopupProfile.addEventListener('click', openPopupProfileInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonClosePopupProfileInfo.addEventListener('click', closePopupProfileInfo);
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
buttonClosePopupImage.addEventListener('click', closePopupImage);