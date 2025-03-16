<?php
header('Content-Type: application/json; charset=UTF-8');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$conn->set_charset("utf8mb4");

$productId = isset($_POST['id']) ? intval($_POST['id']) : 0;
$name = $_POST['name'];
$price = $_POST['price'];
$brand = $_POST['brand'];
$category = $_POST['category'];
$description = $_POST['description'];
$popularity = $_POST['popularity'];
$reviews = $_POST['reviews'];
$detailed_desc = $_POST['detailed_desc'];

// 받아온 데이터를 JSON 배열로 변환
$sizeOptions = json_decode($_POST['size_options'], true);
$colorOptions = json_decode($_POST['color_options'], true);
$benefits = json_decode($_POST['benefits'], true);  // benefits 디코딩


// 이미지 파일 처리
$imagePath = "";
if (isset($_FILES['image_upload'])) {
    $file = $_FILES['image_upload'];
    $uploadDirectory = 'image/gagu/';
    $imagePath = $uploadDirectory . basename($file['name']);
    move_uploaded_file($file['tmp_name'], $imagePath);  // 파일을 서버에 업로드
}

// 상세 이미지 파일 처리
$detailImagePath = "";
if (isset($_FILES['detail_image'])) {
    $file = $_FILES['detail_image'];
    $uploadDirectory = 'image/gagu/';
    $detailImagePath = $uploadDirectory . basename($file['name']);
    move_uploaded_file($file['tmp_name'], $detailImagePath);  // 파일을 서버에 업로드
}

// 데이터베이스에 상품 정보 삽입
$sql = "INSERT INTO Products (name, price, brand, category, description, image_url, popularity, reviews, created_at)
        VALUES ('$name', '$price', '$brand', '$category', '$description', '$imagePath', '$popularity', '$reviews', NOW())";

if ($conn->query($sql) === TRUE) {
    $product_id = $conn->insert_id;  // 방금 삽입된 상품의 ID 가져오기

    // Product_Details 테이블에 상품 세부 정보 삽입
    // benefits 배열을 JSON으로 변환할 때 한글이 이스케이프 처리되지 않도록 설정
    $benefitsJson = json_encode($benefits, JSON_UNESCAPED_UNICODE);

    $sqlDetails = "INSERT INTO Product_Details (product_id, detailed_desc, size_options, color_options, benefits, detail_images)
                   VALUES ('$product_id', '$detailed_desc', '" . json_encode($sizeOptions) . "', '" . json_encode($colorOptions) . "', '$benefitsJson', '$detailImagePath')";

    if ($conn->query($sqlDetails) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "상품 세부 정보 추가에 실패했습니다."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "상품 추가에 실패했습니다."]);
}

$conn->close();
?>
