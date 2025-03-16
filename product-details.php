<?php
header('Content-Type: application/json; charset=UTF-8');

// 데이터베이스 연결 설정
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

// GET 파라미터에서 상품 ID 가져오기
$productId = isset($_GET['id']) ? intval($_GET['id']) : 0;

// 상품 정보 및 상세 정보 가져오는 쿼리
$sql = "SELECT p.id, p.name, p.price, p.brand, p.image_url, p.description, 
               d.detailed_desc, d.size_options, d.color_options, d.benefits, d.detail_images, p.category
        FROM Products p
        JOIN Product_Details d ON p.id = d.product_id
        WHERE p.id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "SQL statement preparation failed"]);
    $conn->close();
    exit;
}
$stmt->bind_param("i", $productId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();

    // 관련 상품 쿼리 (현재 상품 제외, 중복 없도록 처리)
    $category = $product['category'];
    $relatedSql = "SELECT id, name, price, image_url 
                   FROM Products 
                   WHERE category = ? AND id != ? 
                   ORDER BY RAND() LIMIT 4";
    $relatedStmt = $conn->prepare($relatedSql);
    if (!$relatedStmt) {
        echo json_encode(["error" => "Related products query preparation failed"]);
        $conn->close();
        exit;
    }
    $relatedStmt->bind_param("si", $category, $productId);
    $relatedStmt->execute();
    $relatedResult = $relatedStmt->get_result();

    $relatedProducts = [];
    while ($relatedRow = $relatedResult->fetch_assoc()) {
        $relatedProducts[] = $relatedRow;
    }

    // JSON 디코딩하여 배열로 처리
    $product['benefits'] = json_decode($product['benefits'], true) ?: [];
    $product['size_options'] = json_decode($product['size_options'], true) ?: [];
    $product['color_options'] = json_decode($product['color_options'], true) ?: [];
    $product['related_products'] = $relatedProducts;

    // 상품 데이터 JSON 응답
    echo json_encode($product, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["error" => "Product not found"]);
}

// 리소스 해제
$stmt->close();
if (isset($relatedStmt)) $relatedStmt->close();
$conn->close();
?>
