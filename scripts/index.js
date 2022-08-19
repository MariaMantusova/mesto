const editButton = document.querySelector('.profile__edit-button');
const popupProfileInfo = document.querySelector('.popup_theme_profile-info');
const form = document.querySelector('.popup__form');
const profileName = document.querySelector('.popup__item_el_name');
const profileJob = document.querySelector('.popup__item_el_job');
const profileNameField = document.querySelector('.profile__name');
const profileJobField = document.querySelector('.profile__description');
const closeButtonProfileInfo = document.querySelector('.popup__button-close_theme_profile-info');
let cards = document.querySelector('.cards');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_theme_add-card');
const closeButtonAddCard = document.querySelector('.popup__button-close_theme_add-card');
const formAddCard = document.querySelector('.popup_theme_add-card');
const cardTitle = document.querySelector('.popup__item_el_title');
const cardImage = document.querySelector('.popup__item_el_image');
const cardTemplate = document.querySelector('#card').content;
const popupThemeImage = document.querySelector('.popup_theme_image');
const closeButtonImage = document.querySelector('.popup__button-close_theme_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function changeInfo(evt) {
    profileNameField.textContent = profileName.value;
    profileJobField.textContent = profileJob.value;

    openOrClosePopupProfileInfo();
    evt.preventDefault();
}

function openOrClosePopupProfileInfo() {
    popupProfileInfo.classList.toggle('popup_opened');

    profileName.value = profileNameField.textContent;
    profileJob.value = profileJobField.textContent;
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(cardsOnPage);

function cardInformation(cardElement, src, title) {
    cardElement.querySelector('.card__image').src = src;
    cardElement.querySelector('.card__image').alt = title;
    cardElement.querySelector('.card__title').textContent = title;


    cardElement.querySelector('.card__like').addEventListener('click', likeCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__image').addEventListener('click', bigImageSrc);
}

function cardsOnPage(card) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cards.append(cardElement);

    cardInformation(cardElement, card.link, card.name)
}

function openOrClosePopupAddCard() {
    popupAddCard.classList.toggle('popup_opened');
}

function openPopupImage(src, figcaption) {

    popupThemeImage.classList.add('popup_opened');
    popupImage.setAttribute('src', src);
    popupCaption.textContent = figcaption;

}

function closePopupImage() {
    popupThemeImage.classList.remove('popup_opened');
}

function bigImageSrc(evt) {
    openPopupImage(evt.target.getAttribute('src'), evt.target.getAttribute('alt'));
}

function addCard(evt) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cards.prepend(cardElement);

    openOrClosePopupAddCard();
    evt.preventDefault();

    cardInformation(cardElement, cardImage.value, cardTitle.value);
}

function deleteCard(evt) {
    const itemElement = evt.target.closest('.card');
    itemElement.remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like_active');
}


editButton.addEventListener('click', openOrClosePopupProfileInfo);
addCardButton.addEventListener('click', openOrClosePopupAddCard);
closeButtonProfileInfo.addEventListener('click', openOrClosePopupProfileInfo);
closeButtonAddCard.addEventListener('click', openOrClosePopupAddCard);
closeButtonImage.addEventListener('click', closePopupImage);
form.addEventListener('submit', changeInfo);
formAddCard.addEventListener('submit', addCard);