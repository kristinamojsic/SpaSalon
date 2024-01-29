<?php
// brisanje odredjenog termina od strane zaposlenog

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once("db.php");



$metoda = $_SERVER['REQUEST_METHOD'];

if($metoda == 'GET' && isset($_GET['idTermina']))
//if($metoda == 'GET' && isset($_GET['idTermina']))
{
    //idTermina preko url-a
    $idTermina = $_GET['idTermina'];
    $sql = "DELETE FROM appointment WHERE AppointmentID = $idTermina";
    
    if ($conn->query($sql)) {
        if ($conn->affected_rows > 0) {
            echo json_encode(['poruka' => "Uspesno obrisan termin."]);
        } else {
            http_response_code(400);
            echo json_encode(['poruka' => "Termin sa datim ID-em nije pronadjen."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['poruka' => "Nemoguce obrisati termin."]);
    }
    $conn->close();
}
else
{
    http_response_code(400);
    echo json_encode(["poruka" => "Bad request"]);
}


?>