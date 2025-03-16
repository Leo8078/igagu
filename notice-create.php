<?php
header('Content-Type: application/json; charset=UTF-8');

// 입력값 받기
$data = json_decode(file_get_contents("php://input"), true);
$title = '<span style="color: red;">[공지]</span> ' . $data['title']; // [공지] 부분 빨간색으로 스타일 추가
$content = $data['content'];
$created_at = date('Y-m-d H:i:s');

// 데이터베이스 연결
$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "igagu";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// 연결 오류 처리
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "데이터베이스 연결 실패"]);
    exit; // 데이터베이스 연결 실패 시 처리
}

// 공지사항 데이터 삽입
$sql = "INSERT INTO notices (title, content, created_at) VALUES ('$title', '$content', '$created_at')";
$response = [
    'success' => true,
    'message' => '공지사항 작성 완료'
];

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "공지사항이 작성되었습니다."]);
} else {
    echo json_encode(["success" => false, "message" => "공지사항 작성에 실패했습니다."]);
}

$conn->close();
?>
