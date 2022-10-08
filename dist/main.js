(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e,this._image=n,this._templateSelector=r,this._handleCardClick=o}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._setEventListeners(),this._element.querySelector(".card__image").src=this._image,this._element.querySelector(".card__image").alt=this._name,this._element.querySelector(".card__title").textContent=this._name,this._element}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__like").addEventListener("click",(function(){e._handleLikeClick()})),this._element.querySelector(".card__delete-button").addEventListener("click",(function(){e._handleDeleteButtonClick()})),this._element.querySelector(".card__image").addEventListener("click",(function(){e._handleImageClick()}))}},{key:"_handleLikeClick",value:function(){this._element.querySelector(".card__like").classList.toggle("card__like_active")}},{key:"_handleDeleteButtonClick",value:function(){this._element.remove(),this._element=null}},{key:"_handleImageClick",value:function(){this._handleCardClick()}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e,t,n,r){e.classList.add(t),n.textContent=e.validationMessage,n.classList.add(r)}},{key:"_hideInputError",value:function(e,t,n,r){e.classList.remove(t),n.classList.remove(r),n.textContent=""}},{key:"disableButton",value:function(e){e.setAttribute("disabled","disabled"),e.classList.add(this._inactiveButtonClass)}},{key:"_toggleSubmitButton",value:function(e,t,n){this._isInputListInvalid(e)?this.disableButton(t):(t.classList.remove(n),t.removeAttribute("disabled","disabled"))}},{key:"_isInputListInvalid",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_setInputItemVisibility",value:function(e,t){e.validity.valid?this._hideInputError(e,this._inputErrorClass,t,this._errorClass):this._showInputError(e,this._inputErrorClass,t,this._errorClass)}},{key:"_setEventListeners",value:function(){var e=this,t=Array.from(this._formElement.querySelectorAll(this._inputSelector)),n=this._formElement.querySelector(this._submitButtonSelector);this._toggleSubmitButton(t,n,this._inactiveButtonClass),t.forEach((function(r){var o=e._formElement.querySelector(".".concat(r.id,"-error"));r.addEventListener("input",(function(){e._setInputItemVisibility(r,o),e._toggleSubmitButton(t,n,e._inactiveButtonClass)}))}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.data,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._container=n,this._renderer=o}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){return e._renderer(t)}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=t}var t,n;return t=e,(n=[{key:"open",value:function(){var e=this;this._popupSelector.classList.add("popup_opened"),document.addEventListener("keydown",(function(t){e._handleEscClose(t)}))}},{key:"close",value:function(){var e=this;this._popupSelector.classList.remove("popup_opened"),document.removeEventListener("keydown",(function(t){e._handleEscClose(t)}))}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close(this._popupSelector)}},{key:"_closeByBackground",value:function(e){this._popupSelector.classList.contains("popup_opened")&&e.target===e.currentTarget&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupSelector.querySelector(".popup__button-close").addEventListener("click",(function(){e.close()})),this._popupSelector.addEventListener("click",(function(t){e._closeByBackground(t)}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),a=document.querySelector(".popup__image"),l=document.querySelector(".popup__caption"),s=document.querySelector(".profile__edit-button"),p=document.querySelector(".popup_theme_profile-info"),f=document.querySelector(".popup__form_theme_profile-info"),_=document.querySelector(".popup__item_el_name"),d=document.querySelector(".popup__item_el_job"),y=document.querySelector(".profile__name"),m=document.querySelector(".profile__description"),h=document.querySelector(".popup__button-close_theme_profile-info"),b=document.querySelector(".cards"),v=document.querySelector(".profile__add-button"),w=document.querySelector(".popup_theme_add-card"),k=document.querySelector(".popup__button-close_theme_add-card"),S=document.querySelector(".popup_theme_add-card"),g=document.querySelector(".popup__item_el_title"),E=document.querySelector(".popup__item_el_image"),C=document.querySelector(".popup_theme_image"),x=document.querySelector(".popup__button-close_theme_image"),O=w.querySelector(".popup__button");function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function B(){return B="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=L(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},B.apply(this,arguments)}function L(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=D(e)););return e}function P(e,t){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},P(e,t)}function I(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},D(e)}var M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=D(r);if(o){var n=D(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function u(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),i.call(this,e)}return t=u,(n=[{key:"open",value:function(e,t){a.setAttribute("src",e),a.setAttribute("alt",t),l.textContent=t,B(D(u.prototype),"open",this).call(this)}}])&&q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(c);function H(e){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},H(e)}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function A(){return A="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=T(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},A.apply(this,arguments)}function T(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=N(e)););return e}function G(e,t){return G=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},G(e,t)}function V(e,t){if(t&&("object"===H(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function N(e){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},N(e)}var W=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&G(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=N(r);if(o){var n=N(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return V(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._submitForm=t,n}return t=u,(n=[{key:"_getInputValues",value:function(){return Array.from(this._popupSelector.querySelectorAll(".popup__item")).map((function(e){return e.value}))}},{key:"setEventListeners",value:function(){var e=this;A(N(u.prototype),"setEventListeners",this).call(this),this._popupSelector.querySelector(".popup__form").addEventListener("submit",(function(t){e._submitForm(t)}))}},{key:"close",value:function(){A(N(u.prototype),"close",this).call(this),this._popupSelector.querySelector(".popup__form").reset()}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(c);function Y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var J=function(){function e(t){var n=t.userName,r=t.userJob;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=n,this._userJob=r}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName,job:this._userJob}}},{key:"setUserInfo",value:function(e,t){this._userName.textContent=e,this._userJob.textContent=t}}])&&Y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),U=new r({inputSelector:".popup__item",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__item_type_error",errorClass:"popup__item-error_active"},f),F=new r({inputSelector:".popup__item",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__item_type_error",errorClass:"popup__item-error_active"},S),z=new J({userName:y,userJob:m}),K=new W(w,(function(e){e.preventDefault(),new i({data:[{name:g.value,link:E.value}],renderer:function(e){var n=new t(e.name,e.link,"#card",(function(){X.open(e.link,e.name)})).generateCard();Z.addItem(n)}},b).renderItems(),F.disableButton(O),K.close()})),Q=new W(p,(function(e){e.preventDefault(),z.setUserInfo(_.value,d.value),Q.close()})),X=new M(C);K.setEventListeners(),Q.setEventListeners(),X.setEventListeners();var Z=new i({data:[{name:"Букет цветов",link:"https://images.unsplash.com/photo-1523693916903-027d144a2b7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"},{name:"Ламы",link:"https://images.unsplash.com/photo-1660878561965-b8ce1342c507?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},{name:"Ретро авто",link:"https://images.unsplash.com/photo-1660888414951-4639f2641aee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"},{name:"Завтрак",link:"https://images.unsplash.com/photo-1660744562389-57bf4544afe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},{name:"Дом на колесах",link:"https://images.unsplash.com/photo-1660704897097-6b30e802505c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"},{name:"Mope",link:"https://images.unsplash.com/photo-1660864254373-f9e29374f5df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}],renderer:function(e){var n=new t(e.name,e.link,"#card",(function(){X.open(e.link,e.name)})).generateCard();Z.addItem(n)}},b);function $(){var e=z.getUserInfo();_.value=e.name.textContent,d.value=e.job.textContent}Z.renderItems(),$(),F.enableValidation(),U.enableValidation(),s.addEventListener("click",(function(){Q.open(),$()})),v.addEventListener("click",(function(){K.open()})),h.addEventListener("click",(function(){Q.close()})),k.addEventListener("click",(function(){K.close()})),x.addEventListener("click",(function(){X.close()}))})();