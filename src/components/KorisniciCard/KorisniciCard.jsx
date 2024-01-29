import React from "react";
import ContainedButton from "../ContainedButton/ContainedButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './KorisniciCard.module.css';
import { Link } from "react-router-dom";
import { Services } from "../../services/Services";
import BasicModal from "../BasicModal/BasicModal";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
export default function KorisniciCard(props){
    return(
        <>
        <ToastContainer/>
        <div className={styles.box}>
        <div className={styles.row}>
        <p>Ime: <span>{props.ime}</span></p>
        <p>Prezime: <span>{props.prezime}</span> </p>
        <p>Korisničko ime: <span>{props.korisnickoIme}</span></p>
        </div>
        <div className={styles.row}>
        <p>Email: <span>{props.email}</span></p>
        <p>Broj telefona: <span>{props.brojTelefona}</span></p>
        </div>
        <div className={styles.row4}>
        <Link to={`/izmenaKorisnika/${props.idKorisnika}`}><ContainedButton module={styles.button} text={<EditIcon/>}/></Link> 
        <BasicModal label={<ContainedButton module={styles.button} text={<DeleteIcon/>}/>} text={<p className={styles.modalText}>Da li si siguran da želiš da obrišeš korisnika?</p>} 
        onConfirm={async()=>{
        {console.log(props.idKorisnika)};
        const response=await Services.obrisiKorisnika({'idKorisnika':props.idKorisnika,
        'rola':3});
        if(response==='Uspesno obrisan korisnik'){
         toast.success("Korisnik je uspešno obrisan!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        }else{
            toast.error("Došlo je do greške. Pokušajte ponovo!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        }
        }}
        />
        
        </div>
        </div>
        </>
    )
}