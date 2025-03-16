document.addEventListener("DOMContentLoaded", function () {
    // 필드, 체크박스, 라디오 버튼, 주문 완료 버튼 요소들
    const nameInput = document.getElementById("name"); // 주문자
    const phoneInput = document.getElementById("phone"); // 주문자 휴대폰
    const recipientInput = document.getElementById("recipient"); // 받으실 분
    const addressInput = document.getElementById("address"); // 주소
    const termsAgree1 = document.getElementById("terms-agree1"); // 체크박스 1
    const termsAgree2 = document.getElementById("terms-agree2"); // 체크박스 2
    const paymentMethodRadioButtons = document.querySelectorAll(
        'input[name="method-choice"]'
    ); // 결제 수단 라디오 버튼
    const submitBtn = document.getElementById("signup-btn"); // 주문 완료 버튼

    // 주문 완료 버튼 활성화 조건 확인 함수
    function updateSubmitButton() {
        // 모든 조건이 충족되었는지 확인
        const isFormValid =
            nameInput.value.trim() !== "" && // 주문자 이름 필수
            phoneInput.value.trim() !== "" && // 주문자 휴대폰 필수
            recipientInput.value.trim() !== "" && // 받으실 분 필수
            addressInput.value.trim() !== "" && // 주소 필수
            termsAgree1.checked && // 체크박스 1 체크 필수
            termsAgree2.checked && // 체크박스 2 체크 필수
            Array.from(paymentMethodRadioButtons).some((radio) => radio.checked); // 라디오 버튼 중 하나 체크 필수

        submitBtn.disabled = !isFormValid; // 조건 충족 시 버튼 활성화
    }

    // 각 필드와 체크박스, 라디오 버튼에 이벤트 리스너 추가
    if (nameInput) nameInput.addEventListener("input", updateSubmitButton);
    if (phoneInput) phoneInput.addEventListener("input", updateSubmitButton);
    if (recipientInput) recipientInput.addEventListener("input", updateSubmitButton);
    if (addressInput) addressInput.addEventListener("input", updateSubmitButton);
    if (termsAgree1) termsAgree1.addEventListener("change", updateSubmitButton);
    if (termsAgree2) termsAgree2.addEventListener("change", updateSubmitButton);
    if (paymentMethodRadioButtons.length) {
        paymentMethodRadioButtons.forEach((radio) => {
            radio.addEventListener("change", updateSubmitButton);
        });
    }

    // 초기 상태 확인 (페이지 로드 시)
    updateSubmitButton();

    // 주문 완료 버튼 클릭 시 complete1.html로 이동
    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            if (!submitBtn.disabled) {
                window.location.href = "complete2.html";
            }
        });
    }
});

// 페이지에 따라 단계별 강조 처리
window.addEventListener('DOMContentLoaded', (event) => {
    // 현재 페이지가 'signup1.html', 'signup2.html', 'signup3.html' 인지 확인
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('cart')) {
        const step1 = document.querySelector('.step1');
        if (step1) step1.style.fontWeight = 'bold';
    } else if (currentPage.includes('payment1')) {
        const step2 = document.querySelector('.step2');
        if (step2) step2.style.fontWeight = 'bold';
    } else if (currentPage.includes('complete1')) {
        const step3 = document.querySelector('.step3');
        if (step3) step3.style.fontWeight = 'bold';
    }
});

