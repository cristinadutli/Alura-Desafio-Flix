import { Link } from "react-router-dom"
import styles from "./Cabecera.module.css"
import logo from "./logo.png"
import CabeceraLink from "../CabeceraLink/CabeceraLink"
import home from "./home.png"
import editavideo from "./editarvideo.png"

function Cabecera(){
    return(
        <header className={styles.cabecera}>
            <Link to="/">
            <section className={styles.logoContainer}>
                <img src={logo} alt="Logo Alura"/>

            </section >
            
            </Link>
            <nav>
                <CabeceraLink url="./"imagen={home}>
                </CabeceraLink>
                <CabeceraLink url="./nuevo-video" imagen={editavideo}>
                </CabeceraLink>

            </nav>
        </header>
    )
}
export default Cabecera