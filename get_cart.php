<?php
// 데이터베이스 연결 설정
$host = 'localhost';      // 호스트
$username = 'root';       // DB 사용자 이름
$password = '';           // DB 비밀번호
$dbname = 'igagu';     // 사용할 데이터베이스 이름

// 데이터베이스 연결
$conn = new mysqli($host, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

// 장바구니 데이터 가져오기
$sql = "SELECT product_id, name, price, quantity, image_url, size, color, user_id FROM cart";
$result = $conn->query($sql);

$cartItems = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cartItems[] = [
            'product_id' => $row['product_id'],
            'name' => $row['name'],
            'price' => (float)$row['price'],
            'quantity' => (int)$row['quantity'],
            'image_url' => $row['image_url'],
            'size' => $row['size'],
            'color' => $row['color'],
            'user_id' => $row['user_id']
        ];
    }
}

// JSON으로 데이터 반환
header('Content-Type: application/json');
echo json_encode($cartItems);

// 연결 종료
$conn->close();
?>
