<?php
// 데이터베이스 연결 설정
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB 연결 실패"]));
}

// 입력된 아이디 가져오기
$username = $_POST['username'] ?? '';

if (!$username) {
    echo json_encode(["status" => "error", "message" => "아이디가 입력되지 않았습니다."]);
    exit();
}

// 아이디 중복 확인
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "exists", "message" => "이미 사용 중인 아이디입니다."]);
} else {
    echo json_encode(["status" => "available", "message" => "사용 가능한 아이디입니다."]);
}

$stmt->close();
$conn->close();
?>
