<?php
header('Content-Type: application/json; charset=UTF-8');
session_start();

// 관리자 확인 (관리자만 삭제 가능)
if ($_SESSION['isAdmin'] !== true) {
    echo json_encode(["success" => false, "message" => "관리자만 삭제 가능합니다."]);
    exit;
}

// 데이터 받기
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

// 데이터베이스 연결
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 공지사항 삭제 SQL
$sql = "DELETE FROM notices WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

// 실행 후 결과 확인
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "공지사항이 삭제되었습니다."]);
} else {
    echo json_encode(["success" => false, "message" => "공지사항 삭제에 실패했습니다."]);
}

$stmt->close();
$conn->close();
?>
