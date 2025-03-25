import React, { useState, useEffect } from "react";
import s from "./Korzina.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const DELIVERY_COST = 20; 

const Korzina = ({ cartItems, setCartItems }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      cartItems.length > 0 &&
      name.trim() !== "" &&
      phone.trim() !== "" &&
      address.trim() !== "" &&
      payment !== "" &&
      startDate !== "" &&
      startTime !== "" &&
      endDate !== "" &&
      endTime !== ""
    );
  }, [cartItems, name, phone, address, payment, startDate, startTime, endDate, endTime]);

  const totalBikes = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = totalBikes > 5 ? DELIVERY_COST : 0;
  const finalPrice = totalPrice + deliveryFee;

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  };

  const sendToTelegram = () => {
    if (!isFormValid) return;

    const TELEGRAM_BOT_TOKEN = "7577138926:AAECgqahtUj92mDSvMv2Vrg-lFMmGTBIL_M"; 
    const CHAT_ID = "-1002333322300";
    const message = `
      🚴‍♂️ *Новый заказ на аренду велосипеда* 🚴‍♀️
      📍 *Имя:* ${name}
      📞 *Телефон:* ${phone}
      🏠 *Адрес:* ${address}
      💰 *Оплата:* ${payment === "online" ? "Онлайн" : "На месте"}
      📆 *Дата аренды:* ${startDate} в ${startTime}
      📆 *Дата возврата:* ${endDate} в ${endTime}
      🛒 *Выбранные велосипеды:*  
      ${cartItems.map(item => `- ${item.title} (${item.quantity || 1} шт. - ${item.price} UZS)`).join("\n")}

      📦 *Доставка:* ${deliveryFee > 0 ? `${DELIVERY_COST}UZS (более 5 велосипедов)` : "Бесплатно"}
      💰 *Итого к оплате:* ${finalPrice} UZS
    `;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    }).then(() => {
      alert("Заявка отправлена!");
      setCartItems([]);
      setName("");
      setPhone("");
      setAddress("");
      setPayment("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
    }).catch(() => alert("Ошибка отправки!"));
  };

  return (
    <section className={s.korzinaSection}>
      <div className="container">
        <h2>Заявка на аренду велосипедов</h2>
        <div className={s.korzinaContent}>
          <div className={s.bikeList}>
            <AnimatePresence>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={s.item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <img src={item.image} alt={item.title} className={s.image} />
                    <div className={s.info}>
                      <h3>{item.title}</h3>
                      <p>{item.price} UZS</p>
                      <div className={s.quantity}>
                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                        <button onClick={() => handleRemove(item.id)} className={s.removeButton}>
                        ✖
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p>Корзина пуста</p>
              )}
            </AnimatePresence>
          </div>

          <div className={s.summary}>
            <h3>Контактные данные</h3>
            <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <h3>Информация о доставке</h3>
            <input type="text" placeholder="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />

            <h3>Дата и время аренды</h3>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <h3>Дата и время возврата</h3>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

            <h3>Выбор оплаты</h3>
            <div className={s.paymentOptions}>
              <label>
                <input type="radio" name="payment" value="online" onChange={() => setPayment("online")} /> Онлайн
              </label>
              <label>
                <input type="radio" name="payment" value="cash" onChange={() => setPayment("cash")} /> На месте
              </label>
            </div>

            <h3>Итого</h3>
            <p>Общая сумма: {totalPrice} UZS</p>
            {deliveryFee > 0 && <p>Доставка: {DELIVERY_COST} UZS (более 5 велосипедов)</p>}
            <p><strong>К оплате: {finalPrice} UZS</strong></p>

            <button
              className={`${s.bookButton} ${!isFormValid ? s.disabled : ""}`}
              disabled={!isFormValid}
              onClick={sendToTelegram}
            >
              Забронировать
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Korzina;
