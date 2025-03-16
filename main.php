<?php
session_start();
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>메인 페이지</title>
</head>
<body>
    <h1>메인 페이지</h1>

    <?php if (isset($_SESSION['user_id'])): ?>
        <p>환영합니다, <?php echo htmlspecialchars($_SESSION['display_name']); ?>님!</p>
        <a href="logout.php">로그아웃</a>
    <?php else: ?>
        <p>비회원 상태입니다. <a href="login.html">로그인</a></p>
    <?php endif; ?>
</body>
</html>
