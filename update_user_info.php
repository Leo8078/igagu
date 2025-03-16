<?php
// MySQL 연결 설정
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'igagu';
$conn = new mysqli($host, $user, $password, $database);

// 데이터 받아오기
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // 비밀번호 해시화
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$address = $data['address'];

// SQL 쿼리 작성
$query = "UPDATE users SET password = ?, name = ?, email = ?, phone = ?, address = ? WHERE username = ?";

// Prepared statement 사용하여 데이터 안전하게 처리
$stmt = $conn->prepare($query);
$stmt->bind_param("ssssss", $password, $name, $email, $phone, $address, $username);

// 쿼리 실행
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

// 연결 종료
$stmt->close();
$conn->close();
?>
