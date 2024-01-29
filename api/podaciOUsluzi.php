<?php
//vraca podatke o usluzi prema idUsluge u url-u

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'db.php';
$metoda = $_SERVER['REQUEST_METHOD'];

if($metoda == 'GET' && isset($_GET['idUsluge']))
{
    $idUsluge = $_GET['idUsluge'];
    
    $sql = "SELECT * FROM salonservice WHERE ServiceID = '$idUsluge'";
    
    $result = $conn->query($sql);

    if($result->num_rows == 0)
    {

        http_response_code(400);
        echo json_encode(['poruka' => 'Nema usluge']);

    }
    else
    {
        
        $podaci = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['podaciOUsluzi'=> $podaci]);
    }
}

?>