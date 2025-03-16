<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";  // 데이터베이스 이름

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 상품 ID가 전달되었는지 확인
if (isset($_GET['id'])) {
    $product_id = (int)$_GET['id'];

    // ID가 0보다 큰 경우, 해당 상품 정보를 가져오는 쿼리 실행
    if ($product_id > 0) {
        // 기본 상품 정보와 상세 상품 정보를 함께 가져오는 쿼리 (JOIN 사용)
        $sql = "SELECT p.id, p.name, p.price, p.brand, p.category, p.description, 
                        pd.detailed_desc, pd.size_options, pd.color_options, pd.benefits 
                FROM Products p
                LEFT JOIN product_details pd ON p.id = pd.product_id
                WHERE p.id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $product_id); // 상품 ID를 쿼리에 바인딩
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // 상품 정보가 있으면 반환
            $product = $result->fetch_assoc();
            echo json_encode($product);
        } else {
            // 상품을 찾을 수 없으면 오류 메시지 반환
            echo json_encode(["error" => "상품을 찾을 수 없습니다."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "유효한 상품 ID가 제공되지 않았습니다."]);
    }
} else {
    // 상품 목록을 가져오는 기본 로직
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
    $search = isset($_GET['search']) ? $_GET['search'] : '';

    $sql = "SELECT id, name, price, category FROM Products WHERE name LIKE ? LIMIT " . ($page - 1) * $limit . ", $limit";
    $stmt = $conn->prepare($sql);
    $searchTerm = "%" . $search . "%";  // 검색어를 처리
    $stmt->bind_param("s", $searchTerm);
    $stmt->execute();
    $result = $stmt->get_result();

    // 총 상품 개수
    $totalSql = "SELECT COUNT(*) as total FROM Products WHERE name LIKE ?";
    $totalStmt = $conn->prepare($totalSql);
    $totalStmt->bind_param("s", $searchTerm);
    $totalStmt->execute();
    $totalResult = $totalStmt->get_result();
    $totalRow = $totalResult->fetch_assoc();
    $totalPages = ceil($totalRow['total'] / $limit);

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode([
        'products' => $products,
        'totalPages' => $totalPages
    ]);

    $stmt->close();
    $totalStmt->close();
}

$conn->close();
?>
