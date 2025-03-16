document.querySelector(".login-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // 기본 폼 제출 막음

    // 입력 필드 값 가져오기
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
    }

    try {
        // 서버로 로그인 데이터 전송
        const response = await fetch("login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        });

        const result = await response.json(); // 서버 응답 처리

        if (response.ok && result.status === "success") {
            // 로그인 성공: sessionStorage에 데이터 저장
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("isAdmin", result.isAdmin ? "true" : "false");

            alert(result.message); // 성공 메시지 출력
            window.location.href = result.redirect; // 지정된 페이지로 이동
        } else {
            alert(result.message || "로그인에 실패했습니다."); // 실패 메시지 출력
        }
    } catch (error) {
        console.error("로그인 요청 중 오류가 발생했습니다.", error);
        alert("로그인 요청 중 문제가 발생했습니다. 네트워크를 확인하세요.");
    }
});
