export default class Card {
    constructor(cardElement, likes, templateSelector, ownerId, userId, id, api, handleCardClick, handleAddLike, handleRemoveLike) {
        this._name = cardElement.name;
        this._image = cardElement.link;
        this._userId = userId;
        this._id = id;
        this._ownerId = ownerId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._likes = likes;
        this._api = api;
        this._cardElement = cardElement;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
    }

    setHandleTrashButtonClick(_handleTrashButtonClick) {
        this._handleTrashButtonClick = _handleTrashButtonClick;
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
        if (this._checkIfIsLiked()) {
            this._likeButton.classList.add('card__like_active');
        }
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

    _checkIfIsLiked() {
        return this._likes.some((like) => {
            return like._id === this._ownerId;
        })
    }

    _checkIfIsOwner() {
        if (this._userId !== this._ownerId) {
            this._element.querySelector('.card__delete-button').setAttribute('disable', 'disable');
            this._element.querySelector('.card__delete-button').classList.add('card__delete-button_inactive');
        }
    }

    _handleLikeClick() {
        if (this._likeButton.classList.contains('card__like_active')) {
            this._removeLike();
        } else {
            this._addLike();
        }
    }

    setLikesSum(data) {
        this._element.querySelector('.card__like_sum').textContent = data.likes.length
    }

    addLike() {
        this._likeButton.classList.add('card__like_active');
    }

    removeLike() {
        this._likeButton.classList.remove('card__like_active');
    }

    _addLike() {
        this._handleAddLike();
    }

    _removeLike() {
        this._handleRemoveLike();
    }

    _handleDeleteButtonClick() {
        this._handleTrashButtonClick();
    }

    _handleImageClick() {
        this._handleCardClick();
    }

    remove() {
        this._element.remove();
        this._element = null;
    }
}