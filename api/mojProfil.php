<?php
//prikaz podataka prijavljenog korisnika

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


require_once("db.php");
$metoda = $_SERVER['REQUEST_METHOD'];

if ($metoda == 'GET' && isset($_GET['idKorisnika']))
{
    $idKorisnika = $_GET['idKorisnika']; //to slati iz sesije na frontu ili citati sesiju na backu
    $sql = "SELECT * FROM user WHERE UserID = '$idKorisnika'";
    $result = $conn->query($sql);
    if($result->num_rows == 1)
    {

        $podaci = $result->fetch_assoc();
        echo json_encode(["podaciOKorisniku" => $podaci]); 
    }
    else
    {

        http_response_code(400);
        echo json_encode(['poruka' => 'Ne postoji korisnik sa takvim id-em '.$idKorisnika]);
    }
}
else
{
    http_response_code(400);
    echo json_encode(['poruka' => 'Nije postavljen id korisnika']);
}
?>