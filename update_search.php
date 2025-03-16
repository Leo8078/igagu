<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $term = $_POST['term'];
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "igagu";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO popular_searches (term, count) VALUES (?, 1) ON DUPLICATE KEY UPDATE count = count + 1");
    $stmt->bind_param("s", $term);
    $stmt->execute();
    $stmt->close();
    $conn->close();
}
?>
