import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import KorisniciCard from "../../components/KorisniciCard/KorisniciCard";
import AddIcon from '@mui/icons-material/Add';
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import styles from "./SviKorisniciPage.module.css"
import { useEffect } from "react";
import { useState } from "react";
import { Services } from "../../services/Services";
export default function SviKorisniciPage(){
    const idAdmin=Services.uzimanjeSesijeId();
    const rola=Services.uzimanjeSesijeRola();
    const [korisnici,setKorisnici]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.sviKorisnici();
            setKorisnici(response);
        };
        fetchData();
    },[korisnici]);
    return(
        <>
        <Navbar
        pocetna={rola}
        logo="KOZMETIČKI SALON"
        text2={<Link to="/zaposleniAdmin">Zaposleni</Link>}
        text3={<Link to="/korisniciAdmin">Korisnici</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>
        <div className={styles.page}>
        <div  className={styles.heading}>
        <h1>Svi korisnici</h1>
        <Link to={`/dodavanjeKorisnika`}><ContainedButton module={styles.button} text={<AddIcon/>}/></Link>
        </div>
        {korisnici && <div>
        {korisnici.map((korisnik,index)=>(
        <div key={index} className={styles.item}>
        <KorisniciCard formHeading="Izmeni korisnika" ime={korisnik.FirstName} prezime={korisnik.LastName} korisnickoIme={korisnik.Username} email={korisnik.email} brojTelefona={korisnik.PhoneNumber} idKorisnika={korisnik.UserID} idAdmin={idAdmin}/>
        </div>
        ))}
        </div>
}
</div>
       
        </>
        
    )
}