<?php
// 데이터베이스 연결 설정
$servername = "localhost";
$username = "root"; // 기본 MySQL 사용자
$password = ""; // XAMPP에서 기본 비밀번호는 없음
$dbname = "igagu";

// MySQL 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
}

// HTML 폼에서 전송된 데이터 가져오기
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // 비밀번호 암호화
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$receive_info = isset($_POST['receive_info']) ? 1 : 0; // 체크박스 처리
$receive_events = isset($_POST['receive_events']) ? 1 : 0;

// 데이터 삽입 쿼리
$sql = "INSERT INTO users (username, password, name, email, phone, address, receive_info, receive_events)
        VALUES ('$username', '$password', '$name', '$email', '$phone', '$address', $receive_info, $receive_events)";

if ($conn->query($sql) === TRUE) {
    header("Location: signup3.html");
    exit(); 
} else {
    
    echo "오류 발생: " . $sql . "<br>" . $conn->error;
}

// 연결 종료
$conn->close();
?>
