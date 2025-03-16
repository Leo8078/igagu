<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// 인기 검색어 반환
$result = $conn->query("SELECT term FROM popular_searches ORDER BY count DESC LIMIT 5");
$popularSearches = [];
while ($row = $result->fetch_assoc()) {
    $popularSearches[] = $row['term'];
}

echo json_encode($popularSearches);
$conn->close();
?>
