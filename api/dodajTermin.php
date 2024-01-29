<?php
//dodavanje termina od strane zaposlenog za neku uslugu
//dodati sve sem customerID

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once("db.php");


function dodajVreme($pocetak, $trajanje)
{
    $pocetakObj = new DateTime($pocetak);
    $interval = new DateInterval("PT" . $trajanje . "M");
    $krajObj = $pocetakObj->add($interval);
    
    return $krajObj->format("H:i:s");
}

function formatiranjeDatuma($datum,$format)
{
    $datumObj = new DateTime($datum);
    $formatiranDatum = $datumObj->format($format);
    return $formatiranDatum;
}

function proveriTermin($conn, $idZaposlenog, $terminDatum,$terminSati)
{
    $sql = "SELECT salonservice.ServiceDuration as trajanje, TIME(AppointmentDateTime) as pocetak FROM appointment INNER JOIN salonservice ON appointment.ServiceID = salonservice.ServiceID WHERE EmployeeID = '$idZaposlenog' AND CAST(AppointmentDateTime AS DATE) = '$terminDatum'";
    $result = $conn->query($sql);
    $termini =  $result->fetch_all(MYSQLI_ASSOC);
    
    foreach($termini as $termin)
    {
        $krajTermina = dodajVreme($termin['pocetak'], $termin['trajanje']);
        
        if($terminSati<$krajTermina && $terminSati>$termin['pocetak'])
        {
            return false;
        }
    }
    return true;
}

$metoda = $_SERVER['REQUEST_METHOD'];


if ($metoda == 'POST'){
    // idZaposlenog poslati sa fronta, uzeti iz sesije

    $idZaposlenog = $_GET['idZaposlenog'];
    
    $data = json_decode(file_get_contents("php://input"),true);
    //tamo mu izbacuje sve njegove usluge - endpoint mojeUsluge pa bira neku od njih za koju zakazuje termin
    $idUsluge = $data['idUsluge'];
    $termin = $data['termin'];
    $available = 1;

    $terminDatum = formatiranjeDatuma($termin,"Y-m-d");
    $terminSati = formatiranjeDatuma($termin,"H:i:s"); 
    
    if(!proveriTermin($conn,$idZaposlenog,$terminDatum,$terminSati))
    {
        http_response_code(400);
        echo json_encode(['poruka'=>"Nemoguce zakazati-u tom terminu ste zauzeti"]);
        exit;
    }

    $formatiranDatum = formatiranjeDatuma($termin,"Y-m-d H:i:s");

    $sql = "INSERT INTO appointment (AppointmentDateTime, ServiceID, EmployeeID, available) VALUES ('$formatiranDatum', '$idUsluge','$idZaposlenog','$available')";
           
    if ($conn->query($sql) === TRUE) {
        
        echo json_encode(['poruka' => 'Termin uspešno dodat.']);
        //prikazati poruku na frontu da je uspesno dodao termin
    }
    else 
    {
        http_response_code(400);
        echo json_encode(['poruka' => 'Greška prilikom dodavanja termina: ']);
    }
        
}

$conn->close();

?>