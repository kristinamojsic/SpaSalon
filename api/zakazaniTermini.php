<?php
//vraca sve zakazane termine zaposlenog


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'db.php';
$metoda = $_SERVER['REQUEST_METHOD'];
if($metoda == 'GET')
{
    if(!isset($_GET['idZaposlenog']))
    {
        echo json_encode(['poruka' => 'Nije poslat id zaposlenog']);
        exit;
    }
    
    
    
    $idZaposlenog = $_GET['idZaposlenog'];
    $idUsluge = $_GET['idUsluge'];
    //za slucaj da se prikazuju podaci korisnika ime, prezime, br, email
    $sql = "SELECT AppointmentDateTime, AppointmentID, c.FirstName, c.LastName, c.PhoneNumber, c.Username,c.email FROM appointment a INNER JOIN user c ON a.CustomerID=c.UserID WHERE EmployeeID = '$idZaposlenog' AND ServiceID = '$idUsluge' AND AppointmentDateTime > NOW() ORDER BY AppointmentDateTime DESC";
    //var_dump($sql);
    $result = $conn->query($sql);
    if($result->num_rows == 0)
    {

        http_response_code(400);
        echo json_encode(['poruka' => 'Nema zakazanih termina u narednom periodu za datu uslugu']);

    }
    else
    {
        
        $termini = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['termini'=> $termini]);
    }
    $conn->close();
}

?>