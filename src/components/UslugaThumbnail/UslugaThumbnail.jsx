import React from "react";
import styles from "./UslugaThumbnail.module.css";
import { Navigate, useNavigate } from "react-router-dom";
export default function UslugaThumbnail(props){
    const navigate=useNavigate();
    const handleThumbnailClick=()=>{
        navigate(`/opisUsluge/${props.idUsluge}`)
    }
    return (
        <div className={styles.thumbnail} onClick={handleThumbnailClick}>
        <div className={styles.imageDiv}>
            <img className={styles.image} src={require(`../../images/thumbnail.jpg`)}/>
        </div>
        <div className={styles.label}>
            <h1 className={styles.heading}>{props.nazivUsluge}</h1>
            <p className={styles.price}>{props.cenaUsluge} din.</p>
        </div>
        <h2>{props.label}</h2>
        </div>
    )
}
