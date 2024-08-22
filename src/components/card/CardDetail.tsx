import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from "../../redux/store";
import s from './details.module.css';


const CardDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const card = useSelector((state: RootState) =>
        state.cards.cards.find(card => card.id === id)
    );
    const navigate = useNavigate();

    if (!card) return <div className={s.notFound}>Card not found</div>;

    return (
        <>

            <div className={s.card}>
                <h2 className={s.title}>{card.title}</h2>
                <div className={s.inner}>
                    <div className={s.cardImgBlock}>
                        <img src={card.imageUrl} alt={card.title}/></div>
                    <p className={s.textPart}>{card.text}</p>

                </div>
                <button className={s.btn} onClick={() => navigate('/')}>Back to list</button>
            </div>

        </>
    );
};

export default CardDetails;
