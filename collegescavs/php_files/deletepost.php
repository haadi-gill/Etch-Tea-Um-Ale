#!/usr/local/bin/php

<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header('Access-Control-Allow-Origin: *');

    $id = $_GET['id'];
    
    if ($id != null && $id != "") {
     

        $config = parse_ini_file("db_config.ini");

        $conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);
    
            
        if ($conn->connect_error){
            die("Conenction failed. " . $conn->connect_error);
            echo "false";
        }
        else {

            $test_result = $conn->query("SELECT * FROM Posts WHERE post_id = $id");

            if ($test_result->num_rows == 0) {
                echo "false";
                return;
            }


            $sql = "DELETE FROM Posts WHERE post_id = $id";

            $result = $conn->query($sql);

            $conn->close();
            
            echo "true";
        }
    }   


    else {
        echo "false";
    }

?>