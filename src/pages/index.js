import './index.css';
import Card from '../components/Card.js'
import {initialCards} from '../utils/cards.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    buttonOpenPopupProfile,
    formProfileInfo,
    formAddCard,
    profileJobInput,
    profileNameInput,
    buttonAddCard
} from '../utils/constants.js'


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

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userJobSelector: '.profile__description'
});

const popupAddCard = new PopupWithForm('.popup_theme_add-card', (inputsValues) => {
    cardListAdd.addItem(createCard(inputsValues))
    popupAddCard.close();
});

const popupProfileInfo = new PopupWithForm('.popup_theme_profile-info', (inputsValues) => {
    userInfo.setUserInfo(inputsValues.name, inputsValues.job);
    popupProfileInfo.close();
});

const popupThemeImage = new PopupWithImage('.popup_theme_image');

popupAddCard.setEventListeners();
popupProfileInfo.setEventListeners();
popupThemeImage.setEventListeners();

function openPopupProfileInfo() {
    popupProfileInfo.open();
    initProfileInfo();
}

function openPopupAddCard() {
    popupAddCard.open();
    addCardValidator.disableButton();
}

function createCard(item) {
    const card = new Card(item.title, item.image, '#card', () => {
        popupThemeImage.open(item.title, item.image);
    });

    return card.generateCard();
}

const cardListAdd = new Section({
    data: initialCards, renderer: ((item) => {

        cardListAdd.addItem(createCard(item));
    })
}, '.cards');

cardListAdd.renderItems();

function initProfileInfo() {
    const info = userInfo.getUserInfo();
    profileNameInput.value = info.name;
    profileJobInput.value = info.job;
}

function initValidation() {
    addCardValidator.enableValidation();
    profileInfoValidator.enableValidation();
}

initProfileInfo(); // Эта функция вызывается с открытием страницы для того чтобы кнопка становилась активной при первом открытии popupProfileInfo, если это убрать, она будет не активна
initValidation();
buttonOpenPopupProfile.addEventListener('click', openPopupProfileInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);