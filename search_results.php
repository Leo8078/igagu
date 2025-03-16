<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$query = $_GET['query'] ?? '';

$response = [];

if ($query) {
    $stmt = $conn->prepare("SELECT * FROM products WHERE name LIKE ?");
    $likeQuery = "%" . $query . "%";
    $stmt->bind_param("s", $likeQuery);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $response[] = [
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description'],
                'price' => $row['price'],
                'image_url' => $row['image_url'],
                'brand' => $row['brand'],
                'popularity' => $row['popularity'],
                'created_at' => $row['created_at'],
                'reviews' => $row['reviews']
            ];
        }
    } else {
        $response = []; // 검색 결과가 없을 경우 빈 배열
    }

    $stmt->close();
} else {
    $response = []; // 검색어가 없을 경우 빈 배열
}

$conn->close();

echo json_encode($response); // JSON 형식으로 반환
?>

