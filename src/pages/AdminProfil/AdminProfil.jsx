import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Profil from "../../components/Profil/Profil";
import { useState } from "react";
import { useEffect } from "react";
import { Services } from "../../services/Services";


export default function AdminProfil(){
    const [korisnik,setKorisnik]=useState([]);
     const idAdmin=Services.uzimanjeSesijeId();
     const rola=Services.uzimanjeSesijeRola();
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.mojProfil(idAdmin);
            setKorisnik(response);
            console.log(response);
        };
        fetchData();
    },[idAdmin]);
   
    return(
        <>
       <Navbar
        pocetna={rola}
        logo="KOZMETIČKI SALON"
        text2={<Link to="/zaposleniAdmin">Zaposleni</Link>}
        text3={<Link to="/korisniciAdmin">Korisnici</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>
        {korisnik &&
        <Profil idKorisnik={idAdmin} ime={korisnik.FirstName} prezime={korisnik.LastName} korisnickoIme={korisnik.Username} email={korisnik.email} brojTelefona={korisnik.PhoneNumber} link={`/azuriranjePodatakaAdmin`}/>
}
        </>
    )
}