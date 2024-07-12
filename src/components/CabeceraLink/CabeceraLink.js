import React from "react"
import { Link } from "react-router-dom"
import styles from "./CabeceraLink.module.css"


function CabeceraLink ({url,children,imagen}){
    return(

        <Link to={url} className={styles.link}>
            {children}
            <img src={imagen} alt="" />
        </Link>
    )
}

export default CabeceraLink