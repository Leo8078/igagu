<?php
include 'find.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];

    $stmt = $pdo->prepare("SELECT username FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        $username = htmlspecialchars($result['username']);
        echo "
        <!DOCTYPE html>
        <html lang='ko'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>아이디 찾기 결과</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .result-container {
                    background: #fff;
                    padding: 20px 40px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .result-container h1 {
                    color: #333;
                    font-size: 1.8em;
                    margin-bottom: 50px;
                }
                .result-container p {
                    color: #666;
                    font-size: 1.2em;
                    margin-bottom: 50px;
                }
                .btn {
                    padding: 10px 20px;
                    background: #000000;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    display: inline-block;
                }
                .btn:hover {
                    background: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class='result-container'>
                <h1>아이디 찾기 성공!</h1>
                <p>아이디는 <strong>$username</strong>입니다.</p>
                <a href='login.html' class='btn'>로그인 페이지로 돌아가기</a>
            </div>
        </body>
        </html>
        ";
    } else {
        echo "<script>
                alert('해당 이메일로 등록된 아이디가 없습니다.');
                history.back(); // 이전 페이지로 돌아가기
              </script>";
    }
}
?>
