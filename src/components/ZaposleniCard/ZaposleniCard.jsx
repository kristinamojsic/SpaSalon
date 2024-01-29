import React from "react";
import ContainedButton from "../ContainedButton/ContainedButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ZaposleniCard.module.css';
import { Link } from "react-router-dom";
import BasicModal from "../BasicModal/BasicModal";
import { Services } from "../../services/Services";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
export default function ZaposleniCard(props){
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
        <Link to={`/izmenaZaposlenog/${props.idZaposleni}`}><ContainedButton module={styles.button} text={<EditIcon/>}/></Link> 
        <BasicModal label={<ContainedButton module={styles.button} text={<DeleteIcon/>}/>} text={<p className={styles.modalText}>Da li ste sigurni da želite da obrišete zaposlenog?</p>} 
        onConfirm={async()=>{
        const response=await Services.obrisiKorisnika({'idKorisnika':props.idZaposleni,
        'rola':2});
         if(response==='Uspesno obrisan korisnik'){
         toast.success("Zaposleni je uspešno obrisan!", {
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