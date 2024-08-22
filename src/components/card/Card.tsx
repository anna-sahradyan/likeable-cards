
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteCard, toggleLike } from '../../redux/cardSlice';
import s from './card.module.css';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin2Fill } from 'react-icons/ri';

interface CardProps {
    id: string;
    title: string;
    imageUrl: string;
    text: string;
}

const Card: React.FC<CardProps> = ({ id, title, imageUrl, text }) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const liked = useSelector((state: RootState) =>
        state.cards.likedCardIds.includes(id)
    );

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(toggleLike(id));
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deleteCard(id));
    };

    const handleCardClick = () => {
        navigate(`/card/${id}`);
    };

    return (
        <div className={s.card} onClick={handleCardClick}>
            <div className={s.innerCard}>
                <h3 className={s.titleAll}>Explore All</h3>
                <div className={s.imageContainer}>
                    <img src={imageUrl} alt={title}/>
                </div>
                <div className={s.textPart}>
                    <h3>{text}</h3>
                    <p>{title}</p>
                </div>
            </div>
            <div className={s.btnBox}>
                <button onClick={handleLike}>
                    {liked ? <AiFillLike size={40}/> : <AiOutlineLike size={40}/>}
                </button>
                <RiDeleteBin2Fill onClick={handleDelete} size={35}/>
            </div>
        </div>
    );
};

export default Card;

