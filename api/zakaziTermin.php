<?php
//zakazivanje termina od strane korisnika kada klikne na njega

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once("db.php");

//treba funkcija za proveru da li je mozda vec zakazan termin
function proveriTermin($conn, $idTermina)
{
    $sql = "SELECT customerID FROM appointment WHERE appointmentID = '$idTermina'";
    $result = $conn->query($sql);
    $id = $result->fetch_row()[0];
    return ($id==null || $id=='0');
   
}

$metoda = $_SERVER['REQUEST_METHOD'];

if ($metoda == 'GET' && isset($_GET['idKorisnika']) && isset($_GET['idTermina']))
{
    $idKorisnika = $_GET['idKorisnika'];
    $idTermina = $_GET['idTermina'];
    
    if (!proveriTermin($conn, $idTermina)){
        http_response_code(400);
        echo json_encode(['poruka'=>"Termin je zauzet."]);
        exit;
    }

    $sql = "UPDATE appointment SET CustomerID = ?, available = ? WHERE AppointmentID = ?";
    $available = 0;

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss',$idKorisnika,$available,$idTermina);
    
    if ($stmt->execute()) {
        echo json_encode(['poruka' => "Uspešno ste zakazali termin."]);
        //exit;
    } else {
        http_response_code(400);
        echo json_encode(['poruka' => "Nemoguće zakazati termin."]);
        //exit;
    }

    $stmt->close();
    $conn->close();
}

?>