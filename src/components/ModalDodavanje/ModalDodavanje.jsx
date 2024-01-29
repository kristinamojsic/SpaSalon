import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './ModalDodavanje.module.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ContainedButton from '../ContainedButton/ContainedButton';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns'; 
import { Services } from '../../services/Services';
import { Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
export default function ModalDodavanje(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {handleSubmit, control}=useForm();
  const onSubmit=async(data)=>{
     const formattedDate = format(data.datumVreme.$d, 'yy-MM-dd HH:mm:ss');
     console.log(formattedDate);
     const response=await Services.dodajTermin({'idZaposlenog':props.idZaposlenog,
     'termin':formattedDate,
     'idUsluge':props.idUsluge
  });
  if(response==='Termin uspešno dodat.'){
     toast.success("Termin je uspešno dodat!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        handleClose();
  }else if(response==='Nemoguce zakazati-u tom terminu ste zauzeti'){
      toast.error("U ovom terminu si već zauzet! Izaberi drugo vreme!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1700,
        });
  }else {
    toast.error("Došlo je do greške prilikom dodavanja! Pokušaj ponovo!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
  }}
  return (
    <div>
      <ToastContainer/>
      <p className={styles.label} onClick={handleOpen}>{props.label}</p>
      <Modal 
        open={open}
        onClose={handleClose}
      >
    <Box className={styles.box}>
          <CloseIcon onClick={handleClose} className={styles.close} variant="large"/>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
       <Controller
        name="datumVreme"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <div className={styles.item}>
            <p className={styles.label}>Izaberi vreme termina:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
              disablePast  
              className={styles.picker}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            </LocalizationProvider>
          </div>
        )}

      />

    <ContainedButton text="Dodaj" module={styles.button} type="submit"/>
    </form>
           
        </Box>
      </Modal>
    </div>
  );
}
