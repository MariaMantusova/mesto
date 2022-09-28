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
    }

    _handleImageClick() {
        document.querySelector('.popup_theme_image').classList.add('popup_opened');
        this._handleEscapeClick()
        document.querySelector('.popup__image').setAttribute('src', this._image);
        document.querySelector('.popup__image').setAttribute('alt', this._name)
        document.querySelector('.popup__caption').textContent = this._name;
    }

    _handleEscapeClick() {
        document.querySelector('.popup_theme_image').classList.contains('popup_opened')
        ? document.addEventListener('keydown', this._closingByEscape)
            : document.removeEventListener('keydown', this._closingByEscape);
    }

    _closingByEscape(evt) {
        if (evt.key === 'Escape') {
            document.querySelector('.popup_theme_image').classList.remove('popup_opened')
        }
    }
}