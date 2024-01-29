<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();
require_once('db.php');

$metoda = $_SERVER['REQUEST_METHOD'];
if ($metoda == 'POST'){
    $data = json_decode(file_get_contents("php://input"),true);
   
    $korisnickoIme = $data['korisnickoIme'];
    
    $lozinka = $data['password'];

    $sql = "SELECT * FROM user WHERE Username = '$korisnickoIme'";
  
    $rezultat = $conn->query($sql);

    if ($rezultat->num_rows >= 1) {
        $korisnik = $rezultat->fetch_assoc();
        $lozinkaHash = $korisnik['pass'];
        
        if (sha1($lozinka)==$lozinkaHash) {
            

            $_SESSION['autorizovan'] = $korisnik['UserID'];
            $_SESSION['korisnickoIme'] = $korisnickoIme;
            $_SESSION['rola'] = $korisnik['roleID'];
            
            echo json_encode(['poruka' => 'Uspesna prijava',
            'autorizovan' => $korisnik['UserID'],
            'korisnickoIme' => $korisnickoIme,
            'rola' => $korisnik['roleID']]);
            //i postaviti sesiju preko sessionStorage, cuvati poslate podatke i preusmeriti na nalog

        } else {
            http_response_code(400); // Bad Request status
            echo json_encode(['poruka' => "Pogrešna lozinka"]);
            //napisati da je pogresna lozinka na frontu
        }
    } else {
        http_response_code(400); // Bad Request status
        echo json_encode(['poruka' => "Ne postoji korisnik sa takvim korisničkim imenom"]);
        //napisati da korisnik ne postoji na frontu
    }
}
    
$conn->close();
?>
