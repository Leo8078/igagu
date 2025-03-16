<?php
session_start(); // 세션 시작

// 세션에 user_id가 없으면 로그인 페이지로 리다이렉트
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "로그인 정보가 없습니다."]);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT SUM(price * quantity) AS total_price FROM orders WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id); 
$stmt->execute();
$result = $stmt->get_result();

$total_price = 0;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $total_price = $row['total_price'];
}

$total_price = number_format($total_price);

echo json_encode(["total_price" => $total_price]);

$stmt->close();
$conn->close();
?>
