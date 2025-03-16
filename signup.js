window.addEventListener('DOMContentLoaded', (event) => {
    // 현재 페이지가 'signup1.html', 'signup2.html', 'signup3.html' 인지 확인
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('signup1')) {
        document.querySelector('.step1').style.fontWeight = 'bold';
    } else if (currentPage.includes('signup2')) {
        document.querySelector('.step2').style.fontWeight = 'bold';
    } else if (currentPage.includes('signup3')) {
        document.querySelector('.step3').style.fontWeight = 'bold';
    }
});

////////////////////////////// signup1

// signup1 페이지에서
if (window.location.pathname.includes('signup1')) {
    window.addEventListener('DOMContentLoaded', (event) => {
        const termsAllCheckbox = document.querySelector('#terms-agree'); 
        const termsCheckbox1 = document.querySelector('#terms-agree1');
        const termsCheckbox2 = document.querySelector('#terms-agree2');
        const nextBtn = document.querySelector('#next-btn');
        const prevBtn = document.querySelector('#prev-btn');
        
        termsAllCheckbox.addEventListener('change', function() {
            const isChecked = termsAllCheckbox.checked;
            termsCheckbox1.checked = isChecked; 
            termsCheckbox2.checked = isChecked; 
            updateNextButton(); 
        });

        termsCheckbox1.addEventListener('change', updateNextButton);
        termsCheckbox2.addEventListener('change', updateNextButton);

        function updateNextButton() {
            if (termsCheckbox1.checked && termsCheckbox2.checked) {
                nextBtn.disabled = false;
            } else {
                nextBtn.disabled = true;
            }

            if (termsCheckbox1.checked && termsCheckbox2.checked) {
                termsAllCheckbox.checked = true;
            } else {
                termsAllCheckbox.checked = false;
            }
        }

        prevBtn.addEventListener('click', function() {
            window.history.back(); 
        });

        nextBtn.addEventListener('click', function() {
            window.location.href = "signup2.html"; 
        });
    });
}

////////////////////////////// signup2

// signup2 페이지에서
if (window.location.pathname.includes('signup2')) {
    document.addEventListener("DOMContentLoaded", () => {
        // 입력 필드 가져오기
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const emailDomainSelect = document.getElementById('email-domain');
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');
        const signupBtn = document.getElementById('signup-btn');
        const prevBtn = document.querySelector('#prev-btn');

        const passwordMessage = document.getElementById('password-message');
        const emailMessage = document.getElementById('email-message');
        const phoneMessage = document.getElementById('phone-message');
        const usernameFeedback = document.getElementById("username-feedback");
        const checkUsernameBtn = document.getElementById("check-username-btn");

        let isUsernameAvailable = false;

        // 초기 회원가입 버튼 비활성화
        signupBtn.disabled = true;

        // 이메일 도메인 선택 이벤트
        emailDomainSelect.addEventListener("change", () => {
            const selectedDomain = emailDomainSelect.value;

            if (selectedDomain) {
                // @가 이미 포함되어 있으면 제거
                const emailParts = email.value.split("@")[0];
                email.value = emailParts + "@" + selectedDomain; // 선택한 도메인 추가
            } else {
                // "-- 직접입력 --" 선택 시 @ 이후 제거
                const emailParts = email.value.split("@")[0];
                email.value = emailParts; // 이메일 필드에서 도메인 제거
            }

            checkFormCompletion(); // 폼 상태 갱신
        });

        // 폼 검증 함수
        function checkFormCompletion() {
            const isPasswordMatch = password.value === confirmPassword.value;
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value); // 이메일 유효성 검사
            const isPhoneValid = /^[0-9]{10,11}$/.test(phone.value);
            const isFormComplete = username.value.trim() &&
                                   password.value.trim() &&
                                   confirmPassword.value.trim() &&
                                   name.value.trim() &&
                                   email.value.trim() &&
                                   phone.value.trim() &&
                                   address.value.trim();

            // 비밀번호 일치 여부 메시지
            if (!isPasswordMatch) {
                passwordMessage.textContent = "비밀번호가 일치하지 않습니다.";
                passwordMessage.style.color = "red";
            } else {
                passwordMessage.textContent = "";
            }

            // 이메일 유효성 메시지
            if (!isEmailValid && email.value.trim()) {
                emailMessage.textContent = "유효한 이메일 주소를 입력하세요.";
                emailMessage.style.color = "red";
            } else {
                emailMessage.textContent = "";
            }

            // 전화번호 유효성 메시지
            if (!isPhoneValid && phone.value.trim()) {
                phoneMessage.textContent = "유효한 전화번호를 입력하세요 (10-11자리 숫자).";
                phoneMessage.style.color = "red";
            } else {
                phoneMessage.textContent = "";
            }

            // 모든 조건이 충족되어야 회원가입 버튼 활성화
            signupBtn.disabled = !(isFormComplete && isPasswordMatch && isEmailValid && isPhoneValid && isUsernameAvailable);
        }

        // 아이디 중복 확인 버튼 클릭 이벤트
        checkUsernameBtn.addEventListener("click", async () => {
            const usernameValue = username.value.trim();
            if (!usernameValue) {
                usernameFeedback.textContent = "아이디를 입력해주세요.";
                usernameFeedback.style.color = "red";
                isUsernameAvailable = false;
                checkFormCompletion(); // 폼 상태 갱신
                return;
            }

            try {
                const response = await fetch("check_username.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `username=${encodeURIComponent(usernameValue)}`,
                });

                const result = await response.json();

                if (result.status === "exists") {
                    usernameFeedback.style.color = "red";
                    usernameFeedback.textContent = result.message;
                    isUsernameAvailable = false;
                } else if (result.status === "available") {
                    usernameFeedback.style.color = "green";
                    usernameFeedback.textContent = result.message;
                    isUsernameAvailable = true;
                } else {
                    usernameFeedback.style.color = "red";
                    usernameFeedback.textContent = "서버 오류가 발생했습니다.";
                    isUsernameAvailable = false;
                }

                checkFormCompletion(); // 폼 상태 갱신
            } catch (error) {
                console.error("AJAX 요청 중 오류 발생:", error);
                usernameFeedback.textContent = "서버와 연결할 수 없습니다.";
                usernameFeedback.style.color = "red";
                isUsernameAvailable = false;
                checkFormCompletion(); // 폼 상태 갱신
            }
        });

        // 입력 필드에 상태 초기화 이벤트 추가
        [username, password, confirmPassword, name, email, phone, address].forEach(field => {
            field.addEventListener('input', () => {
                if (field === username) {
                    isUsernameAvailable = false; // 아이디 변경 시 중복 확인 초기화
                    usernameFeedback.textContent = ""; // 메시지 초기화
                }
                checkFormCompletion(); // 폼 상태 갱신
            });
        });

        // 이전 버튼 동작
        prevBtn.addEventListener('click', () => {
            window.history.back();
        });

        // 회원가입 버튼 동작
        signupBtn.addEventListener('click', () => {
            window.location.href = "signup3.html";
        });

        // 초기 검증 호출
        checkFormCompletion();
    });
}


////////////////////////////// signup3

if (window.location.pathname.includes('signup3')) {
    window.addEventListener('DOMContentLoaded', (event) => {
        const homeBtn = document.querySelector('#home-btn');

        homeBtn.addEventListener('click', function() {
            window.location.href = "login.html"; 
        });
    });
}

