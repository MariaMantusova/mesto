export default class Card {
    constructor(cardElement, likes, templateSelector, userId, handleCardClick, _handleTrashButtonClick) {
        this._name = cardElement.name;
        this._image = cardElement.link;
        this._userId = userId
        this._ownerId = cardElement.owner._id
        this._handleTrashButtonClick = _handleTrashButtonClick ;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._likes = likes
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
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like');
        this._setEventListeners();

        this._cardImage.src = this._image;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__like_sum').textContent = this._likes.length;
        this._checkIfIsOwner();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteButtonClick();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleImageClick();
        })
    }

    _checkIfIsOwner() {
        if (this._userId !== this._ownerId) {
            this._element.querySelector('.card__delete-button').setAttribute('disable', 'disable');
            this._element.querySelector('.card__delete-button').classList.add('card__delete-button_inactive');
        }
    }

    _handleLikeClick() {
        this._handleLikesSum()
        this._likeButton.classList.toggle('card__like_active');
    }

    _handleLikesSum() {
        this._element.querySelector('.card__like_sum').textContent = this._likes.length + 1;
    }

    _handleDeleteButtonClick() {
        this._handleTrashButtonClick();
    }

    _handleImageClick() {
        this._handleCardClick();
    }
}

// this._element.remove();
// this._element = null;