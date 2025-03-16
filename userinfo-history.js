document.addEventListener("DOMContentLoaded", async () => {
    // check_session.php 파일을 호출하여 로그인 상태 확인 및 사용자 정보 받기
    const response = await fetch("check_session.php", { method: "GET" });
    const result = await response.json();

    // 로그인 상태 확인
    if (!result.loggedIn) {
        // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        alert("로그인이 필요합니다.");
        window.location.href = "login.html"; // 로그인 페이지로 리다이렉트
    } else {
        // 로그인한 경우 사용자 이름을 HTML 요소에 표시
        document.getElementById("inputUsername").value = result.userInfo.username;

        document.getElementById("name").value = result.userInfo.name;

        document.getElementById("email").value = result.userInfo.email;

        document.getElementById("phone").value = result.userInfo.phone;

        document.getElementById("address").value = result.userInfo.address;

    }
});


document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("check_session.php", { method: "GET" });
    const result = await response.json();

    if (!result.loggedIn) {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
    } else {
        document.getElementById("inputUsername").value = result.userInfo.username;
        document.getElementById("name").value = result.userInfo.name;
        document.getElementById("email").value = result.userInfo.email;
        document.getElementById("phone").value = result.userInfo.phone;
        document.getElementById("address").value = result.userInfo.address;
    }

    // 입력된 값 검증 및 버튼 활성화
    const inputs = document.querySelectorAll("#password, #confirm-password, #name, #email, #phone, #address");
    inputs.forEach(input => input.addEventListener("input", validateInputs));

    function validateInputs() {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;

        // 비밀번호 일치 확인
        const passwordMessage = document.getElementById("password-message");
        if (password && confirmPassword && password !== confirmPassword) {
            passwordMessage.textContent = "비밀번호가 일치하지 않습니다.";
            passwordMessage.style.color = "red";
            passwordMessage.style.marginLeft = "20px";

            return disableSubmitButton();
        } else {
            passwordMessage.textContent = "";
        }

        // 필수 입력 항목 모두 체크
        if (password && confirmPassword && name && email && phone && address) {
            enableSubmitButton();
        } else {
            disableSubmitButton();
        }
    }

    function enableSubmitButton() {
        document.getElementById("signup-btn").disabled = false;
    }

    function disableSubmitButton() {
        document.getElementById("signup-btn").disabled = true;
    }
});

async function updateUserInfo(event) {
    event.preventDefault();
    
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    
    const updatedInfo = {
        password: password,
        name: name,
        email: email,
        phone: phone,
        address: address
    };

    const response = await fetch('update_user_info.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedInfo)
    });

    const result = await response.json();

    if (result.success) {
        alert("회원 정보가 수정되었습니다.");
        window.location.href = 'mypage.html'; // 수정 후 마이페이지로 리다이렉트
    } else {
        alert("정보 수정에 실패했습니다.");
    }
}


// 정보 수정 완료 후 서버로 전송하는 함수
async function updateUserInfo(event) {
    event.preventDefault(); // 기본 동작 방지 (페이지 리로딩 방지)

    // 입력값 가져오기
    const username = document.getElementById("inputUsername").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    // 비밀번호 확인
    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    // 서버로 보내기 위한 데이터 준비
    const data = {
        username,
        password,
        name,
        email,
        phone,
        address
    };

    // 서버로 사용자 정보 수정 요청
    const response = await fetch("update_user_info.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    // 수정 결과에 따른 처리
    if (result.success) {
        alert("정보가 수정되었습니다.");
        window.location.href = "mypage.html"; // 마이페이지로 리다이렉트
    } else {
        alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
}


