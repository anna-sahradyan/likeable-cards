import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhotos} from "../../redux/cardSlice";

const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {loading, error} = useSelector((state: RootState) => state.cards);
    const card = useSelector((state: RootState) => state.cards.cards);
    console.log(card);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);
    return (
        <div>
            <h1>Hello</h1>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, aut dolor ea error et eum
                excepturi facere id ipsum itaque laudantium nisi officiis quaerat quibusdam sequi sit velit voluptates.
            </div>
            <div>Atque dolorum in laboriosam omnis quod repellat, ullam. Consequatur dignissimos dolor ducimus ea earum,
                error eum excepturi facilis, fuga fugiat fugit harum ipsum iure possimus quia similique tempora tempore,
                voluptatem?
            </div>
            <div>Alias aliquid amet architecto assumenda aut blanditiis corporis ducimus esse et eum incidunt nemo nihil
                nostrum, perspiciatis, quae quis quo rem reprehenderit temporibus voluptatem. Accusamus aspernatur autem
                deleniti laboriosam voluptates.
            </div>
            <div>Adipisci consequatur eaque enim eum explicabo, facilis, illo laboriosam magni minus mollitia possimus
                quae reiciendis sed ullam velit veritatis voluptatibus! Alias aliquam cumque laborum reiciendis saepe
                similique. Consequatur ipsam, unde?
            </div>
            <div>Asperiores, at beatae consectetur cumque distinctio, dolorum eveniet ipsa minima nulla obcaecati
                officiis quaerat quibusdam repellendus sapiente similique. Corporis, cupiditate deserunt dicta illo
                iusto minima nostrum odit pariatur placeat porro?
            </div>
        </div>
    );
};

export default Home;
