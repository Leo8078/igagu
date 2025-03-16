<?php
session_start(); // 세션 시작

// 로그인 여부 확인
if (!isset($_SESSION['user_id'])) {
    // 로그인하지 않은 경우 JSON으로 응답
    echo json_encode(["loggedIn" => false]);
    exit();
}

// DB 연결 정보
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "igagu";

// DB 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// DB 연결 오류 체크
if ($conn->connect_error) {
    die(json_encode(["error" => "DB 연결 실패: " . $conn->connect_error]));
}

// 세션에 저장된 사용자 ID를 기반으로 사용자 정보 조회
$user_id = $_SESSION['user_id'];
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // 모든 사용자 정보 반환 (JSON 형태로)
    echo json_encode([
        "loggedIn" => true,
        "userInfo" => $user // DB에서 가져온 모든 사용자 정보
    ]);
} else {
    // 회원 정보를 찾을 수 없는 경우
    echo json_encode(["loggedIn" => false, "error" => "회원 정보를 찾을 수 없습니다."]);
}

// DB 연결 종료
$conn->close();
?>
