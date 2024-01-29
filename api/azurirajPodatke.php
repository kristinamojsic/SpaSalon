<?php
// izmena informacija korisnika --> axios.put(apiEndpoints.endpointAzurirajPodatke + `?idKorisnika=${idKorisnika}`,data)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

//ispitivanje sesije da li ima pristup? da li je autorizovan

require_once("db.php");

//id korisnika iz urla
$idKorisnika = $_GET['idKorisnika'];

$metoda = $_SERVER['REQUEST_METHOD'];

if($metoda == 'PUT')
{
    
    $data = json_decode(file_get_contents("php://input"),true);
    
    $korisnik = podaciOKorisniku($conn, $idKorisnika);
    
    if (!$korisnik) {
        http_response_code(404);
        echo json_encode(['poruka' => 'Korisnik ne postoji.']);
        exit;
    }

    $ime = $data['ime'] != null ? $data['ime'] : $korisnik['FirstName'];
    $prezime = $data['prezime'] != null  ? $data['prezime'] : $korisnik['LastName'];
    $brojTelefona = $data['brojTelefona'] !=null  ? $data['brojTelefona'] : $korisnik['PhoneNumber'];
    $email = $data['email'] != null  ? $data['email'] : $korisnik['email'];
    $lozinka = $data['password'];
    $korisnickoIme = $data['korisnickoIme']!=null  ? $data['korisnickoIme'] : $korisnik['Username'];
    
    if($korisnickoIme!=$korisnik['Username'] && !proveriKorisnickoIme($conn,$korisnickoIme,$idKorisnika))
    {
        http_response_code(400); 
        echo json_encode(['poruka' => 'Korisnicko ime je zauzeto.']);
        exit;
    }
    
    if($lozinka !== "")
    {
        $potvrdjenaLozinka = $data['password_confirmation'];
        if($potvrdjenaLozinka === ""){
            http_response_code(400); // Bad Request status
            echo json_encode(['poruka' => 'Morate potvrditi lozinku.']);
            exit;
        }
        if($lozinka != $potvrdjenaLozinka){
            http_response_code(400); // Bad Request status
            echo json_encode(['poruka' => 'Lozinke se ne podudaraju.']);
            exit;
        }
        $lozinkaHash = sha1($lozinka);
    }
    
    
        
            
    $sql = "UPDATE user SET FirstName = ?, LastName = ?, email = ?, PhoneNumber = ?, Username = ?";
    $params = array($ime, $prezime, $email, $brojTelefona, $korisnickoIme);

    if ($lozinka !== "") {
        $sql .= ", pass = ?";
        $params[] = $lozinkaHash;
    }

    $sql .= " WHERE UserID = ?";
    $params[] = $idKorisnika;

    $stmt = $conn->prepare($sql);
    $paramTypes = str_repeat('s', count($params));
    $stmt->bind_param($paramTypes, ...$params);
    
    if ($stmt->execute()) {
        echo json_encode(['poruka' => "Uspešno ste izmenili podatke"]);
        exit;
    } else {
        http_response_code(400);
        echo json_encode(['poruka' => "Nemoguće izmeniti podatke"]);
        exit;
    }

    $stmt->close();
    $conn->close();
}
         

?>