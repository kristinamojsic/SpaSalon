import React from 'react';
import './KorisnikTermini.css';
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function KorisnikTermini() {
 
  return (
    <>
    <Navbar
                logo={<Link to="/">KOZMETIČKI SALON</Link>}
                text1="O nama"
                text2={<Link to="/usluge">Usluge</Link>}
                text3="Cenovnik"
                text4={<Link to="/prijava">Prijavi se</Link>}
                text5={<Link to="/registracija">Registruj se</Link>}
    />
    <div className="container">
      <div className="box">
        <h1 className="heading">Vaši zakazani termini</h1>
          <div  className="appointment">
            <div className="detail">Termin ID:AppointmentID</div>
            <div className="detail">Datum i vreme: AppointmentDateTime</div>
            <div className="description">Korisnik ID: CustomerID</div>
            <div className="description">Usluga ID: ServiceID</div>
            <div className="description">Zaposleni ID: EmployeeID</div>
            <div className="description">Dostupan: </div>
            <div className="button">
              <button className="edit-button">Izmeni</button>
            </div>
          </div>
      </div>
      </div>
    </>
  );
};