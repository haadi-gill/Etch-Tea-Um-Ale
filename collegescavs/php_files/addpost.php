#!/usr/local/bin/php

<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header('Access-Control-Allow-Origin: *');

    if (isset($_GET['email'])) {
        $user_email = urldecode($_GET['email']);
    } else {
        $user_email = urldecode($_GET['user_email']);
    }
    $label = $_GET['label'];
    $description = urldecode($_GET['description']);
    $price = $_GET['price'];
    $images = $_GET['images'];
    $condition = $_GET['condition'];
    $category = $_GET['category'];
    $active = 'Y';
    
    if ($user_email != null && $user_email != "" && $label != null && $label != "" && $description != null && $description != "" && $price != null && $price != "" && $images != null && $images != "" && $condition != null && $condition != "" && $category != null && $category != "") {
     

        $config = parse_ini_file("db_config.ini");

        $conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
    
            
        if ($conn->connect_error){
            die("Connection failed. " . $conn->connect_error);
            echo "false";
        }
        else {

            $sql = "INSERT INTO Posts (user_email, label, description, price, active, images, cond, category) VALUES ('$user_email', '$label', '$description', '$price', '$active', '$images', '$condition', '$category')";
            $sql = str_replace("\"", "", $sql);

            // echo $sql;

            $result = $conn->query($sql);

            $conn->close();
            
            echo "true";
        }
    }   


    else {
        echo "false";
    }

?>