import React, { useState } from "react";
import s from "./Feedback.module.scss";

const TELEGRAM_BOT_TOKEN = "7577138926:AAECgqahtUj92mDSvMv2Vrg-lFMmGTBIL_M"; 
const CHAT_ID = "-1002333322300"; 
const API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const Feedback = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "", 
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const text = `
      ✉️ Новый вопрос:
      🔹 Имя: ${formData.name || "Не указано"}
      📞 Телефон: ${formData.phone || "Не указано"}
      💬 Сообщение: ${formData.message}
    `;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки. Проверьте TOKEN и CHAT_ID");
      }

      setFormData({ name: "", phone: "", email: "", message: "" });
      onClose(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>✖</button>

        <div className={s.contactForm}>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.contactInfo}>
              <h3>Остались вопросы? Мы всегда на связи!</h3>
            </div>

            <label className={s.inputLabel}>
              Имя (не обязательно)
              <input
                type="text"
                name="name"
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={handleChange}
                className={s.inputField}
              />
            </label>

            <label className={s.inputLabel}>
              Номер телефона (не обязательно)
              <input
                type="tel"
                name="phone"
                placeholder="Введите номер телефона"
                value={formData.phone}
                onChange={handleChange}
                className={s.inputField}
              />
            </label>

            <label className={s.inputLabel}>
              Сообщение (обязательно)
              <textarea
                name="message"
                placeholder="Напишите ваше сообщение"
                value={formData.message}
                onChange={handleChange}
                className={s.inputField}
                required
              />
            </label>

            {error && <p className={s.errorText}>{error}</p>}

            <button
              type="submit"
              className={s.submitButton}
              disabled={!formData.message.trim() || loading} 
            >
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
