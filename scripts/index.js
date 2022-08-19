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
        name: 'Букет цветов',
        link: 'https://images.unsplash.com/photo-1660873056543-0395ff5b918a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80'
    },
    {
        name: 'Ламы',
        link: 'https://images.unsplash.com/photo-1660878561965-b8ce1342c507?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
        name: 'Ретро авто',
        link: 'https://images.unsplash.com/photo-1660888414951-4639f2641aee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
        name: 'Завтрак',
        link: 'https://images.unsplash.com/photo-1660744562389-57bf4544afe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
        name: 'Дом на колесах',
        link: 'https://images.unsplash.com/photo-1660704897097-6b30e802505c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
        name: 'Mope',
        link: 'https://images.unsplash.com/photo-1660864254373-f9e29374f5df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
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