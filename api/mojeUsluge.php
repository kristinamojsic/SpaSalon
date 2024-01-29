<?php
//za slucaj da treba da se izlistaju usluge zaposlenog 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'db.php';
$metoda = $_SERVER['REQUEST_METHOD'];

if($metoda == 'GET' && isset($_GET['idZaposlenog']))
{
    $idZaposlenog = $_GET['idZaposlenog'];
    $sql = "SELECT sa.ServiceID, ServiceName FROM serviceassignment sa INNER JOIN salonservice ss on sa.ServiceID = ss.ServiceID INNER JOIN user u ON sa.employeeID = u.UserID WHERE  u.UserID = '$idZaposlenog'";
    
    $result = $conn->query($sql);
    if($result->num_rows == 0)
    {

        http_response_code(400);
        echo json_encode(['poruka' => 'Nema usluga']);

    }
    else
    {
        
        $usluge = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['usluge'=> $usluge]);
    }
}

?>