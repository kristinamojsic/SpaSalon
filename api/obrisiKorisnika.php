<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once("db.php");
// u urlu idKorisnika i rolu
//ako je zaposleni, treba da brise i iz one tabele serviceappointment i appointment


$greska = 0;

if ($_SERVER['REQUEST_METHOD'] === 'GET' && !empty($_GET['idKorisnika']) && !empty($_GET['rola'])) {

  $idKorisnika = $_GET['idKorisnika'];  
  //poslati rolu sa fronta
  $rola = $_GET['rola'];

  $sql = "DELETE FROM user WHERE UserID = '$idKorisnika'";
  
  if ($conn->query($sql)===TRUE) {
    if($rola==2){
      $sql_usluge = "DELETE FROM serviceassignment WHERE employeeID = '$idKorisnika'";
      if($conn->query($sql_usluge)!==TRUE){
        $greska = 1;
      }
      else
      {
        $sql_termini = "DELETE FROM appointment WHERE EmployeeID = '$idKorisnika'";
        if($conn->query($sql_termini)!==TRUE)
        {
          $greska = 1;
        }
      }
    }    
  } else {
    $greska = 1;
  }
  
  if($greska){
    http_response_code(400);
    echo json_encode(['poruka' => 'Greska nastala pri brisanju korisnika']);
  
  }
  else
  {
    echo json_encode(['poruka' => 'Uspesno obrisan korisnik']);
  }

  $conn->close();
}
else
{
  http_response_code(400);
  echo json_encode(['poruka'=>"Bad request."]);
}
?>
