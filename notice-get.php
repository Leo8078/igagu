<?php
header('Content-Type: application/json; charset=UTF-8');

// Database 연결
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "igagu"; // 데이터베이스 이름

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// URL 파라미터에서 'id' 값을 받기
$postId = isset($_GET['id']) ? $_GET['id'] : null; 

// 공지사항 목록을 가져오는 쿼리
$sql = "SELECT id, title, DATE_FORMAT(created_at, '%Y-%m-%d') as date FROM notices ORDER BY created_at DESC";
$result = $conn->query($sql);

$notices = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notices[] = $row;
    }
}

// 공지사항 상세 정보를 가져오는 쿼리 (id가 있을 경우)
if ($postId) {
    $sql2 = "SELECT id, title, content, DATE_FORMAT(created_at, '%Y-%m-%d') as date FROM notices WHERE id = ?";
    $stmt = $conn->prepare($sql2);
    $stmt->bind_param("i", $postId); // id는 정수형
    $stmt->execute();
    $result2 = $stmt->get_result();

    if ($result2->num_rows > 0) {
        $post = $result2->fetch_assoc();
        
        // 제목에서 HTML 태그 제거
        $title = strip_tags($post['title']);  // HTML 태그 제거
        $content = $post['content'];
        $date = $post['date'];

        $response = [
            'title' => $title,
            'content' => $content,
            'date' => $date
        ];
        echo json_encode($response);
    } else {
        echo json_encode(["success" => false, "message" => "공지사항이 존재하지 않습니다."]);
    }
    $stmt->close();
} else {
    // 공지사항 목록만 반환
    echo json_encode($notices);
}

$conn->close();
?>
