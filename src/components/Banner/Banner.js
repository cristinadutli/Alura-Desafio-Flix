import React from "react";
import { Link } from "react-router-dom";
import styles from "./Banner.module.css";
import playerImg from "./player.png"

function Banner() {
    return (
        <div className={styles.banner}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Challenge React</h1>
                    <p className={styles.paragraph}>
                        Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
                        </p>
                </div>
                <div className={styles.card}>
                    <Link to="https://youtu.be/C_wBJGhauMY" target="_blank" rel="noopener noreferrer">
                        <img src={playerImg} alt="¿Qué significa pensar como programador?" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Banner