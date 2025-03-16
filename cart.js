document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const shippingFeeEl = document.getElementById("shipping-fee");
    const totalCostEl = document.getElementById("total-cost");
    const deleteBtn = document.getElementById("delete-btn"); // 선택 상품 삭제 버튼
    const nextBtn = document.getElementById("next-btn"); // 주문하러 가기 버튼

    // DB에서 장바구니 항목 불러오기
    function fetchCartItems() {
        fetch('get_cart.php')  // 서버에서 DB로부터 장바구니 항목 가져오기
            .then(response => response.json())
            .then(cartItems => {
                renderCartItems(cartItems);
                updateSummary(cartItems);
                toggleNextButton(cartItems); // 장바구니 항목에 따라 버튼 활성화/비활성화
            })
            .catch(error => {
                console.error('장바구니 항목을 가져오는 중 오류가 발생했습니다.', error);
            });
    }

    // 장바구니 항목 렌더링
    function renderCartItems(cartItems) {
        cartItemsContainer.innerHTML = "";  // 기존 항목들 지우기

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<p>장바구니가 비어 있습니다.</p>";  // 항목이 없을 때 메시지 표시
            return;
        }

        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");
            itemDiv.innerHTML = `
                <input type="checkbox" class="cart-item-checkbox" data-id="${item.product_id}">
                <img src="${item.image_url}" alt="${item.name}">
                <div class="item-info">
                    <p>상품명: ${item.name}</p>
                    <p>가격: ${item.price.toLocaleString()}원</p>
                    <p>수량: ${item.quantity}</p>
                    <p>선택 옵션: ${item.size} / ${item.color}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    // 장바구니 요약 업데이트
    function updateSummary(cartItems) {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        totalPriceEl.textContent = totalPrice.toLocaleString();
        shippingFeeEl.textContent = '0';  // 예시로 0원으로 처리
        totalCostEl.textContent = totalPrice.toLocaleString();
    }

    // 장바구니에 상품이 있을 때 주문하러 가기 버튼 활성화/비활성화
    function toggleNextButton(cartItems) {
        if (cartItems.length > 0) {
            nextBtn.disabled = false; // 버튼 활성화
        } else {
            nextBtn.disabled = true; // 버튼 비활성화
        }
    }

    // 선택된 상품 삭제
    deleteBtn.addEventListener("click", function () {
        const checkboxes = document.querySelectorAll(".cart-item-checkbox:checked");
        const selectedIds = Array.from(checkboxes).map(checkbox => checkbox.getAttribute("data-id"));
        
        if (selectedIds.length > 0) {
            // 서버로 삭제 요청 보내기
            fetch('delete_from_cart.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_ids: selectedIds })
            })
            .then(response => response.text())
            .then(message => {
                console.log(message);  // 성공 메시지 출력
                fetchCartItems();  // 삭제 후 장바구니 새로고침
            })
            .catch(error => {
                console.error('상품 삭제 중 오류가 발생했습니다.', error);
            });
        } else {
            alert("삭제할 상품을 선택하세요.");
        }
    });

            // 주문하러 가기 버튼
    nextBtn.addEventListener("click", function () {
        // 로그인 상태 확인
        checkLoginStatus().then((response) => {
            if (response.loggedIn) {
                // 로그인 상태라면 payment2.html로 이동
                window.location.href = "payment2.html";
            } else {
                // 비로그인 상태라면 확인 창 표시
                const confirmOrder = confirm("현재 로그인이 되어 있지 않습니다! 비회원으로 주문하시겠습니까?");
                if (confirmOrder) {
                    // '예'를 선택하면 payment1.html로 이동
                    window.location.href = "payment1.html";
                } else {
                    // '아니요'를 선택하면 login.html로 이동
                    window.location.href = "login.html";
                }
            }
        }).catch((error) => {
            console.error("로그인 상태 확인 중 오류 발생:", error);
        });
    });
 
    // 로그인 상태 확인 함수
    function checkLoginStatus() {
        return fetch("check_session.php", { method: "GET", credentials: "include" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP 응답 상태 오류: " + response.status);
                }
                return response.json(); // JSON 응답 변환
            })
            .then((data) => {
                return data; // JSON 데이터 반환
            })
            .catch((error) => {
                console.error("서버 요청 오류:", error);
                throw error;
            });
    }

    // 페이지 초기화
    fetchCartItems();

});
