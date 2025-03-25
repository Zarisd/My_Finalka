import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import AboutUs from "./pages/AboutUs";
import Delivery from "./pages/Delivery";
import Contact from "./pages/Contact";
import RidePage from "./pages/RidePage";
import Error from "./components/Error/Error";
import ArendaPage from "./pages/ArendaPage";
import Pinkod from "./pages/Pinkod";
import Adminka from "./pages/Adminka";
import Feedback from "./components/Feedback/Feedback";
import Foter from "./components/Foter/Foter";
import Pravil from "./components/Pravil/Pravil";
import Preloader from "./components/Preloader/Preloader"; 

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

const App = () => {
  const [bikes, setBikes] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); 
  }, []);

  useEffect(() => {
    fetch("/product.json")
        .then((res) => res.json())
        .then((data) => {
          setBikes(data.projects);
        })
        .catch((err) => console.error("Ошибка загрузки данных", err));
  }, []);

  if (loading) {
    return <Preloader />; 
  }

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Routes location={location}>
            <Route path="/" element={<Home bikes={bikes} />} />
            <Route path="/arenda" element={<ArendaPage bikes={bikes} />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/admin" element={<Adminka auth={auth} setAuth={setAuth} bikes={bikes} setBikes={setBikes} />} />
            <Route path="/pinkod" element={<Pinkod setAuth={setAuth} />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ride" element={<RidePage />} />
            <Route path="/pravila" element={<Pravil />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Foter />
    </>
  );
};

export default App;
