import React, { useState } from 'react';
import s from './Foter.module.scss';
import Feedback from '../Feedback/Feedback'; 
import { NavLink } from 'react-router-dom';

const Foter = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const toggleFeedbackModal = (e) => {
    e.preventDefault(); 
    setIsFeedbackOpen(true);
  };

  return (
    <>
      <footer className={s.footer}>
        <div className="container">
          <div className={s.wrapper}>
            <div className={s.wrapp}>
              <div>
                <h3 className={s.title}>Аренда велосипедов</h3>
                <ul className={s.list}>
                  <li>Алюминий</li>
                  <li>Карбон</li>
                  <li>Горные/городские</li>
                  <li>Городские эконом</li>
                </ul>
              </div>

              <div className={s.links}>
                <NavLink to="/pravila" className={s.link}>Правила</NavLink>
                <NavLink to="/aboutUs" className={s.link}>Отзывы</NavLink>
                <NavLink to="/contact" className={s.link}>Контакты</NavLink>
                <a href="#" className={s.link} onClick={toggleFeedbackModal}>Обратная связь</a>
              </div>
            </div>

            <div className={s.bottom}>
              <p>&copy; BikePark, 2021</p>
              <NavLink to="/policy" className={`${s.link} ${s.polic}`}>Политика конфиденциальности</NavLink>
              <div className={s.socials}>
                <a 
                  href="https://www.facebook.com/YourPage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="/fasebook.png" alt="Facebook" />
                </a>
                <a 
                  href="https://www.instagram.com/itacademy_uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="/insta.svg" alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {isFeedbackOpen && <Feedback onClose={() => setIsFeedbackOpen(false)} />}
    </>
  );
};

export default Foter;
