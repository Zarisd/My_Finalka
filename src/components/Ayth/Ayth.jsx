import React, { useEffect, useState } from "react";
import s from "./Ayth.module.scss"; 

const Ayth = ({ onClose }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    onClose(); 
  };

  if (!user) return null;

  return (
    <div className={s.profileMenu}>
      <button className={s.closeBtn} onClick={onClose}>✖</button>
      <p><strong>{user.name || "Пользователь"}</strong></p>
      <p>{user.phone}</p>
      {user.email && <p>{user.email}</p>}
      <button onClick={handleLogout} className={s.logoutBtn}>Выйти</button>
    </div>
  );
};

export default Ayth;
