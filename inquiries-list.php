<?php
session_start();  // 세션 시작

// 로그인 여부 확인
if (!isset($_SESSION['user_id'])) {
    // 로그인하지 않은 경우 로그인 페이지로 리디렉션
    header("Location: logintest.html");
    exit();
}

$user_id = $_SESSION['user_id'];  // 세션에서 로그인한 사용자의 ID 가져오기

// MySQL 연결
$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "igagu";  // 데이터베이스 이름

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// 연결 오류 처리
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 로그인한 사용자의 문의 내역만 조회
$sql = "SELECT id, name, contact, category, message, answer, status, created_at 
        FROM inquiries 
        WHERE user_id = '$user_id' 
        ORDER BY created_at DESC";
$result = $conn->query($sql);

?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문의 내역</title>
    <link rel="stylesheet" href="header.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-top:80px;
            margin-bottom: 20px;
        }
        .board-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .board-item {
            display: flex;
            flex-direction: column;
            padding: 15px;
            margin-bottom: 15px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        .board-item:hover {
            background-color: #f1f1f1;
        }
        .board-item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 1.1em;
            font-weight: bold;
            color: #333;
        }
        .board-item-content {
            margin-bottom: 10px;
            color: #666;
        }
        .board-item-footer {
            display: flex;
            justify-content: space-between;
            font-size: 0.9em;
            color: #888;
        }
        .status {
            font-weight: bold;
            color: #007bff;
        }
        .answer {
            color: green;
        }
        .no-data {
            text-align: center;
            color: #888;
        }
    </style>
</head>
<body>
    <div id="header-container"></div>

    <h1>고객 문의 내역</h1>
    <div class="board-container">

        <?php
        // 데이터가 있는 경우
        if ($result->num_rows > 0) {
            // 각 행에 대해 출력
            while ($row = $result->fetch_assoc()) {
                echo "<div class='board-item'>
                        <div class='board-item-header'>
                            <span>이름: " . htmlspecialchars($row['name'], ENT_QUOTES, 'UTF-8') . "</span>
                            <span>연락처: " . htmlspecialchars($row['contact'], ENT_QUOTES, 'UTF-8') . "</span>
                        </div>
                        <div class='board-item-content'>
                            <strong>상담 카테고리:</strong> " . htmlspecialchars($row['category'], ENT_QUOTES, 'UTF-8') . "<br>
                            <strong>상담 내용:</strong> " . nl2br(htmlspecialchars($row['message'], ENT_QUOTES, 'UTF-8')) . "
                        </div>
                        <div class='board-item-footer'>
                            <span class='status'>
                                " . ($row['status'] === 'pending' ? '답변 대기 중' : '답변 완료') . "
                            </span>
                            <span class='answer'>답변: " . ($row['answer'] ? htmlspecialchars($row['answer'], ENT_QUOTES, 'UTF-8') : '답변 대기 중') . "</span>
                            <span>작성일: " . htmlspecialchars($row['created_at'], ENT_QUOTES, 'UTF-8') . "</span>
                        </div>
                    </div>";
            }
        } else {
            // 데이터가 없는 경우
            echo "<p class='no-data'>문의 내역이 없습니다.</p>";
        }

        // 연결 종료
        $conn->close();
        ?>

    </div>
    <script src="header.js"></script>
</body>
</html>
