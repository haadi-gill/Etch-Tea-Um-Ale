#!/usr/local/bin/php

<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    if (isset($_GET['email'])) {
        $email = urldecode($_GET['email']);
    } else {
        $email = null; // Or handle the error as needed
    }

    
    if ($email != null && $email != "") {
        $sql = "SELECT * FROM Users WHERE email = '$email'";
    }
    else {
        $sql = "SELECT * FROM Users";
    }        


    $config = parse_ini_file("db_config.ini");

    $conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
    
    if ($conn->connect_error){
        die("Conenction failed. " . $conn->connect_error);
    }

    $result = $conn->query($sql);

    $myArray = array();
    
    while($row = $result->fetch_assoc()) {
        $myArray[] = $row;
    }
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    echo json_encode($myArray);


    $result->close();
    $conn->close();
?>