import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Opis from "../../components/Opis/Opis";
import Footer  from "../../components/Footer/Footer";

export default function OpisUsluge() {
    return (
        <>
        <Navbar
        logo="KOZMETIČKI SALON"
        text2={<Link to="/usluge">Usluge</Link>}
        text3={<Link to="/prijava">Prijavi se</Link>}
        text4={<Link to="/registracija">Registruj se</Link>}
        />
            <Opis></Opis>
            <Footer></Footer>
        </>
    );
}
