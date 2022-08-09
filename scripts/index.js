let main = document.querySelector('.main')
let editButton = main.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__button-close');
let saveButton = popup.querySelector('.popup__button');
let profileName = popup.querySelector('.popup__item_el_name');
let profileJob = popup.querySelector('.popup__item_el_job');
let profileNameField = main.querySelector('.profile__name');
let profileJobField = main.querySelector('.profile__description');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function changeInfo() {
    profileNameField.innerHTML = profileName.value;
    profileJobField.innerHTML = profileJob.value;

    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', changeInfo);



