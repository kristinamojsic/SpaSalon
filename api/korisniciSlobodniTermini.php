<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'db.php';

function formatiranjeDatuma($datum)
{
    $datum = str_replace("GMT 0200 (Central European Summer Time)", "", $datum);
    $datum = new DateTime($datum);
    $formatiranDatum = $datum->format("Y-m-d");
    return $formatiranDatum;
    
}
$metoda = $_SERVER['REQUEST_METHOD'];

if($metoda == 'GET')
{
    //prikazace samo predstojece slobodne termine
    $sql = "SELECT user.UserID, user.FirstName, user.LastName, GROUP_CONCAT(CONCAT(DATE_FORMAT(AppointmentDateTime, '%H:%i'))) AS appointments, GROUP_CONCAT(appointment.AppointmentID) AS appointment_ids FROM appointment INNER JOIN user ON appointment.EmployeeID = user.UserID WHERE AppointmentDateTime > NOW() AND available = 1 ";
    
    if(isset($_GET['idUsluge'])){
        $idUsluge = $_GET['idUsluge'];
        $sql .= " AND appointment.ServiceID = '$idUsluge'";

    }
    
    if(isset($_GET['datum'])){
        if($_GET['datum']!='null'){
 
            $datum = formatiranjeDatuma($_GET['datum']);
            $sql .= " AND CAST(AppointmentDateTime as DATE) = '$datum'";
       
    }}
    
   
    $sql .= "  GROUP BY user.UserID ORDER BY AppointmentDateTime DESC";
    $result = $conn->query($sql);

    if($result->num_rows == 0)
    {
        http_response_code(400);
        echo json_encode(['poruka' => 'Nema slobodnih termina za Vašu pretragu']);
    }
    else
    {   
        
        $termini = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode(['termini'=> $termini]);
    }
}

?>
