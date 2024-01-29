<?php
// korisnik otkazuje zakazani termin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once("db.php");


$metoda = $_SERVER['REQUEST_METHOD'];

//funkcija za proveru da li je zakazao termin

function provera($conn,$idKorisnika, $idTermina)
{
    $sql = "SELECT CustomerID FROM appointment WHERE AppointmentID = '$idTermina'";
    $result = $conn->query($sql);
    return (($result->fetch_row())[0] == $idKorisnika);
}
if ($metoda == 'GET' && isset($_GET['idKorisnika']) && isset($_GET['idTermina']))
{
    $idTermina = $_GET['idTermina'];
    // idKorisnika slati iz sesije na frontu
    $idKorisnika = $_GET['idKorisnika'];

    if(!provera($conn,$idKorisnika,$idTermina)){
        // samo za proveru
        http_response_code(400);
        echo json_encode(['poruka' => "Niste zakazali termin"]);
        exit;
    }

    $sql = "UPDATE appointment SET CustomerID = ?, available = ? WHERE AppointmentID = ?";
    $available = 1;
    $idKorisnika0 = null;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss',$idKorisnika0,$available,$idTermina);
    
    if ($stmt->execute()) {
        echo json_encode(['poruka' => "Uspešno ste otkazali termin."]);
        exit;
    } else {
        http_response_code(400);
        echo json_encode(['poruka' => "Nemoguće otkazati termin."]);
        exit;
    }

    $stmt->close();
    $conn->close();
}


?>