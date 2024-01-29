import React from "react";
import styles from "./Navbar.module.css"
import { Services } from "../../services/Services";
import { useNavigate } from "react-router-dom";
export default function Navbar(props){
    const navigate=useNavigate();
    const handleClick=()=>{
        Services.brisanjeSesije();
        navigate("/prijava");
    }
    const handleLogoClick=()=>{
        if(props.pocetna==1){
            navigate("/admin");
        }else if(props.pocetna==2){
            navigate("/zaposleni");
        }else if(props.pocetna==3){
            navigate("/korisnik");
        }else{
            navigate("/");
        }
    }
    return(
        <div className={styles.navbar}> 
        <p className={styles.logo} onClick={handleLogoClick}>{props.logo}</p>
        <p className={styles.options}>{props.text1}</p>
        <p className={styles.options}>{props.text2}</p>
        <p className={styles.options}>{props.text3}</p>
        <p className={styles.options}>{props.text4}</p>
        <p className={styles.options} onClick={handleClick}>{props.text5}</p>
        </div>
    )
    
}
