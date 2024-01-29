import React from "react";
import styles from "./Profil.module.css"
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
export default function Profil(props){
    return(
        <>
        <div className={styles.box}>
            <div className={styles.info}>
            <h1 className={styles.heading}>Tvoj profil</h1>
            <p>Ime: <span className={styles.item}>{props.ime}</span></p>
            <p>Prezime: <span className={styles.item}>{props.prezime}</span> </p>
            <p>Korisničko ime: <span className={styles.item}>{props.korisnickoIme}</span></p>
            <p>Email: <span className={styles.item}>{props.email}</span></p>
            <p>Broj telefona: <span className={styles.item}>{props.brojTelefona}</span></p>
            </div>
            <Link to={props.link}><ContainedButton text={<EditIcon/>} module={styles.button}/></Link>
        </div>
        </>
    )
}