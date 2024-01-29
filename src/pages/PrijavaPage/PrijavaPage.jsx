import React from "react";
import { TextField } from "@mui/material";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./PrijavaPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Services } from "../../services/Services";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
export default function PrijavaPage(){
   const { register, handleSubmit, formState: { errors } } = useForm();
   const navigate=useNavigate();
   const onSubmit=async(data)=>{
    const response=await Services.prijava({'korisnickoIme':data.korisnickoIme,
'password':data.password});
console.log(response);
  if(response && response.poruka==='Uspesna prijava'){
    console.log(response);
    Services.cuvanjeSesije({'idKorisnika':response.autorizovan,'idRole':response.rola});
    console.log(response.autorizovan);
    console.log(response.rola);
    if(response.rola==1){
        navigate("/admin");  
    }
    else if(response.rola==2){
        navigate("/zaposleni");  
    }
    else if(response.rola==3){
         navigate("/korisnik"); 
    }
   }else{
toast.error("Korisničko ime ili lozinka su pogrešni! Pokušajte ponovo!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose:1500,
        });
   }
}

   
    return(
        <>
    <Navbar
        logo="KOZMETIČKI SALON"
        text2={<Link to="/usluge">Usluge</Link>}
        text3={<Link to="/prijava">Prijavi se</Link>}
        text4={<Link to="/registracija">Registruj se</Link>}
        />
    <ToastContainer/>
  <div className={styles.parent}>
        <div className={styles.form}>
            <div className={styles.formItems}>
            <h1 className={styles.heading}>Prijavi se</h1>  
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.item}>
                <TextField
                    id="korisnickoIme"
                    label="Korisničko ime"
                    variant="outlined"
                    name="korisnickoIme"
                    className={styles.field}
                    {...register('korisnickoIme', { required: true })}/>
                     {errors.korisnickoIme && <p className={styles.error}>Korisničko ime je obavezno.</p>}
            </div>
            <div className={styles.item}>
                <TextField
                    id="password"
                    name="password"
                    label="Lozinka"
                    variant="outlined"
                    className={styles.field}
                    type="password"
                {...register('password',{required:true})} />
                {errors.password && <p className={styles.error}>Lozinka je obavezna!</p>}
                
            </div>
            <ContainedButton text="POTVRDI" module={styles.button} type="submit" />
            </form>
            <div className={styles.link}>
                        <p>Nemaš nalog? <Link style={{ color: '#fb6f92' }} to="/registracija">REGISTRUJ SE!</Link></p>
            </div> 
                </div>


        </div>
            </div>
        </>
    
    )
}
