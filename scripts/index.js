const main = document.querySelector('.main')
const editButton = main.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.popup__item_el_name');
const profileJob = document.querySelector('.popup__item_el_job');
const profileNameField = main.querySelector('.profile__name');
const profileJobField = main.querySelector('.profile__description');
let cards = main.querySelector('.cards');
const addButton = main.querySelector('.profile__add-button');
const form = document.querySelector('.popup__form');
const cardTemplate = document.querySelector('#card').content;
const popup = document.querySelector('.popup')

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

initialCards.forEach((card) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cards.append(cardElement);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active')
    });
});

function openOrClosePopup() {
    popup.classList.toggle('popup_opened');

    profileName.value = profileNameField.textContent;
    profileJob.value = profileJobField.textContent;
}

function changeInfo(evt) {
    profileNameField.innerHTML = profileName.value;
    profileJobField.innerHTML = profileJob.value;

    openOrClosePopup();
    evt.preventDefault();
}

editButton.addEventListener('click', openOrClosePopup);
closeButton.addEventListener('click', openOrClosePopup);
form.addEventListener('submit', changeInfo);