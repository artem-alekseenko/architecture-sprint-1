import React, { useState, useEffect } from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { getUserInfo } from '../utils/profileApi';

import '../styles/profile/profile.css';

const Profile = ({ onAddPlaceClick }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    useEffect(() => {
        getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEditAvatar = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfile = () => {
        setIsEditProfilePopupOpen(true);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    };

    const handleUpdateUser = (newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
    };

    const handleUpdateAvatar = (newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
    };

    const imageStyle = { backgroundImage: `url(${currentUser?.avatar})` };

    return (
        <>
            <section className="profile page__section">
                <div className="profile__image" onClick={handleEditAvatar} style={imageStyle}></div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser?.name}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        onClick={handleEditProfile}
                    ></button>
                    <p className="profile__description">{currentUser?.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={onAddPlaceClick}
                ></button>
            </section>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                currentUser={currentUser}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
        </>
    );
};

export default Profile;
