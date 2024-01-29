
import { AutoFixOffTwoTone } from "@mui/icons-material";
import { apiEndpoints } from "../utils/apiUrls";
import axios from "axios";
const prijava=async({korisnickoIme, password})=>{
    try{
        const response=await axios.post(`${apiEndpoints.endpointPrijava}.php`,{korisnickoIme,password});
        return response.data;
    } catch (error) {
        console.error("Greška pri prijavljivanju:", error);
        return error.response.data.poruka;
    } 
};
const registracija=async({ime,prezime,brojTelefona,email,korisnickoIme,password,password_confirmation})=>{
    try{
    const response=await axios.post(`${apiEndpoints.endpointRegistracija}.php`,{ime,prezime,brojTelefona,email,korisnickoIme,password, password_confirmation});
    return response.data.poruka;
    }
    catch (error) {
        console.error("Greška pri registrovanju:", error);
        return error.response.data.poruka;
    }
}
const dodajKorisnika=async({ime,prezime,brojTelefona,email,korisnickoIme,password,rola,usluga})=>{
    try{
        const response=await axios.post(`${apiEndpoints.endpointDodajKorisnika}.php?rola=${rola}`,{ime,prezime,brojTelefona,email,korisnickoIme,password,usluga});
        return response;
    }
    catch (error) {
        console.log("Greška pri dodavanju:", error);
        return null;
    }
}
const mojProfil=async(idKorisnik)=>{
    try{
    const response=await axios.get(`${apiEndpoints.endpointMojProfil}.php?idKorisnika=${idKorisnik}`);
    return response.data.podaciOKorisniku;}
    catch(error){
        console.log('error:',error);
    }
}
const sviKorisnici=async()=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointSviKorisnici}.php`);
        return response.data.korisnici;
    }
    catch(error){
        return error.response.data;
    }
}
const sviZaposleni=async()=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointSviZaposleni}.php`);
        return response.data.zaposleni;
    }
    catch(error){
        console.log('error:',error);
    }
}
const azurirajPodatke=async({idKorisnika,ime,prezime,email,brojTelefona,korisnickoIme,password,password_confirmation})=>{
    try{
    const response=await axios.put(`${apiEndpoints.endpointAzurirajPodatke}.php?idKorisnika=${idKorisnika}`,{ime:ime,
        prezime:prezime,
        email:email,
        brojTelefona:brojTelefona,
        korisnickoIme:korisnickoIme,
        password:password,
        password_confirmation:password_confirmation});
return response.data.poruka;
    }
    catch(error){
        console.log("error:",error);
        return error.response.data.poruka;
    }
}
const izmeniKorisnika=async({idKorisnika,ime,prezime,email,brojTelefona,korisnickoIme,lozinka})=>{
    try{
        const response=await axios.put(`${apiEndpoints.endpointIzmeniKorisnika}?idKorisnika=${idKorisnika}.php`,{
            ime:ime,
            prezime:prezime,
            email:email,
            brojTelefona:brojTelefona,
            korisnickoIme:korisnickoIme,
            lozinka:lozinka
        });
        return response.data.poruka;
    }
    catch(error){
        console.log('error:',error);
        return error.response.data.poruka;
    }
}
const zakazaniTermini=async({idZaposlenog,idUsluge})=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointZakazaniTermini}.php?idZaposlenog=${idZaposlenog}&idUsluge=${idUsluge}`);
        return response.data;
    }
    catch(error){
        console.log('error:',error);
        return error.response.data.poruka;
    }
}
const sveUsluge=async()=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointSveUsluge}.php`);
        return response.data.usluge;
    }
    catch(error){
        console.log('error:',error);
    }
}
const mojeUsluge=async(idZaposlenog)=>{
try{
    const response=await axios.get(`${apiEndpoints.endpointMojeUsluge}.php?idZaposlenog=${idZaposlenog}`);
    return response.data.usluge;
}
catch(error){
    console.log('error:',error);
}
}
const podaciOUsluzi=async(idUsluge)=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointPodaciOUsluzi}.php?idUsluge=${idUsluge}`);
        return response.data.podaciOUsluzi;
    }
    catch(error){
        console.log('error:',error);
    }
}
const korisniciSlobodniTermini=async({idUsluge,datum})=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointKorisniciSlobodniTermini}.php?idUsluge=${idUsluge}&datum=${datum}`);
        return response.data;
    }
    catch(error){
        console.log('error:',error);
        return error.response.data.poruka;
    }
}
const zakaziTermin=async({idKorisnika,idTermina})=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointZakaziTermin}.php?idKorisnika=${idKorisnika}&idTermina=${idTermina}`);
        return response.data.poruka;
    }catch(error){
        console.log('error',error);
        return error.response.data.poruka;
    }
}
const korisniciZakazaniTermini=async(idKorisnika)=>{
    try{
    const response=await axios.get(`${apiEndpoints.endpointKorisniciZakazaniTermini}.php?idKorisnika=${idKorisnika}`);
    return response.data;
}catch(error){
    return error.response.data.poruka;
}}
const otkaziTermin=async({idKorisnika,idTermina})=>{
    try{
    const response=await axios.get(`${apiEndpoints.endpointOtkaziTermin}.php?idKorisnika=${idKorisnika}&idTermina=${idTermina}`);
    return response.data.poruka;
    }
    catch(error){
        console.log('error:',error);
        return error.response.data.poruka;
    }

}
const cuvanjeSesije = ({ idKorisnika, idRole }) => {
    const data = {
        idKorisnika: idKorisnika,
        idRole: idRole
    };

    sessionStorage.setItem('userData', JSON.stringify(data));
}
const brisanjeSesije=()=>{
    sessionStorage.clear();
}
const uzimanjeSesijeId = () => {
    const storedData = sessionStorage.getItem('userData');

    if (storedData) {
        const userData = JSON.parse(storedData);
        return userData.idKorisnika;
    }

    return null; 
}
const uzimanjeSesijeRola = () => {
    const storedData = sessionStorage.getItem('userData');

    if (storedData) {
        const userData = JSON.parse(storedData);
        return userData.idRole;
    }

    return null; 
}
const obrisiKorisnika=async({idKorisnika, rola})=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointObrisiKorisnika}.php?idKorisnika=${idKorisnika}&rola=${rola}`);
        return response.data.poruka;
    }
    catch(error){
        console.log('error:',error);
        return error.response.data.poruka;
    }

}
const zaposleniSlobodniTermini=async({idZaposlenog,idUsluge})=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointZaposleniSlobodniTermini}.php?idZaposlenog=${idZaposlenog}&idUsluge=${idUsluge}`);
        return response.data;
    }
    catch(error){
        console.log('error:',error);
        return error.response.data.poruka;
    }
}
const obrisiTermin=async(idTermina)=>{
    try{
        const response=await axios.get(`${apiEndpoints.endpointObrisiTermin}.php?idTermina=${idTermina}`);
        return response.data.poruka;
    }
    catch(error){
        console.log('error:',error);
        return error.response.data.poruka;
    }
}
const dodajTermin=async({idZaposlenog, termin,idUsluge})=>{
    try{
       const response=await axios.post(`${apiEndpoints.endpointDodajTermin}.php?idZaposlenog=${idZaposlenog}`,{
        'termin':termin,
        'idUsluge':idUsluge
       });
       return response.data.poruka;
    }catch(error){
        console.log('error:',error);
        return error.response.data.poruka;
    }
}
export const Services={
    prijava,
    registracija,
    dodajKorisnika,
    mojProfil,
    sviKorisnici,
    sviZaposleni,
    azurirajPodatke,
    izmeniKorisnika,
    zakazaniTermini,
    sveUsluge,
    mojeUsluge,
    podaciOUsluzi,
    korisniciSlobodniTermini,
    cuvanjeSesije,
    brisanjeSesije,
    uzimanjeSesijeId,
    uzimanjeSesijeRola,
    zakaziTermin,
    korisniciZakazaniTermini,
    otkaziTermin,
    obrisiKorisnika,
    zaposleniSlobodniTermini,
    obrisiTermin,
    dodajTermin

}
