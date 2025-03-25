import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Admin.module.scss";

const Adminka = ({ auth, setAuth }) => {
  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState({ title: "", price: "", image: "" });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  // Если не авторизован – отправляем на PIN-код
  useEffect(() => {
    if (!auth) {
      navigate("/pinkod");
    }
  }, [auth, navigate]);

  // Загрузка данных
  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  // Ввод данных
  const handleChange = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  // Добавление/редактирование
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bike.title || !bike.price || !bike.image) return;

    let updatedBikes;
    if (editIndex !== null) {
      const updatedBike = { ...bikes[editIndex], ...bike };
      updatedBikes = [...bikes];
      updatedBikes[editIndex] = updatedBike;

      await fetch(`http://localhost:5000/projects/${updatedBike.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBike),
      });

      setEditIndex(null);
    } else {
      const newBike = { ...bike, id: Date.now() };
      updatedBikes = [...bikes, newBike];

      await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBike),
      });
    }

    setBikes(updatedBikes);
    setBike({ title: "", price: "", image: "" });
  };

  // Редактирование
  const handleEdit = (index) => {
    setBike(bikes[index]);
    setEditIndex(index);
  };

  // Удаление
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/projects/${id}`, { method: "DELETE" });

    if (res.ok) {
      setBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== id));
    } else {
      console.error("Ошибка удаления:", res.status);
    }
  };

  // Выход (сброс авторизации)
  const handleLogout = () => {
    setAuth(false);
    navigate("/pinkod");
  };

  return (
    <section className={s.adminka}>
      <div className="container">
        <button onClick={handleLogout} className={s.logoutButton}>🚪 Выйти</button>
        <h2>Админка</h2>

        <form onSubmit={handleSubmit} className={s.form}>
          <input type="text" name="title" value={bike.title} onChange={handleChange} placeholder="Название" />
          <input type="number" name="price" value={bike.price} onChange={handleChange} placeholder="Цена" />
          <input type="text" name="image" value={bike.image} onChange={handleChange} placeholder="Ссылка на изображение" />
          <button type="submit">{editIndex !== null ? "Сохранить изменения" : "Добавить велосипед"}</button>
        </form>

        <div className={s.bikeList}>
          {bikes.map((bike, index) => (
            <div key={bike.id} className={s.bikeCard}>
              <img src={bike.image} alt={bike.title} />
              <h3>{bike.title}</h3>
              <p className={s.price}>{bike.price} USD</p>
              <div className={s.actions}>
                <button onClick={() => handleEdit(index)}>✏ Редактировать</button>
                <button onClick={() => handleDelete(bike.id)}>❌ Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Adminka;
