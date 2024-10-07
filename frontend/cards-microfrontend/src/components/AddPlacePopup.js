import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({ name, link });
        setName('');
        setLink('');
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={onClose}
            title="Новое место"
            name="add"
        >
            <label className="popup__label">
                <input
                    type="text"
                    name="name"
                    className="popup__input"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <span className="popup__error"></span>
            </label>
            <label className="popup__label">
                <input
                    type="url"
                    name="link"
                    className="popup__input"
                    placeholder="Ссылка на картинку"
                    required
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <span className="popup__error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
