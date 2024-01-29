import React from "react";
import { Select } from "@mui/material";
import {MenuItem} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useForm, Controller } from 'react-hook-form';
import { Services } from "../../services/Services";
import { useEffect } from "react";
import { useState } from "react";
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import SearchIcon from '@mui/icons-material/Search';
import BasicModal from "../../components/BasicModal/BasicModal";
import styles from "./ZakazivanjeTerminaPage.module.css";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns'; 
import { dateTimePickerTabsClasses } from "@mui/x-date-pickers";
export default function ZakazivanjeTerminaPage(){
    const idKorisnik=Services.uzimanjeSesijeId();
    const rola=Services.uzimanjeSesijeRola();
    const [usluge,setUsluge]=useState([]);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [termini, setTermini]=useState(null);
    const [error, setError]=useState(null);
    const[terminiIds,setTerminiIds]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchData=async()=>{
            const uslugeResponse=await Services.sveUsluge();
            setUsluge(uslugeResponse);
        };
        fetchData();
    },[idKorisnik]);
    const onSubmit=async(data)=>{
        setTermini(null);
    const nazivUsluge = data.usluga;
const selectedUsluga = usluge.find((usluga) => usluga.ServiceName === nazivUsluge);
const dateObject = new Date(data.datum.$d);
const formattedDate = format(dateObject, 'yy-MM-dd');
console.log(formattedDate);

if (selectedUsluga) {
    const selectedUslugaId = selectedUsluga.ServiceID;
    const response=await Services.korisniciSlobodniTermini({
        'idUsluge':selectedUslugaId,
        'datum':formattedDate,
    });
    
    if(response!=='Nema slobodnih termina za Vašu pretragu'){
        setTermini(response.termini);
        console.log(response.termini);
        const terminiIds=response.termini.map((termin)=>(
           termin.appointment_ids.split(',')
        ))
        console.log(terminiIds);
        setTerminiIds(terminiIds);
    }else {
        setError(response);
    }
    
    }}


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
           {usluge && <form method="get" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.searchBox}>
            
           <Controller
              name="usluga"
              control={control}
              defaultValue={['']}
              render={({ field }) => (
               <div className={styles.item}>
                <p className={styles.label}>Izaberi uslugu:</p>
                <Select
                  sx={{width:226}}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {usluge && usluge.map((usluga, index) => (
                    <MenuItem key={index} value={usluga.ServiceName}>
                      {usluga.ServiceName}
                    </MenuItem>
                  ))}
                </Select>
                </div>  
              )}
            />
            
             <Controller
        name="datum"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <div className={styles.item}>
            <p className={styles.label}>Izaberi datum:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              sx={{width:220}}
              disablePast  
              className={styles.picker}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            </LocalizationProvider>
          </div>
        )}

      />

    <div className={styles.item}>
          <ContainedButton text={<SearchIcon/>} type="submit" module={styles.button}/>
          </div>
          </div>
        </form>}
      <div className={styles.box}>
{termini? (
  termini.map((termin, index) => (
      <div className={styles.osoba}  key={index}>
        <p className={styles.heading}>
          <span>{termin.FirstName} </span>
          <span>{termin.LastName}</span>
          
        </p>
        <div className={styles.termini}>
             {termin.appointments.split(',').map((vreme, appIndex)=> (
              <BasicModal label={<p key={appIndex}>{vreme}</p>} text={
                <p className={styles.modalText}>Da li si siguran da želiš da zakažeš termin u {vreme}?</p>} onConfirm={async()=>{
                  const response=await Services.zakaziTermin({'idKorisnika': idKorisnik,
                'idTermina':terminiIds[index][appIndex]});
                  if(response==='Uspešno ste zakazali termin.'){
                  toast.success("Termin je uspešno zakazan!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        setTimeout(() => {
             navigate("/terminiKorisnik");
      },2000);}
        
        else{
          toast.error("Došlo je do greške. Pokušaj ponovo!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        }
  

             }}/>
             ))} 
        
        </div>
      </div>
    
  ))
) : error? (<h3 className={styles.error}>Nema slobodnih termina za tvoju pretragu!</h3>):null
          }
          </div>
</>)}
        
