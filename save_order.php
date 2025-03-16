<?php
// 데이터베이스 연결 설정
$host = 'localhost';      // 호스트
$username = 'root';       // DB 사용자 이름
$password = '';           // DB 비밀번호
$dbname = 'igagu';        // 사용할 데이터베이스 이름

// 세션 시작
session_start();

// 로그인 여부 확인
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "로그인되지 않은 사용자입니다."]);
    exit;
}

// 로그인된 사용자의 user_id 가져오기
$userId = $_SESSION['user_id'];

// 데이터베이스 연결
$conn = new mysqli($host, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

// 요청이 POST 방식인지 확인
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON 형식으로 데이터 받기
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        // 주문 데이터를 저장하기 위한 준비
        $stmt = $conn->prepare("INSERT INTO orders (user_id, order_number, order_date, product_name, size, color, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

        // 반복문을 사용해 각 주문 항목을 저장
        foreach ($data as $item) {
            $orderNumber = $item['orderNumber'];
            $orderDate = $item['orderDate'];
            $productInfo = explode(" / ", $item['productInfo']);
            $productName = $productInfo[0];
            $size = $productInfo[1] ?? null;
            $color = $productInfo[2] ?? null;
            $quantity = $item['quantity'];
            $price = $item['price'];

            // 쿼리 실행
            $stmt->bind_param("isssssss", $userId, $orderNumber, $orderDate, $productName, $size, $color, $quantity, $price);
            $stmt->execute();
        }

        // 성공적인 저장을 확인
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "잘못된 데이터 형식입니다."]);
    }

    // 연결 종료
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "올바른 요청이 아닙니다."]);
}
?>
