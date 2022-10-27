import './index.css';
import Card from '../components/Card.js'
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
    buttonAddCard,
    profileNameField,
    profileJobField,
    profilePhotoField
} from '../utils/constants.js';
import Api from "../components/Api.js";
import Popup from "../components/Popup";

const apiOptionUserInfo = {
    url: 'https://nomoreparties.co/v1/cohort-52/users/me',
    token: 'de7171b1-a6ca-4de6-b3e1-0107fb201661',
    headers: {
        authorization: 'de7171b1-a6ca-4de6-b3e1-0107fb201661',
        'Content-Type': 'application/json',
    },
}

const apiOptionCards = {
    url: 'https://nomoreparties.co/v1/cohort-52//cards',
    token: 'de7171b1-a6ca-4de6-b3e1-0107fb201661',
    headers: {
        authorization: 'de7171b1-a6ca-4de6-b3e1-0107fb201661',
        'Content-Type': 'application/json',
    },
}

const apiUserInfo = new Api(apiOptionUserInfo);
const apiCards = new Api(apiOptionCards);

function setUserInfo() {
    apiUserInfo.getUserInfo().then((data) => {
        profilePhotoField.src = data.avatar;
        profileJobField.textContent = data.about;
        profileNameField.textContent = data.name;
    })
}

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
    apiCards.saveNewCard(inputsValues.name, inputsValues.link).then(() => {});
    cardListAdd.addItem(createCard(inputsValues, []));
    popupAddCard.close();
});

const popupProfileInfo = new PopupWithForm('.popup_theme_profile-info', (inputsValues) => {
    apiUserInfo.changeUserInfo(inputsValues.name, inputsValues.job).then(() => {});
    userInfo.setUserInfo(inputsValues.name, inputsValues.job);
    popupProfileInfo.close();
});

const popupThemeImage = new PopupWithImage('.popup_theme_image');
const popupConfirmDeleting = new Popup('.popup_theme_confirm');

popupAddCard.setEventListeners();
popupProfileInfo.setEventListeners();
popupThemeImage.setEventListeners();
popupConfirmDeleting.setEventListeners();

function openPopupProfileInfo() {
    popupProfileInfo.open();
    initProfileInfo();
    profileInfoValidator.resetValidation()
}

function openPopupAddCard() {
    popupAddCard.open();
    addCardValidator.resetValidation()
}

function createCard(item, likes) {
    const card = new Card(item, likes, '#card',
        () => {
            popupThemeImage.open(item.name, item.link);
        },
        () => {
            popupConfirmDeleting.open();
        });

    return card.generateCard();
}
let cardListAdd;

apiCards.getCards().then((cards) => {
    cardListAdd = newSection(cards)
    cardListAdd.renderItems();
})

function newSection(cards) {
    return new Section({
        data: cards, renderer: ((item) => {

            cardListAdd.addItem(createCard(item, item.likes));
        })
    }, '.cards');
}

function initProfileInfo() {
    const info = userInfo.getUserInfo();
    profileNameInput.value = info.name;
    profileJobInput.value = info.job;
}

function initValidation() {
    addCardValidator.enableValidation();
    profileInfoValidator.enableValidation();
}

setUserInfo();
initValidation();
buttonOpenPopupProfile.addEventListener('click', openPopupProfileInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);