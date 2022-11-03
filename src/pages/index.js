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

const configValidator = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
}

const api = new Api(apiOption);

const profileInfoValidator = new FormValidator(configValidator, formProfileInfo);

const addCardValidator = new FormValidator(configValidator, formAddCard);

const changePhotoValidator = new FormValidator(configValidator, formEditAvatar);

const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userJobSelector: '.profile__description'
});

const popupAddCard = new PopupWithForm('.popup_theme_add-card', (inputsValues) => {
    renderLoading(true, submitAddCard);
    api.saveNewCard(inputsValues.name, inputsValues.link)
        .then((card) => {
            cardListAdd.addItem(createCard(inputsValues, card.likes, card.owner._id, card._id));
            renderLoading(false, submitAddCard);
            closePopup(submitAddCard, popupAddCard);
        })
        .catch(() => {
            errorWhileLoading(submitAddCard);
        })
});

const changeInfo = (name, job) => {
    api.changeUserInfo(name, job)
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about);
            renderLoading(false, submitProfileInfo);
            closePopup(submitProfileInfo, popupProfileInfo);
        })
        .catch(() => {
            errorWhileLoading(submitProfileInfo);
        })
}

const changePhoto = (avatar) => {
    api.changeProfilePhoto(avatar)
        .then((data) => {
            profileAvatar.src = data.avatar;
            renderLoading(false, submitPopupAvatar);
            closePopup(submitPopupAvatar, popupProfilePhoto);
        })
        .catch(() => {
            errorWhileLoading(submitPopupAvatar);
        })
}

let ownerId;

Promise.all([api.getUserInfo(), api.getCards()])
    .then((values) => {
        const userInfo = values[0];
        profilePhotoField.src = userInfo.avatar;
        profileJobField.textContent = userInfo.about;
        profileNameField.textContent = userInfo.name;
        ownerId = userInfo._id

        const cards = values[1];
        cardListAdd = newSection(cards);
        cardListAdd.renderItems();
    })
    .catch((err) => console.log(err))

const popupProfileInfo = new PopupWithForm('.popup_theme_profile-info', (inputsValues) => {
    renderLoading(true, submitProfileInfo);
    changeInfo(inputsValues.name, inputsValues.job);
});

const popupProfilePhoto = new PopupWithForm('.popup_theme_edit-photo', (inputsValues) => {
    renderLoading(true, submitPopupAvatar);
    changePhoto(inputsValues.avatar);
});

const popupThemeImage = new PopupWithImage('.popup_theme_image');
const popupConfirmDeleting = new PopupWithConfirmation('.popup_theme_confirm');

popupConfirmDeleting.setEventListener();

popupProfileInfo.setEventListeners();
popupAddCard.setEventListeners();
popupProfilePhoto.setEventListeners();

function openPopupProfileInfo() {
    popupProfileInfo.addButtonText();
    initProfileInfo();
    profileInfoValidator.resetValidation();
    popupProfileInfo.open();
}

function openPopupAddCard() {
    popupAddCard.addButtonText()
    addCardValidator.resetValidation();
    popupAddCard.open();
}

function openPopupChangeAvatar() {
    popupProfilePhoto.addButtonText();
    changePhotoValidator.resetValidation();
    popupProfilePhoto.open();
}

let cardListAdd;

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
        },
        (likeButton, cardElement) => {
            api.addLike(cardId)
                .then((card) => {
                    likeButton.classList.add('card__like_active');
                    cardElement.querySelector('.card__like_sum').textContent = card.likes.length;
                })
                .catch((err) => console.log(err));
        },
        (likeButton, cardElement) => {
            api.deleteLike(cardId)
                .then((card) => {
                    likeButton.classList.remove('card__like_active');
                    cardElement.querySelector('.card__like_sum').textContent = card.likes.length;
                })
                .catch((err) => console.log(err));
        });

    card.setHandleTrashButtonClick(() => {
        buttonConfirmDeleting.removeAttribute('disabled');
        buttonConfirmDeleting.textContent = 'Сохранить';
        popupConfirmDeleting.open();
        popupConfirmDeleting.setSubmitAction(() => {
            buttonConfirmDeleting.setAttribute('disabled', '')
            api.deleteCard(card._id)
                .then(() => {
                    card.remove();
                    popupConfirmDeleting.close();
                })
                .catch(() => {
                    errorWhileLoading(buttonConfirmDeleting);
                })
        })
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

function closePopup(button, popup) {
    if (button.textContent === 'Сохранено') {
        popup.close();
    }
}

function errorWhileLoading (button) {
    button.textContent = 'Ошибка при сохранении';
}

function initValidation() {
    addCardValidator.enableValidation();
    profileInfoValidator.enableValidation();
    changePhotoValidator.enableValidation();
}

initValidation();
popupThemeImage.setEventListeners();
popupConfirmDeleting.setEventListeners();
buttonOpenPopupProfile.addEventListener('click', openPopupProfileInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonPopupAvatar.addEventListener('click', openPopupChangeAvatar);