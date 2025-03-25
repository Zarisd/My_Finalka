import React from "react";
import s from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={s.preloader}>
      <img src="https://i.gifer.com/JYCA.gif" alt="Loading animation" className={s.gif} />
      <div className={s.loading_bar}>
        <div className={s.progress}></div>
      </div>
    </div>
  );
};




export default Preloader;