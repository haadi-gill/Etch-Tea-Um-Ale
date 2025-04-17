#!/usr/local/bin/php

<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    header('Access-Control-Allow-Origin: *');



    if (isset($_GET['id'])){
        $id = $_GET['id'];
    } else if (isset($_GET['post_id'])){
        $id = $_GET['post_id'];
    }
    else{
        $id = null;
    }
    if (isset($_GET['user_email'])){
        $user_email = urldecode($_GET['email']);
    } else{
        $user_email = null;
    }
    if (isset($_GET['label'])){
        $label = $_GET['label'];
    } else{
        $label = null;
    }
    if (isset($_GET['description'])){    
        $description = urldecode($_GET['description']);
    } else{
        $description= null;
    }
    if (isset($_GET['price'])){
        $price = $_GET['price'];
    } else{
        $price = null;
    }
    if (isset($_GET['active'])){
        $active = $_GET['active'];
    } else{
        $active = null;
    }
    if (isset($_GET['images'])){
        $images = $_GET['images'];
    } else{
        $images= null;
    }
    if (isset($_GET['condition'])){
        $condition = $_GET['condition'];
    } else{
        $condition = null;
    }
    if (isset($_GET['category'])){
        $category = $_GET['category'];
    } else{
        $category = null;
    }

    // echo "ID: $id <br>";
    // echo "Email: $user_email <br>";
    // echo "Label: $label <br>";
    // echo "Description: $description <br>";
    // echo "Price: $price <br>";
    // echo "Active: $active <br>";
    // echo "Images: $images <br>";
    // echo "Condition: $condition <br>";
    // echo "Category: $category <br>";
    
    if (($id != null && $id != "") && (($user_email != null && $user_email != "") || ($label != null && $label != "") || ($description != null && $description != "") || ($price != null && $price != "") || ($active != null && $active != "") || ($images != null && $images != "") || ($condition != null && $condition != "") || ($category != null && $category != ""))) {
     

        $config = parse_ini_file("db_config.ini");

        $conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
    
            
        if ($conn->connect_error){
            die("Conenction failed. " . $conn->connect_error);
            echo "false";
        }
        else {

            
            $result = $conn->query("SELECT * FROM Posts WHERE post_id = '$id'");
            
            $myArray = array();
            
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
                // echo "Email: " . $row["user_email"] . "<br>";
                // echo "Label: " . $row["label"] . "<br>";
                // echo "Description: " . $row["description"] . "<br>";
                // echo "Price: " . $row["price"] . "<br>";
                // echo "Active: " . $row["active"] . "<br>";
                // echo "Images: " . $row["images"] . "<br>";
                // echo "Condition: " . $row["cond"] . "<br>";
                // echo "Category: " . $row["category"] . "<br>";
            }
            
            if (count($myArray) == 0) {
                echo "false";
                return;
            }


            $sql = "UPDATE Posts SET ";

            if ($user_email != null && $user_email != "") {
                $sql = $sql . "user_email = '$user_email', ";
            }
            if ($label != null && $label != "") {
                $sql = $sql . "label = '$label', ";
            }
            if ($description != null && $description != "") {
                $sql = $sql . "description = '$description', ";
            }
            if ($price != null && $price != "") {
                $sql = $sql . "price = '$price', ";
            }
            if ($active != null && $active != "") {
                $sql = $sql . "active = '$active', ";
            }
            if ($images != null && $images != "") {
                $sql = $sql . "images = '$images', ";
            }
            if ($condition != null && $condition != "") {
                $sql = $sql . "cond = '$condition', ";
            }
            if ($category != null && $category != "") {
                $sql = $sql . "category = '$category', ";
            }
            $sql = rtrim($sql, ', ');
            $sql .= " WHERE post_id = '$id'";

            // echo "SQL: $sql <br>";

            
            $result = $conn->query($sql);

               
            // $result = $conn->query("SELECT * FROM Posts WHERE post_id = '$id'");
            
            // $myArray = array();
            
            // while($row = $result->fetch_assoc()) {
            //     $myArray[] = $row;
            //     echo "Email: " . $row["user_email"] . "<br>";
            //     echo "Label: " . $row["label"] . "<br>";
            //     echo "Description: " . $row["description"] . "<br>";
            //     echo "Price: " . $row["price"] . "<br>";
            //     echo "Active: " . $row["active"] . "<br>";
            //     echo "Images: " . $row["images"] . "<br>";
            //     echo "Condition: " . $row["cond"] . "<br>";
            //     echo "Category: " . $row["category"] . "<br>";
            // }

            $conn->close();
            
            echo "true";
        }
    }   


    else {
        echo "false";
    }

    ob_end_flush();
?>