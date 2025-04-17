#!/usr/local/bin/php

<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    if (isset($_GET['email'])) {
        $user_email = urldecode($_GET['email']);
    } else {
        $user_email = null; // Or handle the error as needed
    }

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
    } else {
        $id = null; // Or handle the error as needed
    }


    if ($user_email != null && $user_email != "") {
        $sql = "SELECT * FROM Posts WHERE user_email = '$user_email'";
    } else if ($id != null && $id != "") {
        $sql = "SELECT * FROM Posts WHERE post_id = $id";
    }
    else {
        $sql = "SELECT * FROM Posts";
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