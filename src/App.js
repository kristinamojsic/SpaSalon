import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import PrijavaPage from './pages/PrijavaPage/PrijavaPage';
import RegistracijaPage from './pages/RegistracijaPage/RegistracijaPage';
import AdminPage from './pages/AdminPage/AdminPage';
import SviKorisniciPage from './pages/SviKorisniciPage/SviKorisniciPage';
import SviZaposleniPage from './pages/SviZaposleniPage/SviZaposleniPage';
import UslugePage from './pages/UslugePage/UslugePage';
import ZaposleniPage from './pages/ZaposleniPage/ZaposleniPage';
import TerminiZaposleniPage from './pages/TerminiZaposleniPage/TerminiZaposleniPage';
import KorisnikPage from "./pages/KorisnikPage/KorisnikPage";
import ZaposleniProfil from './pages/ZaposleniProfil/ZaposleniProfil';
import KorisnikProfil from './pages/KorisnikProfil/KorisnikProfil';
import AdminProfil from './pages/AdminProfil/AdminProfil';
import IzmenaForm from './components/IzmenaForm/IzmenaForm';
import IzmenaAdmin from './pages/IzmenaAdmin/IzmenaAdmin';
import DodavanjeForm from './components/DodavanjeForm/DodavanjeForm';
import ZakazivanjeTerminaPage from './pages/ZakazivanjeTerminaPage/ZakazivanjeTerminaPage';
import TerminiKorisnikPage from './pages/TerminiKorisnikPage/TerminiKorisnikPage';
import OpisUsluge from './pages/OpisUsluge/OpisUsluge';

function App() {
    return ( <
        BrowserRouter >
        <
        Routes >
        <
        Route path = "/"
        element = { < HomePage / > }
        /> <
        Route path = "/prijava"
        element = { < PrijavaPage / > }
        />  <
        Route path = "/registracija"
        element = { < RegistracijaPage / > }
        /> <
        Route path = "/admin"
        element = { < AdminPage / > }
        /> <
        Route path = "/profilZaposleni"
        element = { < ZaposleniProfil / > }
        /> <
        Route path = "/korisniciAdmin"
        element = { < SviKorisniciPage / > }
        /> <
        Route path = "/zaposleniAdmin"
        element = { < SviZaposleniPage / > }
        /> <
        Route path = "/usluge"
        element = { < UslugePage / > }
        /> <
        Route path = "/zaposleni"
        element = { < ZaposleniPage / > }
        /> <
        Route path = "/terminiZaposleni"
        element = { < TerminiZaposleniPage / > }
        /> <
        Route path = "/terminiKorisnik"
        element = { < TerminiKorisnikPage / > }
        /> <
        Route path = "/korisnik"
        element = { < KorisnikPage / > }
        /> <
        Route path = "/profilKorisnik"
        element = { < KorisnikProfil / > }
        /> <
        Route path = "/profilAdmin"
        element = { < AdminProfil / > }
        /> <
        Route path = "/azuriranjePodatakaAdmin"
        element = { < IzmenaForm uloga = "Administrator" / > }
        /> <
        Route path = "/azuriranjePodatakaZaposleni"
        element = { < IzmenaForm uloga = "Zaposleni" / > }
        /> <
        Route path = "/azuriranjePodatakaKorisnik"
        element = { < IzmenaForm uloga = "Korisnik" / > }
        /> <
        Route path = "/izmenaKorisnika/:idKorisnik"
        element = { < IzmenaAdmin / > }
        /> <
        Route path = "/izmenaZaposlenog/:idZaposleni"
        element = { < IzmenaAdmin / > }
        /> <
        Route path = "/dodavanjeKorisnika"
        element = { < DodavanjeForm uloga = "Korisnik"
            heading = "Dodaj korisnika:" / > }
        /> <
        Route path = "/dodavanjeZaposlenog"
        element = { < DodavanjeForm uloga = "Zaposleni"
            heading = "Dodaj zaposlenog:" / > }
        /> <
        Route path = "/zakazivanjeTermina"
        element = { < ZakazivanjeTerminaPage / > }
        /> <
        Route path = "/opisUsluge/:idUsluge"
        element = { < OpisUsluge / > }
        />




        </Routes> 
        </BrowserRouter>
    );
}

export default App;