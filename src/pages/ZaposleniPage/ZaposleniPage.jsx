import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { Services } from "../../services/Services";
import Footer from "../../components/Footer/Footer";
import Section from '../../components/Section/Section';
import styled from 'styled-components';

export default function ZaposleniPage(){
    const rola=Services.uzimanjeSesijeRola();
    return(
        <>
       <Navbar
        pocetna={rola}
        logo="KOZMETIČKI SALON"
        text3={<Link to="/terminiZaposleni">Termini</Link>}
        text4={<Link to="/profilZaposleni">Tvoj profil</Link>}
        text5="Odjavi se"/>
        <Container>
    
    <Section
        title="Manikir"
        description="Nudimo Vam uslugu klasičnog manikira i manikira sa ojačanjem noktiju"
        image="1.jpg"
        pageType="zaposleni"
    />
    <Section
        title="Masaža"
        description="Relax i Sportske masaže sa stručnim licima"
        image="3.jpg"
        pageType="zaposleni"
    />
    <Section
        title="Šminkanje"
        description="Profesionalno šminkanje za sve prilike"
        image="12.jpg"
        pageType="zaposleni"
    />
    <Section
        title="Frizure za svačiji ukus"
        description="Ne postoji frizura koju naša frizerka ne ume da napravi"
        image="5.jpg"
        pageType="zaposleni"
    />
    <Section
        title="Veliki izbor boja"
        description="Za usluge manikira i pedikira spremili smo široku paletu nijansi za vas"
        image="6.jpg"
        pageType="zaposleni"
    />
    <Section
        title="Šišanje + Feniranje"
        description="Kombinacija ovih usluga po najpovoljnijim cenama u gradu"
        image="13.jpg"
        pageType="zaposleni"
    />
    <Section
        title="Prepustite se stručnim licima"
        description="Opustite se posle stresnog dana uz RELAX masažu i uživajte"
        image="2.jpg"
        pageType="zaposleni"
    />
</Container>
<Footer></Footer>

        </>
    )
}
const Container = styled.div`
    height: 100vh;
`;