<?php
// PHP 오류 메시지 숨기기
error_reporting(0); // 모든 오류 숨기기
ini_set('display_errors', 0); // 오류 출력 안함

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";  // 데이터베이스 이름

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 상품 수정 처리
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 전달된 데이터 가져오기
    $product_id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $brand = $_POST['brand'];
    $category = $_POST['category'];
    $description = $_POST['description'];
    $detailed_desc = $_POST['detailed_desc'];

    // JSON으로 받은 옵션 데이터를 디코딩
    $size_options = json_decode($_POST['size_options']);
    $color_options = json_decode($_POST['color_options']);
    $benefits = json_decode($_POST['benefits']);

    // 데이터베이스 업데이트 쿼리
    $query = "UPDATE products SET name = ?, price = ?, brand = ?, category = ?, description = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssssi", $name, $price, $brand, $category, $description, $product_id);

    if ($stmt->execute()) {
        // 상품 세부사항 업데이트
        $query_details = "UPDATE product_details SET detailed_desc = ?, size_options = ?, color_options = ?, benefits = ? WHERE product_id = ?";
        $stmt_details = $conn->prepare($query_details);
        $stmt_details->bind_param("ssssi", $detailed_desc, json_encode($size_options), json_encode($color_options), json_encode($benefits), $product_id);

        if ($stmt_details->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => '상품 세부사항 업데이트 실패']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => '상품 업데이트 실패']);
    }

    $stmt->close();
    $stmt_details->close();
} else {
    echo json_encode(['success' => false, 'error' => '잘못된 요청']);
}

$conn->close();
?>
