import React, { useState, useEffect } from "react";
import styles from "./NuevoVideo.module.css";
import axios from "axios";

function NuevoVideo() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [link, setLink] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/videos")
      .then((response) => {
        const videosData = response.data;
        const categories = videosData.reduce((acc, video) => {
          acc[video.categoria] = [...(acc[video.categoria] || []), video];
          return acc;
        }, {});
        setFilteredVideos(categories);
      })
      .catch((error) => {
        console.error("Error al obtener los datos", error);
      });
  }, []);

  const handleCategorySelect = (category) => {
    const selectedVideos = filteredVideos[category] || [];
    setVideos(selectedVideos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevoVideo = {
      titulo,
      categoria,
      imagen,
      link,
      descripcion,
    };

    axios
      .post("http://localhost:3000/videos", nuevoVideo)
      .then((response) => {
        console.log("Video creado exitosamente", response.data);

        // Reseteamos los campos del formulario
        setTitulo("");
        setCategoria("");
        setImagen("");
        setLink("");
        setDescripcion("");
      })
      .catch((error) => {
        console.error("Error al crear el video", error);
      });
  };

  return (
    <div className={styles.nuevoVideo}>
      <h2>Agregar Nuevo Video</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Imagen:</label>
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Categoría:</label>
          <select
            className={styles.select}
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              handleCategorySelect(e.target.value);
            }}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="FrontEnd">FrontEnd</option>
            <option value="BackEnd">BackEnd</option>
            <option value="Innovacion y Gestion">Innovacion y Gestion</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default NuevoVideo;
