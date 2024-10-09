import React, { useRef, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { setUserAvatar } from '../utils/profileApi';

import '../styles/popup/popup.css';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
    const inputRef = useRef();

    useEffect(() => {
        if (isOpen) {
            inputRef.current.value = '';
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        setUserAvatar({
            avatar: inputRef.current.value,
        })
            .then((newUserData) => {
                onUpdateAvatar(newUserData);
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={onClose}
            title="Обновить аватар"
            name="edit-avatar"
        >
            <label className="popup__label">
                <input
                    type="url"
                    name="avatar"
                    id="owner-avatar"
                    className="popup__input popup__input_type_description"
                    placeholder="Ссылка на изображение"
                    required
                    ref={inputRef}
                />
                <span className="popup__error" id="owner-avatar-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
