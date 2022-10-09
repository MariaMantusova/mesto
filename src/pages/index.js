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
    cards,
    popupAddCard,
    profileJobField,
    profileNameField,
    popupThemeImage,
    popupProfileInfo,
    buttonSubmitAddCard,
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
    userName: profileNameField,
    userJob: profileJobField
});

const PopupAddCard = new PopupWithForm(popupAddCard, (evt) => {
    evt.preventDefault();
    addCard().renderItems();
    addCardValidator.disableButton(buttonSubmitAddCard);
    PopupAddCard.close();
});

const PopupProfileInfo = new PopupWithForm(popupProfileInfo, (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(profileNameInput.value, profileJobInput.value);
    PopupProfileInfo.close();
});

const PopupThemeImage = new PopupWithImage(popupThemeImage);

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

function addCard() {
    return new Section({
        data: [{name: cardTitle.value,
            link: cardImage.value}], renderer: ((item) => {
            const card = new Card(item.name, item.link, '#card', () => {
                PopupThemeImage.open(item.link, item.name);
            });
            const cardElement = card.generateCard();

            addCardList.addItem(cardElement);
        })
    }, cards);
}

function closePopupAddCard() {
    PopupAddCard.close();
}

function closePopupImage() {
    PopupThemeImage.close();
}

function initProfileInfo() {
    const info = userInfo.getUserInfo();
    profileNameInput.value = info.name.textContent;
    profileJobInput.value = info.job.textContent;
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