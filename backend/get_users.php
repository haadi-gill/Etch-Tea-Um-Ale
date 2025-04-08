#!/usr/local/bin/php

<?php

    $config = parse_ini_file("db_config.ini");

    $conn = new mysqli($config["servername"], $config["username"], $config["password"], $config["dbname"]);

    if ($conn->connect_error){
        die("Conenction failed. " . $conn->connect_error);
    }

    $sql = "SELECT * FROM Users";

    $result = $conn->query($sql);

    

    // MySQL insert statement with binding
    // Bind to the question marks the fields you want to insert into it
    $stmt = $conn->prepare("INSERT INTO Persons (FirstName, LastName, Age) VALUES (?, ?, ?)");
    // To bind the parameters (here, ssi = string string int for the datatypes being passed in  )
    $stmt->bind_param("ssi", $FirstName, $LastName, $Age);

    $stmt->execute();

    $conn->close();

    header("Location: index.php")
?>