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

        document.getElementById("name").value = result.userInfo.name;

        document.getElementById("phone").value = result.userInfo.phone;

        document.getElementById("address").value = result.userInfo.address;

    }
});


document.addEventListener("DOMContentLoaded", function () {
    // 주문자 정보 복사 버튼 기능
    document.getElementById('copyButton').addEventListener('click', function () {
        // 주문자 정보 가져오기
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const phone2 = document.getElementById('phone2').value;

        // 값이 비어있지 않으면 배송 정보에 복사
        if (name) {
            document.getElementById('recipient').value = name;
        }
        if (phone) {
            document.getElementById('recipient-phone').value = phone;
        }
        if (phone2) {
            document.getElementById('recipient-phone2').value = phone2;
        }
    });

    // 결제 수단 라디오 버튼
    const cardRadio = document.getElementById('card');
    const bankSelection = document.getElementById('bank-selection');
    const easyPayRadio = document.getElementById('easy-pay');
    const easyPaySelection = document.getElementById('easy-pay-selection');
    const bankTransferRadio = document.getElementById('bank-transfer');
    const bankTransferWarning = document.getElementById('bank-transfer-warning');
    const naverPayRadio = document.getElementById('naverpay');
    const kakaoPayRadio = document.getElementById('kakaopay');

    // 신용카드 선택 시 은행 선택 보이기
    cardRadio.addEventListener('change', function () {
        if (cardRadio.checked) {
            bankSelection.style.display = 'flex'; // 은행 선택 부분 보이기
        }
    });

    // 간편 결제 선택 시 삼성페이, 페이코, 토스 옵션 보이기
    easyPayRadio.addEventListener('change', function () {
        if (easyPayRadio.checked) {
            easyPaySelection.style.display = 'flex';  // 간편 결제 옵션 보이기
            bankSelection.style.display = 'none';     // 결제 은행 선택 숨기기
            bankTransferWarning.style.display = 'none'; // 경고 문구 숨기기
        }
    });

    // 네이버페이, 카카오페이 선택 시 은행 선택 숨기기
    [naverPayRadio, kakaoPayRadio].forEach(radio => {
        radio.addEventListener('change', function () {
            if (radio.checked) {
                easyPaySelection.style.display = 'none';  // 간편 결제 옵션 숨기기
                bankSelection.style.display = 'none';   // 은행 선택 숨기기
                bankTransferWarning.style.display = 'none'; // 경고 문구 숨기기
            }
        });
    });

    // 다른 결제 수단을 선택하면 은행 선택 부분 보이기
    const otherRadios = document.querySelectorAll('input[name="method-choice"]:not(#easy-pay):not(#naverpay):not(#kakaopay)');
    otherRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            easyPaySelection.style.display = 'none';  // 간편 결제 옵션 숨기기
            bankSelection.style.display = 'flex';   // 결제 은행 선택 보이기
            bankTransferWarning.style.display = 'none'; // 계좌이체 안내문구 숨기기
        });
    });

    // 계좌 이체 라디오 버튼을 선택했을 때 경고 문구만 보이도록 하기
    bankTransferRadio.addEventListener('change', function () {
        if (bankTransferRadio.checked) {
            bankTransferWarning.style.display = 'block';  // 계좌이체 경고 문구 보이기
            bankSelection.style.display = 'none'; // 은행 선택 부분 숨기기
        }
    });

    // 주문 완료 버튼 활성화 조건 체크
    function checkFormCompletion() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const recipient = document.getElementById('recipient').value;
        const recipientPhone = document.getElementById('recipient-phone').value;
        const paymentMethods = document.querySelectorAll('input[name="method-choice"]:checked');

        // 모든 필수 입력란이 채워지고 결제 수단이 선택되면 주문 완료 버튼 활성화
        const isFormComplete = name && phone && recipient && recipientPhone && paymentMethods.length > 0;
        const signupBtn = document.getElementById('signup-btn');
        signupBtn.disabled = !isFormComplete; // 조건이 맞으면 버튼 활성화
    }

    // 입력란 변경 시마다 체크
    document.getElementById('name').addEventListener('input', checkFormCompletion);
    document.getElementById('phone').addEventListener('input', checkFormCompletion);
    document.getElementById('recipient').addEventListener('input', checkFormCompletion);
    document.getElementById('recipient-phone').addEventListener('input', checkFormCompletion);

    // 결제 수단 라디오 버튼 변경 시 체크
    const paymentRadios = document.querySelectorAll('input[name="method-choice"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', checkFormCompletion);
    });
});

// 결제 수단을 선택하는 함수
function getSelectedPaymentMethod() {
    const paymentMethodElements = document.getElementsByName('method-choice'); // 결제 수단 라디오 버튼들
    for (let i = 0; i < paymentMethodElements.length; i++) {
        if (paymentMethodElements[i].checked) {
            return paymentMethodElements[i].value;  // 선택된 결제 수단의 value 반환
        }
    }
    return null;  // 결제 수단이 선택되지 않은 경우
}


