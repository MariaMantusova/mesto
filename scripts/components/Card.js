import {openPopup, popupImage, popupCaption, popupThemeImage} from '../cardHelp.js'

export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._image = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteButtonClick();
        })

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick();
        })
    }

    _handleLikeClick() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleDeleteButtonClick() {
        const itemElement = this._element
        itemElement.remove();
        this._element = null;
    }

    _handleImageClick() {
        popupImage.setAttribute('src', this._image);
        popupImage.setAttribute('alt', this._name)
        popupCaption.textContent = this._name;
        openPopup(popupThemeImage);
    }
}