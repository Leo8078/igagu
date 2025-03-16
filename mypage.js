window.addEventListener('DOMContentLoaded', (event) => {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('main')) {
        document.querySelector('.step1').style.fontWeight = 'bold';
    } else if (currentPage.includes('mypage')) {
        document.querySelector('.step2').style.fontWeight = 'bold';
    } else if (currentPage.includes('coupon-history')) {
        document.querySelector('.step3').style.fontWeight = 'bold';
    }
});

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
        document.getElementById("username").textContent = result.userInfo.name;

        document.getElementById("membership-level").textContent = result.userInfo.grade;
        
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // 주문 내역을 가져오기 위한 API 호출
    fetch('get_orders.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                // 주문 내역이 있으면 테이블에 표시
                if (data.orders && data.orders.length > 0) {
                    const tableBody = document.querySelector('.order-table tbody');
                    tableBody.innerHTML = ''; // 기존 내용 비우기

                    data.orders.forEach(order => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${order.order_date} / ${order.order_number}</td>
                            <td>${order.product_name}</td>
                            <td>${order.quantity}</td>
                            <td>${order.size || 'N/A'} / ${order.color || 'N/A'}</td>
                            <td>${order.price} 원</td>
                        `;
                        tableBody.appendChild(row);
                    });
                } else {
                    const tableBody = document.querySelector('.order-table tbody');
                    tableBody.innerHTML = '<tr><td colspan="5">최근 주문 내역이 없습니다.</td></tr>';
                }
            } else {
                alert(data.error || "로그인 상태가 아닙니다.");
            }
        })
        .catch(error => {
            console.error("주문 내역을 가져오는 중 오류가 발생했습니다:", error);
        });
});

