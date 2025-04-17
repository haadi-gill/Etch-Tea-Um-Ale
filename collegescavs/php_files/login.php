#!/usr/local/bin/php

<?php

    header('Access-Control-Allow-Origin: *');
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    if (isset($_GET['email'])) {
        $email = urldecode($_GET['email']);
    } else {
        $email = null; // Or handle the error as needed
    }

    if (isset($_GET['password'])) {
        $password = $_GET['password'];
    } else {
        $password = null; // Or handle the error as needed
    }

    if ($email != null && $email != "" && $password != null && $password != "") {
        $sql = "SELECT * FROM Users WHERE email = '$email' AND password = '$password'";
    } 
    else{
        echo "false";
        return;
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
    
    if (count($myArray) > 0){
        echo "true";
    }
    else{
        echo "false";
    }


    $result->close();
    $conn->close();
?>