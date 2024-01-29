<?php
//preko te stranice se registruju obicni korisnici, rola je uvek 3
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once("db.php");



$metoda = $_SERVER['REQUEST_METHOD'];
if ($metoda == 'POST'){
    $data = json_decode(file_get_contents("php://input"),true);
    $ime = $data['ime'];
    $prezime = $data['prezime'];
    $brojTelefona = $data['brojTelefona'];
    $email = $data['email'];
    $korisnickoIme = $data['korisnickoIme'];
    $lozinka = $data['password'];
    $potvrdjenaLozinka = $data['password_confirmation'];
    $lozinkaHash = sha1($lozinka);
    $rola = 3;
    $idKorisnika = 0;
    if(!proveriKorisnickoIme($conn,$korisnickoIme,$idKorisnika))
    {
        http_response_code(400); 
        echo json_encode(['poruka' => 'Korisnicko ime je zauzeto.']);
        exit;
    }
    
    if($lozinka != $potvrdjenaLozinka)
    {
        http_response_code(400); // Bad Request status
        echo json_encode(['poruka' => 'Lozinke se ne podudaraju.']);
        exit;
    }
    
    $sql = "INSERT INTO user (Username, FirstName, LastName, PhoneNumber, email, pass, roleID) VALUES ('$korisnickoIme', '$ime','$prezime','$brojTelefona','$email','$lozinkaHash','$rola')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['poruka' => 'Registracija uspešna.']);
            //redirect na prijavu
        }
        else {
            http_response_code(500);
            echo json_encode(['poruka' => 'Greška prilikom registracije: ' . $conn->error]);
            }
}
        
$conn->close();

?>