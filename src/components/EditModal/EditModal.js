import React, { useState } from "react";
import styles from "./EditModal.module.css";
import crossIcon from "./cerrar.png";
import axios from "axios";

function EditModal({ video, onSave, onCancel }) {
  // Manejo del estado del formulario
  const [titulo, setTitulo] = useState(video ? video.titulo : "");
  const [categoria, setCategoria] = useState(video ? video.categoria : "");
  const [capa, setCapa] = useState(video ? video.capa : "");
  const [link, setLink] = useState(video ? video.link : "");
  const [descripcion, setDescripcion] = useState(
    video ? video.descripcion : ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedVideo = {
      ...video,
      titulo,
      categoria,
      capa,
      link,
      descripcion,
    };

    axios
      .put(`http://localhost:3000/videos/${video.id}`, updatedVideo)
      .then((response) => {
        console.log("Video actualizado exitosamente", response.data);
        onSave(updatedVideo);
      })
      .catch((error) => {
        console.error("Error al actualizar el video", error);
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onCancel}>
          <img src={crossIcon} alt="Cerrar" className={styles.closeIcon} />
        </span>
        <h2 className={styles.titulo}>Editar Video</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Categoría:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Imagen:</label>
          <input
            type="text"
            value={capa}
            onChange={(e) => setCapa(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className={styles.textarea}
          ></textarea>
          <button type="submit" className={styles.button}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
