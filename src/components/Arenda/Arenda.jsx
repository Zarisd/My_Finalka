import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast, Toaster } from "react-hot-toast";
import s from "./Arenda.module.scss";
import Korzina from "../Korzina/Korzina";

const Arenda = ({ bikes = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [hoveredBike, setHoveredBike] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleBikes, setVisibleBikes] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const updateVisibleBikes = () => {
      let count = 4;
      if (window.innerWidth <= 1200) count = 3;
      if (window.innerWidth <= 950) count = 2;
      if (window.innerWidth <= 570) count = 1;
      setVisibleBikes(showAll ? filteredBikes : filteredBikes.slice(0, count));
    };

    updateVisibleBikes();
    window.addEventListener("resize", updateVisibleBikes);
    return () => window.removeEventListener("resize", updateVisibleBikes);
  }, [showAll, bikes, searchQuery, selectedCategory]);

  const handleAddToCart = (bike) => {
    setCartItems([...cartItems, bike]);
    toast.success(`\"${bike.title}\" добавлен в корзину!`, {
      position: "top-right",
      duration: 2000,
    });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredBikes = bikes
    .filter((bike) =>
      bike.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (bike) => selectedCategory === "all" || bike.category === selectedCategory
    );

  return (
    <section className={s.arenda}>
      <Toaster />
      <div className="container">
        <div className={s.filters}>
          <div className={s.days}>
            <p>Поиск велосипеда</p>
            <input
              type="text"
              placeholder="Введите название..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={s.days}>
            <p>Фильтр по категории</p>
            <select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="all">Все</option>
              <option value="bike">Велосипед</option>
              <option value="scooter">Самокат</option>
              <option value="supboard">SUP-борд</option>
              <option value="kayak">Каяк</option>
            </select>
          </div>
        </div>

        <div className={s.bikeList}>
          {visibleBikes.length > 0 ? (
            visibleBikes.map((bike, index) => (
              <div
                className={s.bikeCard}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={bike.id}
              >
                <div className={s.bikeImageWrapper}>
                  <img src={bike.image} alt={bike.title} />
                </div>
                <h3>{bike.title}</h3>
                <p className={s.price}>{bike.price * 1000} UZS</p>
                <div className={s.actions}>
                  <div
                    className={s.infoWrapper}
                    onMouseEnter={() => setHoveredBike(bike.id)}
                    onMouseLeave={() => setHoveredBike(null)}
                  >
                    <button className={s.infoButton}>?</button>
                    {hoveredBike === bike.id && (
                      <div className={s.tooltip}>
                        <p>{bike.description}</p>
                      </div>
                    )}
                  </div>
                  <button
                    className={s.addButton}
                    onClick={() => handleAddToCart(bike)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Нет доступных вариантов</p>
          )}
        </div>

        {filteredBikes.length > 4 && (
          <div className={s.toggleButton}>
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "⬆️ Скрыть" : "⬇️ Показать еще"}
            </button>
          </div>
        )}
      </div>

      <Korzina cartItems={cartItems} setCartItems={setCartItems} />
    </section>
  );
};

export default Arenda;
