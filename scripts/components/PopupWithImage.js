import Popup from './Popup.js';
import {popupImage, popupCaption} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(image, name) {
        popupImage.setAttribute('src', image);
        popupImage.setAttribute('alt', name)
        popupCaption.textContent = name;
        super.open();
    }

}