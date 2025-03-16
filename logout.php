<?php
session_start();
session_destroy(); // 모든 세션 데이터 삭제
header("Location: main.html"); // 메인 페이지로 리다이렉트
exit;
?>