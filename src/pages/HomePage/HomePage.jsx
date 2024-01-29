import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Section from '../../components/Section/Section';
import styled from 'styled-components';


export default function HomePage(){
    const navigate = useNavigate();

    const handleViewServicesClick = () => {
        navigate("usluge");
    };

    const handleBookingClick = () => {
        navigate("prijava");
    };

    return(
        <>
        <Navbar
        logo="KOZMETIČKI SALON"
        text2={<Link to="/usluge">Usluge</Link>}
        text3={<Link to="/prijava">Prijavi se</Link>}
        text4={<Link to="/registracija">Registruj se</Link>}
        />

<Container>
    
            <Section
                title="Manikir"
                description="Nudimo Vam uslugu klasičnog manikira i manikira sa ojačanjem noktiju"
                image="1.jpg"
                leftbtn={<div onClick={handleViewServicesClick}>Pogledaj sve usluge</div>}
                rightbtn={<div onClick={handleBookingClick}>Zakazivanje</div>}
            />
            <Section
                title="Masaža"
                description="Relax i Sportske masaže sa stručnim licima"
                image="3.jpg"
                leftbtn={<div onClick={handleViewServicesClick}>Pogledaj sve usluge</div>}
                rightbtn={<div onClick={handleBookingClick}>Zakazivanje</div>}
            />
            <Section
                title="Šminkanje"
                description="Profesionalno šminkanje za sve prilike"
                image="12.jpg"
                leftbtn={<div onClick={handleViewServicesClick}>Pogledaj sve usluge</div>}
                rightbtn={<div onClick={handleBookingClick}>Zakazivanje</div>}
            />
            <Section
                title="Frizure za svačiji ukus"
                description="Ne postoji frizura koju naša frizerka ne ume da napravi"
                image="5.jpg"
                leftbtn={<div onClick={handleViewServicesClick}>Pogledaj sve usluge</div>}
                rightbtn={<div onClick={handleBookingClick}>Zakazivanje</div>}
            />
            <Section
                title="Veliki izbor boja"
                description="Za usluge manikira i pedikira spremili smo široku paletu nijansi za vas"
                image="6.jpg"
                leftbtn={<div onClick={handleViewServicesClick}>Pogledaj sve usluge</div>}
                rightbtn={<div onClick={handleBookingClick}>Zakazivanje</div>}
            />
            <Section
                title="Šišanje + Feniranje"
                description="Kombinacija ovih usluga po najpovoljnijim cenama u gradu"
                image="13.jpg"
                leftbtn={<div onClick={handleViewServicesClick}>Pogledaj sve usluge</div>}
                rightbtn={<div onClick={handleBookingClick}>Zakazivanje</div>}
            />
            <Section
                title="Prepustite se stručnim licima"
                description="Opustite se posle stresnog dana uz RELAX masažu i uživajte"
                image="2.jpg"
                leftbtn={<div onClick={handleViewServicesClick}>Pogledaj sve usluge</div>}
                rightbtn={<div onClick={handleBookingClick}>Zakazivanje</div>}
            />
        </Container>
<Footer></Footer>
        </>
    )
}
const Container = styled.div`
    height: 100vh;
`;