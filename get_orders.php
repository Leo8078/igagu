<?php
session_start(); // 세션 시작

// 로그인 여부 확인
if (!isset($_SESSION['user_id'])) {
    // 로그인하지 않은 경우 JSON으로 응답
    echo json_encode(["loggedIn" => false, "error" => "로그인 필요"]);
    exit();
}

// DB 연결 정보
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "igagu";

// DB 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// DB 연결 오류 체크
if ($conn->connect_error) {
    die(json_encode(["error" => "DB 연결 실패: " . $conn->connect_error]));
}

// 세션에 저장된 사용자 ID를 기반으로 주문 내역 조회
$user_id = $_SESSION['user_id'];
$sql = "SELECT order_number, order_date, product_name, size, color, quantity, price FROM orders WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row; // 주문 내역을 배열에 저장
}

// 주문 내역이 없으면 "최근 주문 내역이 없습니다." 메시지 추가
if (empty($orders)) {
    echo json_encode(["loggedIn" => true, "message" => "최근 주문 내역이 없습니다."]);
} else {
    echo json_encode(["loggedIn" => true, "orders" => $orders]); // 주문 내역을 반환
}

// DB 연결 종료
$stmt->close();
$conn->close();
?>
