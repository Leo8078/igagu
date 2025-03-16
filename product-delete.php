<?php
header('Content-Type: application/json; charset=UTF-8');

// POST로 받은 데이터 처리
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $productId = $data['id'];

    // 데이터베이스 연결
    $servername = "localhost";
    $username_db = "root";
    $password_db = "";
    $dbname = "igagu"; // 데이터베이스 이름

    $conn = new mysqli($servername, $username_db, $password_db, $dbname);

    // 연결 오류 처리
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // 트랜잭션 시작 (두 테이블에서 삭제하는 것이므로 트랜잭션을 사용)
    $conn->begin_transaction();

    try {
        // Product_Details 테이블에서 해당 상품의 세부 정보 삭제
        $sqlDetails = "DELETE FROM Product_Details WHERE product_id = ?";
        $stmt = $conn->prepare($sqlDetails);
        $stmt->bind_param("i", $productId);
        $stmt->execute();

        // Products 테이블에서 해당 상품 삭제
        $sqlProduct = "DELETE FROM Products WHERE id = ?";
        $stmt = $conn->prepare($sqlProduct);
        $stmt->bind_param("i", $productId);
        $stmt->execute();

        // 모든 쿼리가 성공적으로 실행되면 트랜잭션을 커밋
        $conn->commit();

        // 성공적으로 삭제되었음을 알림
        echo json_encode(["success" => true, "message" => "상품이 삭제되었습니다."]);
    } catch (Exception $e) {
        // 오류가 발생하면 롤백
        $conn->rollback();
        echo json_encode(["success" => false, "message" => "상품 삭제에 실패했습니다."]);
    }

    // 연결 종료
    $conn->close();
} else {
    // 삭제할 상품 ID가 없을 경우
    echo json_encode(["success" => false, "message" => "상품 ID가 없습니다."]);
}
?>
