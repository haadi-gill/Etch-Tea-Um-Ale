#!/usr/local/bin/php

<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header('Access-Control-Allow-Origin: *');


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

    if (isset($_GET['first_name'])) {
        $first_name = $_GET['first_name'];
    } else {
        $first_name = null; // Or handle the error as needed
    }

    if (isset($_GET['last_name'])) {
        $last_name = $_GET['last_name'];
    } else {
        $last_name = null; // Or handle the error as needed
    }

    if (isset($_GET['rating'])) {
        $rating = $_GET['rating'];
    } else {
        $rating = null; // Or handle the error as needed
    }

    if (isset($_GET['wishlist'])) {
        $wishlist = $_GET['wishlist'];
    } else {
        $wishlist = null; // Or handle the error as needed
    }

    // echo "Email: $email". gettype($email)."<br>";
    // echo "Password: $password". gettype($password)."<br>";
    // echo "First Name: $first_name". gettype($first_name)."<br>";
    // echo "Last Name: $last_name". gettype($last_name)."<br>";
    // echo "Rating: $rating". gettype($rating)."<br>";
    // echo "Wishlist: $wishlist". gettype($wishlist)."<br>";
    
    if (($email != null && $email != "") && (($password != null && $password != "") || ($first_name != null && $first_name != "") || ($last_name != null && $last_name != "") || ($rating != null && $rating != "") || ($wishlist != null && $wishlist != ""))) {
     

        $config = parse_ini_file("db_config.ini");

        $conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
    
            
        if ($conn->connect_error){
            die("Conenction failed. " . $conn->connect_error);
            echo "false";
        }
        else {

            $result = $conn->query("SELECT * FROM Users WHERE email = '$email'");

            
            $myArray = array();
            
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            
            if (count($myArray) == 0) {
                echo "false";
                return;
            }

            $sql = "UPDATE Users SET ";

            if ($password != null && $password != "") {
                $sql = $sql . "password = '$password', ";
            }
            if ($first_name != null && $first_name != "") {
                $sql = $sql . "first_name = '$first_name', ";
            }
            if ($last_name != null && $last_name != "") {
                $sql = $sql . "last_name = '$last_name', ";
            }
            if ($rating != null && $rating != "") {
                $sql = $sql . "rating = '$rating', ";
            }
            if ($wishlist != null && $wishlist != "") {
                $sql = $sql . "wishlist = '$wishlist', ";
            }


            $sql = rtrim($sql, ', ');
            $sql .= " WHERE email = '$email'";

            // echo "SQL: $sql <br>";

            
            $result = $conn->query($sql);

            $conn->close();
            
            echo "true";
        }
    }   


    else {
        echo "false";
    }
    
?>