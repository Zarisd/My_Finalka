import { useState } from "react";
import Select from "react-select";
import s from "./LoginModal.module.scss";

const countryCodes = [
  { value: "+998", label: "Uzbekistan", code: "uz" },
  { value: "+7", label: "Russia", code: "ru" },
  { value: "+380", label: "Ukraine", code: "ua" },
  { value: "+1", label: "USA", code: "us" },
  { value: "+44", label: "United Kingdom", code: "gb" },
  { value: "+49", label: "Germany", code: "de" }
];

const customSingleValue = ({ data }) => (
  <div className={s.customSingleValue}>
    <img src={`https://flagcdn.com/w40/${data.code}.png`} alt={data.label} className={s.flagIcon} style={{ width: "24px", marginRight: "8px" }} />
    {data.value}
  </div>
);

const customOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className={s.customOption}>
      <img src={`https://flagcdn.com/w40/${data.code}.png`} alt={data.label} className={s.flagIcon} style={{ width: "24px", marginRight: "8px" }} />
      {data.label} ({data.value})
    </div>
  );
};

const LoginModal = ({ onClose, setUser }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    agree: false,
    countryCode: countryCodes[0]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, countryCode: selectedOption }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPhoneNumber = formData.countryCode.value + formData.phone;

    const userData = isRegister
      ? { name: formData.name, phone: fullPhoneNumber, email: formData.email }
      : { phone: fullPhoneNumber };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    onClose();
  };

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          <button className={s.close} onClick={onClose}>✖</button>
          <div className={s.tabs}>
            <span className={!isRegister ? s.active : ""} onClick={() => setIsRegister(false)}>Вход</span>
            <span className={isRegister ? s.active : ""} onClick={() => setIsRegister(true)}>Регистрация</span>
          </div>
        </div>

        <form className={s.form} onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Имя*
              <input type="text" name="name" placeholder="Введите имя" value={formData.name} onChange={handleChange} required />
            </label>
          )}

          <label>
            Номер телефона*
            <div className={s.phoneField} style={{ display: "flex", alignItems: "center" }}>
              <Select
                options={countryCodes}
                value={formData.countryCode}
                onChange={handleCountryChange}
                className={s.countrySelect}
                getOptionLabel={(e) => (
                  <div className={s.optionLabel}>
                    <img src={`https://flagcdn.com/w40/${e.code}.png`} alt={e.label} className={s.flagIcon} style={{ width: "24px", marginRight: "8px"}} /> {e.label} ({e.value})
                  </div>
                )}
                components={{ SingleValue: customSingleValue, Option: customOption }}
                styles={{ container: (base) => ({ ...base, width: "120px", }) }}
              />
              <input type="tel" name="phone" placeholder="Введите номер" value={formData.phone} onChange={handleChange} required style={{ flex: 1, marginLeft: "8px" }} />
            </div>
          </label>

          {isRegister && (
            <label>
              E-mail
              <input type="email" name="email" placeholder="Введите E-mail" value={formData.email} onChange={handleChange} />
            </label>
          )}

          <label className={s.passwordField}>
            Пароль*
            <input type="password" name="password" placeholder="Введите пароль" value={formData.password} onChange={handleChange} required />
          </label>

          {isRegister && (
            <label className={s.checkbox}>
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required />
              Согласие на обработку персональных данных
            </label>
          )}

          <button type="submit" className={s.submitButton}>{isRegister ? "Зарегистрироваться" : "Войти"}</button>

          {!isRegister ? (
            <p className={s.forgotPassword} onClick={() => setIsRegister(true)}>Забыли пароль?</p>
          ) : (
            <p className={s.alreadyRegistered}>
              Уже авторизованы? <span onClick={() => setIsRegister(false)}>Войти</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
