import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import styles from './Card.module.css';
import { EffectCards } from 'swiper/modules';

const images = [
  'https://images.freeimages.com/images/premium/previews/2913/29133658-girl-riding-her-bike.jpg',
  'https://sup-magaz.ru/wp-content/uploads/2021/01/sup-sails-m-krymu.png',
  'https://cdn-ua.bodo.gift/resize/upload/files/cm-experience/102/101645/images_file/all_all_big-t1601968004-r1w568h318q90zc1.jpg',
  'https://rg.ru/uploads/images/2023/02/02/5p_samokat_776.jpeg',


 
];

const Card = () => {
  return (
    <Swiper
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards]}
      className={styles.mySwiper}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <img src={src} alt={`Slide ${index + 1}`} className={styles.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Card;
