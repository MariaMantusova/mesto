export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        })
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        })
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(this._popupSelector);
        }
    }

    _closeByBackground(evt) {
        if (this._popupSelector.classList.contains('popup_opened') && evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__button-close').addEventListener('click', () => {
            this.close()
        });
        this._popupSelector.addEventListener('click', (evt) => {
            this._closeByBackground(evt)
        });

    }
}