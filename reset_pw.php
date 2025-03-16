<?php
include 'find.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $new_password = $_POST['new_password'];

    // 비밀번호 해싱
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username AND email = :email");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->fetch()) {
        $update_stmt = $pdo->prepare("UPDATE users SET password = :password WHERE username = :username AND email = :email");
        $update_stmt->bindParam(':password', $hashed_password);
        $update_stmt->bindParam(':username', $username);
        $update_stmt->bindParam(':email', $email);
        $update_stmt->execute();
        echo "<script>
                alert('비밀번호가 성공적으로 변경되었습니다.');
                history.back(); // 이전 페이지로 돌아가기
              </script>";
    } else {
        echo "<script>
                alert('아이디 또는 이메일이 잘못되었습니다.');
                history.back(); // 이전 페이지로 돌아가기
              </script>";
    }
}
?>
