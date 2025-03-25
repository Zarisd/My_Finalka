import React from 'react';
import s from './Ride.module.scss';

const Ride = ({ title,scooter,forus__cart, text, about, image1, cyclists, third__cart, second__cart, cart__siti, siti__text, text__siti, main__text, botanika, about__BikePark }) => {
  return (
    <section className={s.ride}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.riding}>
            <div className={s.ride__box}>
              {title && <h1>{title}</h1>}
              {main__text && <h1>{main__text}</h1>}
              {about__BikePark && <p>{about__BikePark}</p>}
              {text && <p>{text}</p>}
            </div>

            <div className={s.ride__image}>
              {image1 && <img src={image1}  />}
              {botanika && <img src={botanika} />}
              { cyclists  && <img src={cyclists}  /> }
              { scooter &&  <img src= {scooter}/>}
            </div>
          </div>

          <div className={s.main__siti}>
            <div className={s.box__siti}>
             {siti__text && <h2>{siti__text}</h2> }
              {text__siti && <p>{text__siti}</p>}
              {about && <p>{about}</p>}
            
            </div>

            <div className={s.citi__image}>
             {cart__siti && <img src={cart__siti}/> }
             { forus__cart && <img src={ forus__cart }/>}
             { second__cart && <img src={second__cart}/> }
             { third__cart && <img src={third__cart} /> }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Ride;