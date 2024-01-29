<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "beautysalon";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function proveriKorisnickoIme($conn,$korisnickoIme,$idKorisnika)
{
    $sql_proveri_korisnickoIme = "SELECT * FROM user WHERE Username = '$korisnickoIme' AND UserID != '$idKorisnika'";
    $sql_rezultat = $conn->query($sql_proveri_korisnickoIme);
    return $sql_rezultat->num_rows == 0;
}

function podaciOKorisniku($conn, $id) {
    $sql = "SELECT * FROM user WHERE UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        return $result->fetch_assoc();
    } else {
        return null;
    }
}


?>