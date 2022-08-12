let main = document.querySelector('.main')
let editButton = main.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__button-close');
let profileName = popup.querySelector('.popup__item_el_name');
let profileJob = popup.querySelector('.popup__item_el_job');
let profileNameField = main.querySelector('.profile__name');
let profileJobField = main.querySelector('.profile__description');
let form = popup.querySelector('.popup__form');

function openPopup() {
    popup.classList.add('popup_opened');
    profileName.value = profileNameField.textContent;
    profileJob.value =profileJobField.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function changeInfo(evt) {
    profileNameField.innerHTML = profileName.value;
    profileJobField.innerHTML = profileJob.value;

    closePopup();
    evt.preventDefault();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', changeInfo);