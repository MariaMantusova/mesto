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
const cardTemplate = document.querySelector('#card').content;
const popupThemeImage = document.querySelector('.popup_theme_image');
const closeButtonPopupImage = document.querySelector('.popup__button-close_theme_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function changeProfileInfo(evt) {
    evt.preventDefault();
    profileNameField.textContent = profileNameInput.value;
    profileJobField.textContent = profileJobInput.value;

    closePopup(popupProfileInfo);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


function openPopupProfileInfo() {
    openPopup(popupProfileInfo);

    profileNameInput.value = profileNameField.textContent;
    profileJobInput.value = profileJobField.textContent;
}

initialCards.forEach(addCard);

function cardInformation(cardElement, src, title) {
    cardElement.querySelector('.card__image').src = src;
    cardElement.querySelector('.card__image').alt = title;
    cardElement.querySelector('.card__title').textContent = title;


    cardElement.querySelector('.card__like').addEventListener('click', likeCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__image').addEventListener('click', openBigImageListener);
}

function addCard(card) {
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

function openBigImageListener(evt) {
    openPopupImage(evt.target.getAttribute('src'), evt.target.getAttribute('alt'));
}

function submitAddCard(evt) {
    evt.preventDefault();
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cards.prepend(cardElement);

    openOrClosePopupAddCard();

    cardInformation(cardElement, cardImage.value, cardTitle.value);
}

function deleteCard(evt) {
    const itemElement = evt.target.closest('.card');
    itemElement.remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like_active');
}


editProfileButton.addEventListener('click', openPopupProfileInfo);
addCardButton.addEventListener('click', openOrClosePopupAddCard);
closeButtonPopupProfileInfo.addEventListener('click', closePopupProfileInfo);
closeButtonPopupAddCard.addEventListener('click', openOrClosePopupAddCard);
closeButtonPopupImage.addEventListener('click', closePopupImage);
formProfileInfo.addEventListener('submit', changeProfileInfo);
formAddCard.addEventListener('submit', submitAddCard);