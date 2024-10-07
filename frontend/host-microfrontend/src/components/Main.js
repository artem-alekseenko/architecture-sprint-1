import React, { lazy, Suspense, useState } from 'react';

const LoadingFallback = <div>Loading...</div>;

const LazyComponent = (importFunc, componentName) =>
    lazy(() =>
        importFunc().catch((e) => {
            console.error(`Failed to load ${componentName} component:`, e);
            return { default: () => <div className='error'>Component {componentName} is not available!</div> };
        })
    );

const Profile = LazyComponent(() => import('profile/Profile'), 'Profile');
const CardsContainer = LazyComponent(() => import('cards/CardsContainer'), 'CardsContainer');

const Main = () => {
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

    const handleOpenAddPlacePopup = () => {
        setAddPlacePopupOpen(true);
    };

    const handleCardSelection = (card) => {
        setActiveCard(card);
    };

    const closeAllPopups = () => {
        setAddPlacePopupOpen(false);
        setActiveCard(null);
    };

    return (
        <main className="content">
            <Suspense fallback={LoadingFallback}>
                <Profile onAddPlaceClick={handleOpenAddPlacePopup} />
            </Suspense>
            <Suspense fallback={LoadingFallback}>
                <CardsContainer
                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    selectedCard={activeCard}
                    onCardClick={handleCardSelection}
                />
            </Suspense>
        </main>
    );
}

export default Main;