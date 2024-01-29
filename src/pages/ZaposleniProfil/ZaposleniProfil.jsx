import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Profil from "../../components/Profil/Profil";
import { useState } from "react";
import { useEffect } from "react";
import { Services } from "../../services/Services";
export default function ZaposleniProfil(){
    const [zaposleni,setZaposleni]=useState([]);
    const idZaposleni=Services.uzimanjeSesijeId();
    const rola=Services.uzimanjeSesijeRola();
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.mojProfil(idZaposleni);
            setZaposleni(response);
        };
        fetchData();
    },[idZaposleni]);
    return(
        <>
        <Navbar
        pocetna={rola}
        logo="KOZMETIČKI SALON"
        text3={<Link to="/terminiZaposleni">Termini</Link>}
        text4={<Link to="/profilZaposleni">Tvoj profil</Link>}
        text5="Odjavi se"/>
        {zaposleni && <Profil ime={zaposleni.FirstName} prezime={zaposleni.LastName} korisnickoIme={zaposleni.Username} email={zaposleni.email} brojTelefona={zaposleni.PhoneNumber} link={`/azuriranjePodatakaZaposleni`}/>
        }
        </>
    )
}