<?php
session_start(); // 세션 시작

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php"); // 로그인하지 않은 사용자는 리다이렉트
    exit();
}

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("DB 연결 실패: " . $conn->connect_error);
}

// 사용자 ID 기반 데이터 조회
$user_id = $_SESSION['user_id']; // 로그인 시 저장된 사용자 ID 사용
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    echo "회원 정보를 찾을 수 없습니다.";
    exit();
}

$conn->close();
?>


