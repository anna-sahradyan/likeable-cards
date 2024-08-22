import React from 'react';
import s from './footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={s.footer}>
            <div className="container">
                <div className={s.inner}>
                    <h2 className={s.title}>Journey Beyond: Discover Your Dream Destination</h2>
                    <div className={s.listFooter}>
                        <img src="/images/img-1.webp" alt="2" width={76} height={168}/>
                        <img src="/images/img-2.webp" alt="3" width={382} height={226}/>
                        <img src="/images/img-3.webp" alt="5" width={171} height={142}/>
                        <img src="/images/img-4.webp" alt="tour" width={206} height={206}/>
                        <img src="/images/img-5.webp" alt="6" width={143} height={102}/>

                    </div>
                    <p className={s.copy}>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
