import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
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
    profilePhotoField,
    buttonConfirmDeleting,
    buttonPopupAvatar,
    profileAvatar,
    submitAddCard,
    submitProfileInfo,
    submitPopupAvatar,
    formEditAvatar
} from '../utils/constants.js';
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const apiOption = {
    url: 'https://nomoreparties.co/v1/cohort-52',
    token: 'de7171b1-a6ca-4de6-b3e1-0107fb201661',
    headers: {
        authorization: 'de7171b1-a6ca-4de6-b3e1-0107fb201661',
        'Content-Type': 'application/json',
    },
}

const api = new Api(apiOption);

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

const changePhotoValidator = new FormValidator({
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
}, formEditAvatar);

function setUserInfo() {
    api.getUserInfo()
        .then((data) => {
            profilePhotoField.src = data.avatar;
            profileJobField.textContent = data.about;
            profileNameField.textContent = data.name;
        })
        .catch((err) => console.log(err));
}

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userJobSelector: '.profile__description'
});

const popupAddCard = new PopupWithForm('.popup_theme_add-card', (inputsValues) => {
    renderLoading(true, submitAddCard);
    api.saveNewCard(inputsValues.name, inputsValues.link)
        .then((card) => {
            cardListAdd.addItem(createCard(inputsValues, card.likes, card.owner._id, card._id));
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, submitAddCard);
        });
    popupAddCard.close();
});

const popupProfileInfo = new PopupWithForm('.popup_theme_profile-info', (inputsValues) => {
    renderLoading(true, submitProfileInfo);
    api.changeUserInfo(inputsValues.name, inputsValues.job)
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about)
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, submitProfileInfo);
        });
    popupProfileInfo.close();
});

const popupProfilePhoto = new PopupWithForm('.popup_theme_edit-photo', (inputsValues) => {
    renderLoading(true, submitPopupAvatar);
    api.changeProfilePhoto(inputsValues.avatar)
        .then((data) => {
            profileAvatar.src = data.avatar
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, submitPopupAvatar);
        });
    popupProfilePhoto.close();
});

const popupThemeImage = new PopupWithImage('.popup_theme_image');
const popupConfirmDeleting = new PopupWithConfirmation('.popup_theme_confirm', api);

function openPopupProfileInfo() {
    popupProfileInfo.open();
    popupProfileInfo.setEventListeners();
    initProfileInfo();
    profileInfoValidator.resetValidation();
}

function openPopupAddCard() {
    popupAddCard.open();
    popupAddCard.setEventListeners();
    addCardValidator.resetValidation();
}

function openPopupChangeAvatar() {
    popupProfilePhoto.open();
    popupProfilePhoto.setEventListeners();
    changePhotoValidator.resetValidation();
}

let ownerId;

api.getUserInfo()
    .then((data) => {
        ownerId = data._id
    })
    .catch((err) => console.log(err));

let cardListAdd;

api.getCards()
    .then((cards) => {
        cardListAdd = newSection(cards);
        cardListAdd.renderItems();
    })
    .catch((err) => console.log(err));

function newSection(cards) {
    return new Section({
        data: cards, renderer: ((item) => {
            cardListAdd.addItem(createCard(item, item.likes, item.owner._id, item._id));
        })
    }, '.cards');
}

function createCard(item, likes, userId, cardId) {
    const card = new Card(item, likes, '#card', ownerId, userId, cardId, api,
        () => {
            popupThemeImage.open(item.name, item.link);
        });
    card.setHandleTrashButtonClick(() => {
        buttonConfirmDeleting.removeAttribute('disabled');
        popupConfirmDeleting.open(card);
    })

    return card.generateCard();
}

function initProfileInfo() {
    const info = userInfo.getUserInfo();
    profileNameInput.value = info.name;
    profileJobInput.value = info.job;
}

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранено';
    }
}

function initValidation() {
    addCardValidator.enableValidation();
    profileInfoValidator.enableValidation();
    changePhotoValidator.enableValidation();
}

setUserInfo();
initValidation();
popupThemeImage.setEventListeners();
popupConfirmDeleting.setEventListeners();
buttonOpenPopupProfile.addEventListener('click', openPopupProfileInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonPopupAvatar.addEventListener('click', openPopupChangeAvatar);