import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';

import '../styles/popup/popup.css';

const InfoTooltip = ({ isOpen, onClose, status }) => {
    const icon = status === 'success' ? SuccessIcon : ErrorIcon;
    const text =
        status === 'success'
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.';

    return (
        <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
            <div className="popup__content">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <div className="popup__wrapper">
                    <img className="popup__icon" src={icon} alt="Статус" />
                    <p className="popup__status-message">{text}</p>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;
