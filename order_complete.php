<?php
session_start();  // 세션 시작

// 로그인 여부 확인
if (!isset($_SESSION['user_id'])) {
    die("로그인된 사용자만 접근할 수 있습니다.");
}

$user_id = $_SESSION['user_id'];  // 로그인한 사용자의 user_id를 가져옵니다.

// 데이터베이스 연결
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'igagu';

$conn = new mysqli($host, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

// SQL 쿼리: user_id에 따른 주문 내역 가져오기
$sql = "SELECT order_number, order_date, product_name, price, quantity, size, color, user_id FROM orders WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// 주문 내역을 배열로 저장
$orderItems = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orderItems[] = [
            'order_number' => $row['order_number'],
            'order_date' => $row['order_date'],
            'product_name' => $row['product_name'],
            'price' => $row['price'],
            'quantity' => $row['quantity'],
            'size' => $row['size'],
            'color' => $row['color'],
            'user_id' => $row['user_id']
        ];
    }
}

// JSON 형식으로 주문 내역을 반환
header('Content-Type: application/json');
echo json_encode($orderItems);

// 연결 종료
$stmt->close();
$conn->close();
?>
