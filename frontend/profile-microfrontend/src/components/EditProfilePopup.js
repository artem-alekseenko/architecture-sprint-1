import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { setUserInfo } from '../utils/profileApi';

import '../styles/popup/popup.css';

function EditProfilePopup({ isOpen, onUpdateUser, onClose, currentUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentUser && isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        setUserInfo({
            name,
            about: description,
        })
            .then((newUserData) => {
                onUpdateUser(newUserData);
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={onClose}
            title="Редактировать профиль"
            name="edit"
        >
            <label className="popup__label">
                <input
                    type="text"
                    name="userName"
                    id="owner-name"
                    className="popup__input popup__input_type_name"
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                    pattern="[a-zA-Zа-яА-Я -]{1,}"
                    value={name || ''}
                    onChange={handleNameChange}
                />
                <span className="popup__error" id="owner-name-error"></span>
            </label>
            <label className="popup__label">
                <input
                    type="text"
                    name="userDescription"
                    id="owner-description"
                    className="popup__input popup__input_type_description"
                    placeholder="Занятие"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={handleDescriptionChange}
                />
                <span className="popup__error" id="owner-description-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
