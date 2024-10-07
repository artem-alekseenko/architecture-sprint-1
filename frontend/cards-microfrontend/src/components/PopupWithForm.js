import React from 'react';

import '../styles/popup/popup.css';

function PopupWithForm({ isOpen, onClose, onSubmit, title, name, children, buttonText }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`}>
            <div className="popup__content">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
                    {children}
                    <button type="submit" className="popup__button">{buttonText || 'Сохранить'}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
