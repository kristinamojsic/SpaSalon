import React from "react";
import UslugaThumbnail from "../../components/UslugaThumbnail/UslugaThumbnail";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./UslugePage.module.css";
import { useEffect } from "react";
import { Services } from "../../services/Services";
import { useState } from "react";
export default function UslugePage(){
    const [usluge,setUsluge]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.sveUsluge();
            setUsluge(response);
            console.log(response);
        };
        fetchData();
    },[]);
    return(
        <>
       <Navbar
        logo="KOZMETIČKI SALON"
        text2={<Link to="/usluge">Usluge</Link>}
        text3={<Link to="/prijava">Prijavi se</Link>}
        text4={<Link to="/registracija">Registruj se</Link>}
        />
        <div className={styles.page}>
        {usluge && <div className={styles.uslugeGrid}>
            {usluge.map((usluga,index)=>(
                <UslugaThumbnail key={index} nazivUsluge={usluga.ServiceName} cenaUsluge={usluga.ServicePrice} idUsluge={usluga.ServiceID}/>))}
            </div>}
        </div>
        </>
    )
}