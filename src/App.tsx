import React from 'react';
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import CardPage from "./components/card/CardPage";
import CardList from "./components/container/CardList";

const App: React.FC = () => {
    return (
        <div className={'main'}>
            <div className="video_title">
            <h1>Journey Beyond: Discover Your Dream Destination</h1>
            <div className="input_search">
                <input type="text" placeholder={'Search'} />
                <button className={'search_btn'}></button>
            </div>
            </div>
            <div className={'video'}>
                <video autoPlay loop muted className={"relative min-h-full min-w-full"}>
                    <source src="/video/journey.mp4" type="video/mp4"/>
                </video>
            </div>
            <Header />
            <div className="container">
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/card/:id'} element={<CardPage/>} />
                    <Route path={'/card'} element={<CardList/>} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;
