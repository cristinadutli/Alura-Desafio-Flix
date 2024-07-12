import React, { useState } from "react";
import styles from "./Card.module.css";
import editar from "./editar.png";
import borrar from "./borrar.png";
import axios from "axios";

function Card({ id, capa, link, onDelete, onEdit }) {
  const [showVideo, setShowVideo] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openVideo = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  const getEmbedLink = (url) => {
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/\?v=))([\w-]{11})(?:[&?][\w?=]*)?/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : url;
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`https://alura-desafio-flix.vercel.app/${id}`)
      .then((response) => {
        console.log("Video eliminado exitosamente", response.data);
        onDelete(id);
        setShowConfirm(false);
      })
      .catch((error) => {
        console.error("Error al eliminar el video", error);
      });
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className={`${styles.container} ${showVideo ? styles.expanded : ""}`}>
      {!showVideo ? (
        <img
          src={capa}
          alt="Miniatura del video"
          className={styles.capa}
          onClick={openVideo}
        />
      ) : (
        <div className={styles.videoContainer}>
          <iframe
            className={styles.video}
            src={getEmbedLink(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button className={styles.closeButton} onClick={closeVideo}>
            Cerrar
          </button>
        </div>
      )}
      <div className={styles.actions}>
        <div className={styles.iconContainer}>
          <img
            src={editar}
            alt="Editar"
            onClick={onEdit}
            className={`${styles.icon} ${styles.editIcon}`}
          />
          <span className={styles.iconText}>Editar</span>
        </div>
        <div className={styles.iconContainer}>
          <img
            src={borrar}
            alt="Borrar"
            onClick={handleDeleteClick}
            className={`${styles.icon} ${styles.deleteIcon}`}
          />
          <span className={styles.iconText}>Borrar</span>
        </div>
      </div>
      {showConfirm && (
        <div className={styles.confirmation}>
          <p>¿Está seguro de eliminar este video?</p>
          <button onClick={handleConfirmDelete} className={styles.confirm}>
            Sí
          </button>
          <button onClick={handleCancelDelete} className={styles.cancel}>
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
