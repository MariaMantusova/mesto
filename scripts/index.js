import { Card } from './Card.js'
import { initialCards } from './cards.js'

const editProfileButton = document.querySelector('.profile__edit-button');
const popupProfileInfo = document.querySelector('.popup_theme_profile-info');
const formProfileInfo = document.querySelector('.popup__form_theme_profile-info');
const profileNameInput = document.querySelector('.popup__item_el_name');
const profileJobInput = document.querySelector('.popup__item_el_job');
const profileNameField = document.querySelector('.profile__name');
const profileJobField = document.querySelector('.profile__description');
const closeButtonPopupProfileInfo = document.querySelector('.popup__button-close_theme_profile-info');
const cards = document.querySelector('.cards');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_theme_add-card');
const closeButtonPopupAddCard = document.querySelector('.popup__button-close_theme_add-card');
const formAddCard = document.querySelector('.popup_theme_add-card');
const cardTitle = document.querySelector('.popup__item_el_title');
const cardImage = document.querySelector('.popup__item_el_image');
const popupThemeImage = document.querySelector('.popup_theme_image');
const closeButtonPopupImage = document.querySelector('.popup__button-close_theme_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const submitButtonAddCard = popupAddCard.querySelector('.popup__button');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

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

function addCard(card) {
    cards.prepend(new Card(card.name, card.link, '#card').generateCard());
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
    disableButton(submitButtonAddCard);
    closePopupAddCard();
}

function disableButton(submitButton) {
    submitButton.classList.add('popup__button_disabled');
    submitButton.setAttribute('disabled', 'disabled');
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

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function initProfileInfo() {
    profileNameInput.value = profileNameField.textContent;
    profileJobInput.value = profileJobField.textContent;
}

initProfileInfo();
initPopupsClosers();
editProfileButton.addEventListener('click', openPopupProfileInfo);
addCardButton.addEventListener('click', openPopupAddCard);
closeButtonPopupProfileInfo.addEventListener('click', closePopupProfileInfo);
closeButtonPopupAddCard.addEventListener('click', closePopupAddCard);
closeButtonPopupImage.addEventListener('click', closePopupImage);
formProfileInfo.addEventListener('submit', changeProfileInfo);
formAddCard.addEventListener('submit', submitAddCard);