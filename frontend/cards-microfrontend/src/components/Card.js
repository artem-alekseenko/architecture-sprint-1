import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

import '../styles/card/card.css';
import '../styles/places/places.css';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const cardDeleteButtonClassName = `card__delete-button ${
        isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'
    }`;
    const cardLikeButtonClassName = `card__like-button ${
        isLiked ? 'card__like-button_is-active' : ''
    }`;

    const cardStyle = { backgroundImage: `url(${card.link})` };

    return (
        <li className="places__item card">
            <div className="card__image" style={cardStyle} onClick={() => onCardClick(card)}></div>
            {isOwn && (
                <button
                    type="button"
                    className={cardDeleteButtonClassName}
                    onClick={() => onCardDelete(card)}
                ></button>
            )}
            <div className="card__description">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__likes">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={() => onCardLike(card)}
                    ></button>
                    <p className="card__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
