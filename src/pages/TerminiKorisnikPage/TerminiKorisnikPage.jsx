import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Services } from "../../services/Services";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { format } from 'date-fns';
import styles from "./TerminiKorisnikPage.module.css";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import BasicModal from "../../components/BasicModal/BasicModal";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
export default function TerminiKorisnikPage(){
    const idKorisnik=Services.uzimanjeSesijeId();
    const rola=Services.uzimanjeSesijeRola();
    const [termini,setTermini]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.korisniciZakazaniTermini(idKorisnik);
            setTermini(response.termini);
            console.log(response);
        };
        fetchData();
    },[termini]);
    return(
        <>
         <Navbar
        pocetna={rola}
        logo="KOZMETIČKI SALON"
        text2={<Link to="/zakazivanjeTermina">Zakaži termin</Link>}
        text3={<Link to="/terminiKorisnik">Termini</Link>}
        text4={<Link to="/profilKorisnik">Tvoj profil</Link>}
        text5="Odjavi se"/>
        <ToastContainer/>
        <h1 className={styles.heading}>Tvoji zakazani termini:</h1>
        {termini ?  (termini.map((termin,index)=>(
            <div className={styles.box} key={index}>
                <p className={styles.item}>{termin.FirstName} {termin.LastName}</p>
                <p className={styles.item}>{termin.ServiceName}</p>
                <p className={styles.item}>{format(new Date(termin.AppointmentDateTime), 'dd.MM.yyyy. HH:mm')}</p>
                <BasicModal text={<p className={styles.modalText}>Da li si siguran da želiš da otkažeš termin?</p>}label={<ContainedButton module={styles.cancel} text="X"/>} onConfirm={async()=>{
                    const response=await Services.otkaziTermin({
                        'idKorisnika':idKorisnik,
                        'idTermina':termin.AppointmentID
                    })
                    if(response==='Uspešno ste otkazali termin.'){
             toast.success("Termin je uspešno otkazan!", {
          position: toast.POSITION.TOP_RIGHT,
        autoClose:1500,
        }); 
    
                    }else{
                        toast.error({response}, {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
                    }
        }}/>
            </div>
        ))) : (<h3 className={styles.error}>Nema zakazanih termina do sada!</h3>)}
        </>
    )
}