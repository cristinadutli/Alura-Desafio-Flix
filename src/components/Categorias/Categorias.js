import React from "react";
import styles from "./Categorias.module.css";

function Categorias({ onCategorySelect }) {
  return (
    <div className={styles.categoriasContainer}>
      <div
        className={styles.categoria}
        onClick={() => onCategorySelect("FrontEnd")}
      >
        <img
          src="/img/frontend.png"
          alt="FrontEnd"
          className={styles.categoriaImg}
        />
      </div>
      <div
        className={styles.categoria}
        onClick={() => onCategorySelect("BackEnd")}
      >
        <img
          src="/img/backend.png"
          alt="BackEnd"
          className={styles.categoriaImg}
        />
      </div>
      <div
        className={styles.categoria}
        onClick={() => onCategorySelect("Innovacion y Gestion")}
      >
        <img
          src="/img/innovacionygestion.png"
          alt="Innovacion y Gestion"
          className={styles.categoriaImg}
        />
      </div>
    </div>
  );
}

export default Categorias;
