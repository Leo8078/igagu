<?php
header('Content-Type: application/json; charset=UTF-8');
session_start(); // 세션 시작

// 로그인 여부 확인
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "로그인하지 않은 사용자입니다."]);
    exit;
}

// 세션에서 user_id 가져오기
$user_id = $_SESSION['user_id'];  // 로그인한 사용자의 user_id를 세션에서 가져오기

// JSON 형식으로 입력값 받기
$data = json_decode(file_get_contents("php://input"), true);

// 디버깅: 받은 JSON 데이터 확인
if ($data === null) {
    echo json_encode(["success" => false, "message" => "JSON 데이터 파싱 오류"]);
    exit;
}

// 데이터가 null일 수 있으므로 값이 존재하는지 확인
if (!isset($data['name']) || !isset($data['contact']) || !isset($data['category']) || !isset($data['message'])) {
    echo json_encode(["success" => false, "message" => "필수 입력값이 없습니다."]);
    exit;
}

$name = $data['name'];
$contact = $data['contact'];
$category = $data['category'];
$message = $data['message'];
$created_at = date('Y-m-d H:i:s');

// MySQL 연결
$servername = "localhost";
$username_db = "root";
$password_db = "";  // MySQL 비밀번호
$dbname = "igagu";   // 데이터베이스 이름

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// 연결 오류 처리
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "데이터베이스 연결 실패"]);
    exit;
}

// 데이터 삽입 쿼리 (user_id 추가)
$sql = "INSERT INTO inquiries (name, contact, category, message, created_at, user_id) 
        VALUES ('$name', '$contact', '$category', '$message', '$created_at', '$user_id')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "문의사항이 작성되었습니다."]);
} else {
    echo json_encode(["success" => false, "message" => "문의사항 작성에 실패했습니다."]);
}

$conn->close();
?>
