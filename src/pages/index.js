import './index.css';
import Card from '../components/Card.js'
import {initialCards} from '../utils/cards.js'
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    buttonOpenPopupProfile,
    cardImage,
    cardTitle,
    formProfileInfo,
    formAddCard,
    profileJobInput,
    profileNameInput,
    buttonAddCard,
    buttonClosePopupAddCard,
    buttonClosePopupImage,
    buttonClosePopupProfileInfo
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

const popupAddCard = new PopupWithForm('.popup_theme_add-card', () => {
    addCard().renderItems();
    addCardValidator.disableButton();
    popupAddCard.close();
});

const popupProfileInfo = new PopupWithForm('.popup_theme_profile-info', () => {
    userInfo.setUserInfo(profileNameInput.value, profileJobInput.value);
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

function closePopupProfileInfo() {
    popupProfileInfo.close()
}

function openPopupAddCard() {
    popupAddCard.open();
}

const addCardList = new Section({data: initialCards, renderer: ((item) => {
    const card = new Card(item.name, item.link, '#card', () => {
        popupThemeImage.open(item.link, item.name);
    });
        const cardElement = card.generateCard();

        addCardList.addItem(cardElement);
    })
}, '.cards');

addCardList.renderItems();

function addCard() {
    return new Section({
        data: [{name: cardTitle.value,
            link: cardImage.value}], renderer: ((item) => {
            const card = new Card(item.name, item.link, '#card', () => {
                popupThemeImage.open(item.link, item.name);
            });
            const cardElement = card.generateCard();

            addCardList.addItem(cardElement);
        })
    }, '.cards');
}

function closePopupAddCard() {
    popupAddCard.close();
}

function closePopupImage() {
    popupThemeImage.close();
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

initProfileInfo();
initValidation();
buttonOpenPopupProfile.addEventListener('click', openPopupProfileInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonClosePopupProfileInfo.addEventListener('click', closePopupProfileInfo);
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
buttonClosePopupImage.addEventListener('click', closePopupImage);