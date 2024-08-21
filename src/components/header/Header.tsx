import React from 'react';
import s from './header.module.css';
import {CiShoppingCart} from "react-icons/ci";
import { CiUser } from "react-icons/ci";
const Header: React.FC = () => {
    return (
        <>
            <header className={s.header}>
                <div className="container">
                <div className={s.inner}>
                    <a href="#" className={s.logoLink}><img src="/images/ship.svg" alt="ship" width={30}/></a>
                    <nav className={s.menu}>
                        <ul className={s.list}>
                            <li className={s.item}><a href="#">Home</a></li>
                            <li className={s.item}><a href="#">About</a></li>
                            <li className={s.item}><a href="#">Blog</a></li>
                            <li className={s.item}><a href="#">Gallery</a></li>
                            <li className={s.item}><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                    <div className={s.user}>
                        <CiUser/>
                        <CiShoppingCart/>
                    </div>
                </div>
                </div>
            </header>
        </>
    );
};

export default Header;
