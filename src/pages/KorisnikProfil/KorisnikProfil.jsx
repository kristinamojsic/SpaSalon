import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Profil from "../../components/Profil/Profil";
import { useState } from "react";
import { useEffect } from "react";
import { Services } from "../../services/Services";
export default function KorisnikProfil(){
    const idKorisnik=Services.uzimanjeSesijeId();
    const rola=Services.uzimanjeSesijeRola();
    const [korisnik,setKorisnik]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.mojProfil(idKorisnik);
            setKorisnik(response);
        };
        fetchData();
    },[idKorisnik]);
    return(
        <>
         <Navbar
        pocetna={rola}
        logo="KOZMETIČKI SALON"
        text2={<Link to="/zakazivanjeTermina">Zakaži termin</Link>}
        text3={<Link to="/terminiKorisnik">Termini</Link>}
        text4={<Link to="/profilKorisnik">Tvoj profil</Link>}
        text5="Odjavi se"/>
        {korisnik &&
        <Profil ime={korisnik.FirstName} prezime={korisnik.LastName} korisnickoIme={korisnik.Username} email={korisnik.email} brojTelefona={korisnik.PhoneNumber} link={`/azuriranjePodatakaKorisnik`}/>}
        </>
    )
}