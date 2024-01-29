import React from "react";
import styles from "./Opis.module.css";
import { Services } from "../../services/Services";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
export default function Opis() {
    const {idUsluge}=useParams();
    const [usluga,setUsluga]=useState(null);
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await Services.podaciOUsluzi(idUsluge);
            setUsluga(response[0]);
        };
         fetchData();
    },[idUsluge]);

    return (
        <>
       {usluga && <div className={styles.container}>
            <div className={styles.box}>
                <h2 className={styles.heading}>{usluga.ServiceName}</h2>
                <p className={styles.detail}>Trajanje: {usluga.ServiceDuration}</p>
                <p className={styles.detail}>Cena: {usluga.ServicePrice} dinara</p>
                <p className={styles.detail}>Materijal: {usluga.ServiceMaterials}</p>
                <p className={styles.description}>
                    {usluga.ServiceDescription}
                </p>
                <div className={styles.button}>
                    <a href="/usluge">Nazad na sve usluge</a>
                </div>
            </div>
        </div>
}</>);
}