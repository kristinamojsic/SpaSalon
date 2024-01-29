import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { Services } from "../../services/Services";
import Footer from "../../components/Footer/Footer";
import Section from '../../components/Section/Section';
import styled from 'styled-components';
export default function AdminPage(){
    const rola=Services.uzimanjeSesijeRola();
    console.log(rola);
    return(
        <>
         <Navbar
        pocetna={rola}
        logo="KOZMETIČKI SALON"
        text2={<Link to="/zaposleniAdmin">Zaposleni</Link>}
        text3={<Link to="/korisniciAdmin">Korisnici</Link>}
        text4={<Link to="/profilAdmin">Tvoj profil</Link>}
        text5="Odjavi se"/>
        <Container>
             <Section
        title="Manikir"
        description="Nudimo Vam uslugu klasičnog manikira i manikira sa ojačanjem noktiju"
        image="1.jpg"
        pageType="korisnik"
    />
         <Section
        title="Masaža"
        description="Relax i Sportske masaže sa stručnim licima"
        image="3.jpg"
        pageType="korisnik"
    />
    <Section
        title="Šminkanje"
        description="Profesionalno šminkanje za sve prilike"
        image="12.jpg"
        pageType="korisnik"
    />
    <Section
        title="Frizure za svačiji ukus"
        description="Ne postoji frizura koju naša frizerka ne ume da napravi"
        image="5.jpg"
        pageType="korisnik"
    />
    <Section
        title="Veliki izbor boja"
        description="Za usluge manikira i pedikira spremili smo široku paletu nijansi za vas"
        image="6.jpg"
        pageType="korisnik"
    />
    <Section
        title="Šišanje + Feniranje"
        description="Kombinacija ovih usluga po najpovoljnijim cenama u gradu"
        image="13.jpg"
        pageType="korisnik"
    />
    <Section
        title="Prepustite se stručnim licima"
        description="Opustite se posle stresnog dana uz RELAX masažu i uživajte"
        image="2.jpg"
        pageType="korisnik"
    />
</Container>
<Footer></Footer>
        </>
    )
}
const Container = styled.div`
    height: 100vh;
`;