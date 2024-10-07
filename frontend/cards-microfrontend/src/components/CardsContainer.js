import React, { useState, useEffect } from 'react';
import Card from './Card';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {
    getCardList,
    getUserInfo,
    addCard,
    removeCard,
    changeLikeCardStatus,
} from '../utils/api';

function CardsContainer({
        isAddPlacePopupOpen,
        onClose,
        selectedCard,
        onCardClick,
    }) {
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        Promise.all([getCardList(), getUserInfo()])
            .then(([cardsData, userData]) => {
                setCards(cardsData);
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(err));
    };

    const handleCardDelete = (card) => {
        console.log('handleCardDelete', card);
        removeCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    };

    const handleAddPlaceSubmit = (newCard) => {
        addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                onClose();
            })
            .catch((err) => console.log(err));
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <>
                <section className="places page__section">
                    <ul className="places__list">
                        {cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                        ))}
                    </ul>
                </section>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onAddPlace={handleAddPlaceSubmit}
                    onClose={onClose}
                />
                <ImagePopup card={selectedCard} onClose={onClose} />
            </>
        </CurrentUserContext.Provider>
    );
}

export default CardsContainer;
