document.addEventListener("DOMContentLoaded", function () {

    // 전체 선택 체크박스를 가져옵니다.
    const selectAllCheckbox = document.getElementById("terms-agree");

    // 다른 체크박스들을 가져옵니다.
    const checkbox1 = document.getElementById("terms-agree1");
    const checkbox2 = document.getElementById("terms-agree2");

    // 전체 선택 체크박스를 클릭했을 때 다른 체크박스들이 자동으로 체크되게 합니다.
    selectAllCheckbox.addEventListener("change", function () {
        // 전체 체크박스가 체크되면 다른 체크박스들도 체크되고, 체크 해제되면 모두 해제됩니다.
        checkbox1.checked = selectAllCheckbox.checked;
        checkbox2.checked = selectAllCheckbox.checked;
    });

    // 체크박스 1, 2가 모두 체크되면 전체 선택 체크박스를 체크하도록 합니다.
    checkbox1.addEventListener("change", checkSelectAll);
    checkbox2.addEventListener("change", checkSelectAll);

    // 체크박스 1, 2가 모두 체크되었는지 확인하는 함수
    function checkSelectAll() {
        // 체크박스 1과 체크박스 2가 모두 체크된 경우 전체 선택 체크박스를 체크
        if (checkbox1.checked && checkbox2.checked) {
            selectAllCheckbox.checked = true;
        } else {
            selectAllCheckbox.checked = false;
        }
    }

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