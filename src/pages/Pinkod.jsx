import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Pinkod.module.scss";


const CORRECT_PIN = "0111"; // Установи свой PIN

const Pinkod = ({ setAuth }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setAuth(true); // Устанавливаем авторизацию
      navigate("/admin"); // Переход в админку
    } else {
      setError("Неверный PIN-код");
      setPin("");
    }
  };

  return (
    <div className={s.pinkodContainer}>
      <h2>Введите PIN-код</h2>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Введите PIN"
          className={s.input}
        />
        <button type="submit" className={s.button}>Войти</button>
      </form>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default Pinkod;
