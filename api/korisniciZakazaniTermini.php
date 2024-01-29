<?php
//vraca sve zakazane termine korisnika
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'db.php';
$metoda = $_SERVER['REQUEST_METHOD'];

if($metoda == 'GET')
{
    if(!isset($_GET['idKorisnika']))
    {
        echo json_encode(['poruka' => 'greska']);
        exit;
    }
    
    $idKorisnika = $_GET['idKorisnika'];
    
    $sql = "SELECT AppointmentID, salonservice.ServiceName, AppointmentDateTime, u.FirstName, u.LastName FROM appointment INNER JOIN user ON appointment.CustomerID = user.UserID INNER JOIN salonservice ON appointment.ServiceID = salonservice.ServiceID INNER JOIN user u ON appointment.EmployeeID = u.UserID WHERE CustomerID = '$idKorisnika'";
    
    $result = $conn->query($sql);
    if($result->num_rows == 0)
    {

        http_response_code(400);
        echo json_encode(['poruka' => 'Nemate zakazanih termina']);
        
    }
    else
    {
        
        $termini = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['termini'=> $termini]);
    }
    $conn->close();
}

?>

