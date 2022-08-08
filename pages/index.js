let main = document.querySelector('.main')
let editButton = main.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__button-close');
let profileInfo = main.querySelector('.profile__info')
let saveButton = popup.querySelector('.popup__button');

popup.classList.remove('popup_opened');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function changeInfo() {
    let profileName = popup.querySelector('.popup__item_el_name');
    let profileJob = popup.querySelector('.popup__item_el_job');
    let profileNameField = main.querySelector('.profile__name');
    let profileJobField = main.querySelector('.profile__description');

    profileNameField.innerHTML = profileName.value;
    profileJobField.innerHTML = profileJob.value;

    closePopup();

    profileName.value = '';
    profileJob.value = '';
}

saveButton.addEventListener('click', changeInfo);



