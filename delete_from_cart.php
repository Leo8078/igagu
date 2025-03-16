<?php
header('Content-Type: application/json; charset=UTF-8');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$conn->set_charset("utf8mb4");

// 클라이언트로부터 JSON 데이터를 받음
$input = json_decode(file_get_contents('php://input'), true);
$productIds = $input['product_ids'] ?? [];

// product_ids가 비었는지 확인
if (empty($productIds)) {
    echo json_encode(["error" => "No product IDs provided for deletion."]);
    exit;
}

// 배열을 SQL IN 조건에 사용할 형식으로 변환
$productIdsPlaceholder = implode(',', array_fill(0, count($productIds), '?'));

// SQL 쿼리 준비
$sql = "DELETE FROM Cart WHERE product_id IN ($productIdsPlaceholder)";
$stmt = $conn->prepare($sql);

// 쿼리 매개변수 바인딩
$types = str_repeat('i', count($productIds)); // 정수 타입
$stmt->bind_param($types, ...$productIds);

// 실행
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Selected items have been deleted from the cart."]);
} else {
    echo json_encode(["error" => "Failed to delete items: " . $stmt->error]);
}

// 리소스 정리
$stmt->close();
$conn->close();
?>
