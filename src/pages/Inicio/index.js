import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "components/Card/Card";
import styles from "./index.module.css";
import Banner from "components/Banner/Banner";
import EditModal from "components/EditModal/EditModal";

function Inicio() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/videos')
      .then(response => {
        const videosData = response.data;
        const categories = videosData.reduce((acc, video) => {
          acc[video.categoria] = [...(acc[video.categoria] || []), video];
          return acc;
        }, {});
        setFilteredVideos(categories);
      })
      .catch(error => {
        console.error("Error al obtener los datos", error);
      });
  }, []);

  const handleEditClick = (video) => {
    setSelectedVideo(video);
  };

  const handleSaveEdit = (updatedVideo) => {
    console.log("Video actualizado:", updatedVideo);
    setSelectedVideo(null);
  };

  const handleCancelEdit = () => {
    setSelectedVideo(null);
  };

  const handleDelete = (id) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    setVideos(updatedVideos);

    const updatedFilteredVideos = { ...filteredVideos };
    Object.keys(updatedFilteredVideos).forEach(key => {
      updatedFilteredVideos[key] = updatedFilteredVideos[key].filter(video => video.id !== id);
    });
    setFilteredVideos(updatedFilteredVideos);

    axios.delete(`http://localhost:3000/videos/${id}`)
      .then(response => {
        console.log("Video eliminado exitosamente", response.data);
      })
      .catch(error => {
        console.error("Error al eliminar el video", error);
      });
  };

  return (
    <div className={styles.inicio}>
      <Banner />
      {Object.entries(filteredVideos).map(([category, videos]) => (
        <div key={category} className={styles.categorySection}>
          <div className={styles.categoria}>
            <img
              src={`/img/${category.toLowerCase().replace(/ /g, '')}.png`}
              alt={category}
              className={styles.categoriaImg}
            />
          </div>
          <div className={styles.videoList}>
            {videos.map(video => (
              <Card
                key={video.id}
                {...video}
                onDelete={() => handleDelete(video.id)}
                onEdit={() => handleEditClick(video)}
              />
            ))}
          </div>
        </div>
      ))}
      {selectedVideo && (
        <EditModal video={selectedVideo} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
      )}
    </div>
  );
}

export default Inicio;