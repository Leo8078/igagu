<?php
header('Content-Type: application/json; charset=UTF-8');

// 세션 시작
session_start();

// 로그인 여부 확인
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "로그인되지 않은 사용자입니다."]);
    exit;
}

// 데이터베이스 연결 설정
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$conn->set_charset("utf8mb4");

// 현재 로그인된 사용자의 아이디
$userId = $_SESSION['user_id'];

// 요청 데이터 가져오기
$input = json_decode(file_get_contents('php://input'), true);

$productId = $input['product_id'] ?? null;
$quantity = $input['quantity'] ?? 1; // 기본 수량 1
$size = $input['size'] ?? null;
$color = $input['color'] ?? null;

if (!$productId) {
    echo json_encode(["error" => "Invalid product ID."]);
    exit;
}

// 해당 상품 정보 가져오기
$productQuery = "SELECT name, price, image_url FROM Products WHERE id = ?";
$productStmt = $conn->prepare($productQuery);
$productStmt->bind_param("i", $productId);
$productStmt->execute();
$productResult = $productStmt->get_result();

if ($productResult->num_rows > 0) {
    $product = $productResult->fetch_assoc();
    $name = $product['name'];
    $price = $product['price'];
    $imageUrl = $product['image_url'];
    
    // 장바구니에 추가 또는 수량 업데이트
    $cartQuery = "
        INSERT INTO cart (user_id, product_id, name, price, quantity, size, color, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            quantity = quantity + VALUES(quantity), 
            size = VALUES(size), 
            color = VALUES(color)";
    
    $cartStmt = $conn->prepare($cartQuery);
    $cartStmt->bind_param("iisiiiss", $userId, $productId, $name, $price, $quantity, $size, $color, $imageUrl);

    if ($cartStmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product added to cart."]);
    } else {
        echo json_encode(["error" => "Failed to add product to cart: " . $conn->error]);
    }

    $cartStmt->close();
} else {
    echo json_encode(["error" => "Product not found"]);
}

$productStmt->close();
$conn->close();
?>
