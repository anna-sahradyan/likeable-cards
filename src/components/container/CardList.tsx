
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
    fetchPhotos,
    toggleShowLikedOnly,
    setCardsFromLocalStorage,
    setShowLikedOnlyFromLocalStorage,
    clearLocalStorage
} from '../../redux/cardSlice';
import Card from '../card/Card';
import s from '../card/card.module.css';
import Loading from '../loading/Loader';


const CardList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { cards, loading, error, showLikedOnly, likedCardIds } = useSelector((state: RootState) => state.cards);
    useEffect(() => {
        dispatch(setCardsFromLocalStorage());
        dispatch(setShowLikedOnlyFromLocalStorage());
        dispatch(fetchPhotos());
    }, [dispatch]);

    const handleFilterToggle = () => {
        dispatch(toggleShowLikedOnly());
    };

    const handleClearStorage = () => {
        dispatch(clearLocalStorage());
    };

    const filteredCards = showLikedOnly
        ? cards.filter(card => likedCardIds.includes(card.id))
        : cards;

    if (loading) return <div><Loading /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={s.cardList}>
            <div className={s.btnBox}>
            <button onClick={handleFilterToggle} className={s.showBtn}>
                {showLikedOnly ? 'Show All' : 'Discover Liked Destinations'}
            </button>
            <button onClick={handleClearStorage} className={s.clearBtn}>Clear Travel History</button>
            </div>
            <div className={s.cardsContainer}>
                {filteredCards.map(card => (
                    <Card
                        key={card.id}
                        {...card}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardList;
