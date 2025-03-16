<?php
session_start(); // 세션 시작

// 데이터베이스 연결 설정
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu";

$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

// POST 데이터 가져오기
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 입력값 가져오기 및 기본 보안 처리
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // 사용자 확인 쿼리 준비
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // 사용자 데이터 확인
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // 비밀번호 검증
        if (password_verify($password, $user['password'])) {
            // 로그인 성공 - 세션에 사용자 정보 저장
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            // username이 "admin"이면 관리자 설정
            $isAdmin = ($username === 'admin');
            $_SESSION['isAdmin'] = $isAdmin;

            // JSON 응답에 관리자 여부 포함
            echo json_encode([
                "status" => "success",
                "message" => "환영합니다, " . htmlspecialchars($user['username']) . "님!",
                "isAdmin" => $isAdmin,
                "redirect" => "main.html"
            ]);
        } else {
            // 비밀번호 불일치
            http_response_code(401);
            echo json_encode([
                "status" => "error",
                "message" => "비밀번호가 올바르지 않습니다."
            ]);
        }
    } else {
        // 아이디 불일치
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "아이디가 존재하지 않습니다."
        ]);
    }

    $stmt->close();
}

// 데이터베이스 연결 닫기
$conn->close();
?>
