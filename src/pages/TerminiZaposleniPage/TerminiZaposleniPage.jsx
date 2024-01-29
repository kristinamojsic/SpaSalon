import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from "./TerminiZaposleniPage.module.css"
import { useState } from "react";
import { Services } from "../../services/Services";
import { useEffect } from "react";
import { format } from 'date-fns';
import BasicModal from "../../components/BasicModal/BasicModal";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContainedButton from "../../components/ContainedButton/ContainedButton";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ModalDodavanje from "../../components/ModalDodavanje/ModalDodavanje";
export default function TerminiZaposleniPage(){
    const idZaposleni=Services.uzimanjeSesijeId();
    const rola=Services.uzimanjeSesijeRola();
      const [tabValue, setTabValue] = useState(0);
      const [tabValue1, setTabValue1] = useState(0);
      const [usluge,setUsluge]=useState(null);
      const [uslugeIds,setUslugeIds]=useState(null);
      const [zakazaniTermini,setZakazaniTermini]=useState(null);
      const [slobodniTermini, setSlobodniTermini]=useState(null);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
      const handleTabChange1 = (event, newValue) => {
        setTabValue1(newValue);
    };
const theme = createTheme({
  palette: {
    primary: {
      main: '#fb6f92',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 25,
    fontWeight: 'bolder',
    tab: {
      color: '#fb6f92',
    },
  },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          borderBottom: '2px solid transparent',
          textAlign: 'center',
          '&.Mui-selected': {
            color: '#fb6f92',
            borderBottom: '2px solid currentColor',
            fontWeight:'bolder',
          },
        },
      },
    },

});
const theme1 = createTheme({
  palette: {
    primary: {
      main: '#fb6f92',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 18,
    fontWeight: 'bolder',
    tab: {
      color: '#fb6f92',
    },
  },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          borderBottom: '2px solid transparent',
          textAlign: 'center',
          '&.Mui-selected': {
            color: '#fb6f92',
            borderBottom: '2px solid currentColor',
            fontWeight:'bolder',
          },
        },
      },
    },

});

    useEffect(()=>{
      const fetchData=async()=>{
        const response=await Services.mojeUsluge(idZaposleni);
        console.log(response);
         const fetchedUsluge = response.map(usluga => usluga.ServiceName);
        const fetchedUslugeIds = response.map(usluga => usluga.ServiceID);
          setUsluge(fetchedUsluge);
          setUslugeIds(fetchedUslugeIds);
             if (fetchedUslugeIds.length > 0) {
            const terminiResponses = [];
            const slobodniResponses=[];
            for (const uslugaId of fetchedUslugeIds) {
                const terminiResponse = await Services.zakazaniTermini({
                    'idZaposlenog': idZaposleni,
                    'idUsluge': uslugaId
                });
                terminiResponses.push(terminiResponse);
                const slobodniResponse=await Services.zaposleniSlobodniTermini({'idZaposlenog':idZaposleni,
                 'idUsluge':uslugaId});
                slobodniResponses.push(slobodniResponse);
            }
            console.log(terminiResponses);
            console.log(slobodniResponses);
            setZakazaniTermini(terminiResponses);
            setSlobodniTermini(slobodniResponses);
  
        }
      };
      fetchData();
    },[slobodniTermini,zakazaniTermini]);
  
    return (
        <>
       <Navbar
        pocetna={rola}
        logo="KOZMETIČKI SALON"
        text3={<Link to="/terminiZaposleni">Termini</Link>}
        text4={<Link to="/profilZaposleni">Tvoj profil</Link>}
        text5="Odjavi se"/>
        <ToastContainer/>
         <ThemeProvider theme={theme}>
          <div className={styles.tabBox}>
         <Tabs value={tabValue} onChange={handleTabChange} >
        {usluge && usluge.map((usluga,index)=>(
         <Tab label={usluga} key={index}  className={styles.tabs}/>
       
        ))}
        </Tabs>
        </div>
         </ThemeProvider>
         {tabValue>=0 &&
        <>
        
        <ThemeProvider theme={theme1}>
        <div className={styles.tabBox}>
        <Tabs value={tabValue1} onChange={handleTabChange1}>
          <Tab label="Zakazani termini"  className={styles.tabs}/>
        <Tab label="Slobodni termini" className={styles.tabs}/>
        </Tabs>
        </div>
        </ThemeProvider>
       
       {tabValue1 === 0 && usluge && uslugeIds && zakazaniTermini && (
    <div>
        {zakazaniTermini[tabValue].termini && (
           zakazaniTermini[tabValue].termini.map((termin,index)=>(
           <div key={index} className={styles.zakazaniBox}>
            <p>{termin.FirstName} {termin.LastName}</p>
            <p>{format(new Date(termin.AppointmentDateTime), 'dd.MM.yyyy. HH:mm')}</p>
           </div>
           ))
        )}
        {!zakazaniTermini[tabValue].termini && (
          <h3 className={styles.error}>Nema zakazanih termina u narednom periodu!</h3>
        )}
    </div>
)}
       {tabValue1===1 && usluge && uslugeIds && slobodniTermini && (
        <div>
          <ModalDodavanje label={<ContainedButton module={styles.button} text={<AddIcon/>}/>} idZaposlenog={idZaposleni} idUsluge={uslugeIds[tabValue]}/>
           {slobodniTermini[tabValue].termini && (
           slobodniTermini[tabValue].termini.map((termin,index)=>(
           <div key={index} className={styles.slobodniBox}>
            <p>{format(new Date(termin.AppointmentDateTime), 'dd.MM.yyyy. HH:mm')}</p>
              <BasicModal label={<ContainedButton module={styles.button} text={<DeleteIcon/>}/>} text={<p className={styles.modalText}>Da li si siguran da želiš da obrišeš termin?</p>} 
        onConfirm={async()=>{
        const response=await Services.obrisiTermin(termin.AppointmentID);
        if(response==='Uspesno obrisan termin.'){
         toast.success("Termin je uspešno obrisan!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        }else{
            toast.error("Došlo je do greške. Pokušajte ponovo!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        }
        }}
        />
           </div>
           ))
        )}
        {!slobodniTermini[tabValue].termini && (
          <h3 className={styles.error}>Nema slobodnih termina!</h3>
        )}
        </div>
       )} 
        </>}
        </>
    )
}