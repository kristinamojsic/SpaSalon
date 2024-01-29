<?php
//vraca sve zakazane termine zaposlenog za neku uslugu


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'db.php';
$metoda = $_SERVER['REQUEST_METHOD'];
if($metoda == 'GET')
{
    if(!isset($_GET['idZaposlenog']))
    {
        http_response_code(400);
        echo json_encode(['poruka' => 'Nije poslat id zaposlenog']);
        exit;
    }
    
    
    
    $idZaposlenog = $_GET['idZaposlenog'];
    $idUsluge = $_GET['idUsluge'];
    //AKO JE DATA USLUGA
    $sql = "SELECT AppointmentID, AppointmentDateTime FROM appointment WHERE EmployeeID = '$idZaposlenog' AND ServiceID = '$idUsluge' AND available = 1 ORDER BY AppointmentDateTime DESC";
    
    //AKO NIJE DATA USLUGA 
    //$sql = "SELECT ServiceName, GROUP_CONCAT(AppointmentID) as appointment_ids, GROUP_CONCAT(AppointmentDateTime) as appointments FROM `appointment` INNER JOIN salonservice ON appointment.ServiceID = salonservice.ServiceID WHERE EmployeeID = '$idZaposlenog' GROUP BY appointment.ServiceID;";
    //var_dump($sql);
    $result = $conn->query($sql);
    if($result->num_rows == 0)
    {

        http_response_code(400);
        echo json_encode(['poruka' => 'Nema slobodnih termina']);

    }
    else
    {
        
        $termini = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['termini'=> $termini]);
    }
    $conn->close();
}

?>