<?php
header('Content-Type: application/json; charset=UTF-8');

// 데이터베이스 연결 정보
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

// MySQL 연결
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$conn->set_charset("utf8mb4");

// 카테고리와 브랜드 파라미터 받기
$category = $_GET['category'] ?? null;
$brand = $_GET['brand'] ?? null;

// 기본 쿼리
$sql = "SELECT id, name, price, brand, image_url, popularity, reviews, created_at FROM Products WHERE 1=1";

// 조건 추가
if ($category) {
    $sql .= " AND category = ?";
}
if ($brand) {
    $sql .= " AND brand = ?";
}

// 쿼리 준비 및 실행
$stmt = $conn->prepare($sql);
if ($category && $brand) {
    $stmt->bind_param("ss", $category, $brand);
} elseif ($category) {
    $stmt->bind_param("s", $category);
} elseif ($brand) {
    $stmt->bind_param("s", $brand);
}

$stmt->execute();
$result = $stmt->get_result();

$products = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// JSON 출력
echo json_encode($products, JSON_UNESCAPED_UNICODE);

$conn->close();
?>
