import { useState } from "react";
import s from "./Form.module.scss";

const TELEGRAM_BOT_TOKEN = "7577138926:AAECgqahtUj92mDSvMv2Vrg-lFMmGTBIL_M"; 
const CHAT_ID = "-1002333322300"; 
const API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    consent: false, 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const text = `
      ✉️ Новая заявка:
      🔹 Имя: ${formData.name || "Не указано"}
      📞 Телефон: ${formData.phone || "Не указано"}
      📧 E-mail: ${formData.email || "Не указано"}
      💬 Сообщение: ${formData.message || "Пусто"}
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

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: false,
        consent: false,
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={s.container__contact}>
        <div className={s.wrapper}>
          <div className={s.contact__info}>
            <h2>Контакты</h2>
            <div className={s.contact__text}>
              <p>Номер телефона</p>
              <h4>+998 90 302 33 85</h4>

              <p>E-mail</p>
              <h4>BikeParkInfo@gmail.com</h4>

              <p>Адрес</p>
              <h4>Ташкент. Главпочтамт</h4>
            </div>
          </div>

          <div className={s.contact__form}>
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.contact__info_2}>
                <p>Оставить заявку</p>
                <h3>Остались вопросы? Свяжитесь с нами</h3>
              </div>
              
              <label className={s.inputLabel}>
                Имя (не обязательно)
                <input
                  type="text"
                  name="name"
                  placeholder="Введите имя"
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
                E-mail (обязательно)
                <input
                  type="email"
                  name="email"
                  placeholder="Введите ваш E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className={s.inputField}
                />
              </label>

              <label className={s.inputLabel}>
                Сообщение (обязательно)
                <textarea
                  name="message"
                  placeholder="Введите ваше сообщение"
                  value={formData.message}
                  onChange={handleChange}
                  className={s.inputField}
                  required
                />
              </label>

              <div className={s.checkboxWrapper1}>
                <label className={`${s.inputLabel} ${s.checkboxWrapper}`}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className={s.checkbox}
                    required
                  />
                  <span>Согласен на обработку персональных данных</span>
                </label>
              </div>

              {error && <p className={s.errorText}>{error}</p>}
              {success && <p className={s.successText}>Сообщение успешно отправлено!</p>}

              <button
                type="submit"
                className={s.submitButton}
                disabled={!formData.consent || loading}
              >
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </div>
        </div>

        <div className={s.contact__map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.6412555601614!2d69.28132876732528!3d41.31666729398732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2d901c2def%3A0x1bb221455121c6e8!2z0JPQu9Cw0LLQv9C-0YfRgtCw0LzRgg!5e0!3m2!1sru!2s!4v1739553169520!5m2!1sru!2s"
            width="95%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contacts;
