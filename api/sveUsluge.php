<?php
//vraca sve usluge za goste

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'db.php';
$metoda = $_SERVER['REQUEST_METHOD'];
if($metoda == 'GET')
{
    
    $sql = "SELECT ServiceID, ServiceName, ServicePrice FROM salonservice";
    
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