#!/usr/local/bin/php

<?php

    // error_reporting(E_ALL);
    // ini_set('display_errors', 1);
    header('Access-Control-Allow-Origin: *');

    $email = urldecode($_GET['email']);
    $password = $_GET['password'];
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $rating = $_GET['rating'];
    
    if ($email != null && $email != "" && $password != null && $password != "" && $first_name != null && $first_name != "" && $last_name != null && $last_name != "" && $rating != null && $rating != "") {

     

        $config = parse_ini_file("db_config.ini");

        $conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
    
            
            if ($conn->connect_error){
                die("Conenction failed. " . $conn->connect_error);
                echo "false";
            }
            else {
                //check if email already exists
                $sql = "SELECT * FROM Users WHERE email = '$email'";
                $result = $conn->query($sql);
                
                $myArray = array();
                
                while($row = $result->fetch_assoc()) {
                    $myArray[] = $row;
                }
                
                if (count($myArray) > 0) {
                    echo "false";
                }
                else {

                    $sql = "INSERT INTO Users (email, password, first_name, last_name, rating) VALUES ('$email', '$password', '$first_name', '$last_name', '$rating')";
            
                    $result = $conn->query($sql);
        
                    $conn->close();
                    
                    echo "true";
            }
        }

    }     

    else {
        echo "false";
    }

?>