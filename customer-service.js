document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop();

    // 공통: 사이드 메뉴 활성화
    activateMenu(currentPath);

    // 페이지별 로직 분기
    if (currentPath === "notice.html" || currentPath === "customer-service.html") {
        handleNoticePage();
    } else if (currentPath === "faq.html") {
        handleFaqPage();
    }
});

// 공통: 현재 위치에 따라 사이드 메뉴 활성화
function activateMenu(currentPath) {
    const menuItems = document.querySelectorAll(".menu-list li a");
    menuItems.forEach((item) => {
        if (item.getAttribute("href") === currentPath) {
            item.parentElement.classList.add("active");
        }
    });
}

// 공지사항 페이지 로직
function handleNoticePage() {
    const customerRows = document.querySelectorAll(".notice-table tbody tr");
    const writeBtn = document.getElementById("write-btn");

    // 공지사항 행 클릭 이벤트
    if (customerRows && customerRows.length > 0) {
        customerRows.forEach((row) => {
            row.addEventListener("click", () => {
                const postId = row.getAttribute("data-id");
                window.location.href = `notice-detail.html?id=${postId}`;
            });
        });
    } else {
        console.warn("공지사항 테이블 행을 찾을 수 없습니다.");
    }
}


const categoryMapping = {
    member: "회원",
    shipping: "배송",
    order: "주문",
    return: "반품/환불",
    product: "상품",
    all: "전체",
    other: "기타"
};

// FAQ 페이지 로직
function handleFaqPage() {
    const faqList = document.getElementById("faq-list");
    if (!faqList) {
        console.error("faq-list 요소를 찾을 수 없습니다.");
        return;
    }

    const faqData = [
        { id: 1, category: "member", title: "회원가입은 어떻게 하나요?" },
        { id: 2, category: "shipping", title: "가구 배송은 얼마나 걸리나요?" },
        { id: 3, category: "order", title: "주문 취소는 어떻게 하나요?" },
        { id: 4, category: "return", title: "반품/환불 절차는 어떻게 진행되나요?" },
        { id: 5, category: "product", title: "제품의 상세 정보를 어디서 확인하나요?" },
    ];

    const itemsPerPage = 3; // 한 페이지에 표시할 항목 수
    let currentPage = 1;

    // 데이터 렌더링 함수
    const renderFaqs = (data) => {
        faqList.innerHTML = "";
        data.forEach((faq) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${categoryMapping[faq.category]}</td>
                <td>${faq.title}</td>
            `;
            faqList.appendChild(row);
        });
    };

    // 페이지네이션 렌더링 함수
    const renderPagination = () => {
        const totalPages = Math.ceil(faqData.length / itemsPerPage);
        const paginationContainer = document.querySelector(".pagination");
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.classList.add("page-btn");
            pageBtn.textContent = i;
            pageBtn.setAttribute("data-page", i);
            if (i === currentPage) pageBtn.classList.add("active");
            paginationContainer.appendChild(pageBtn);
        }
    };

    // 데이터 렌더링 함수 (페이지네이션 적용)
    const renderFaqsWithPagination = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        renderFaqs(faqData.slice(start, end));
        renderPagination();
    };

    // 페이지 버튼 클릭 이벤트
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("page-btn")) {
            currentPage = parseInt(e.target.getAttribute("data-page"), 10);
            renderFaqsWithPagination();
        }
    });

    // 카테고리 필터링
    document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            document
                .querySelectorAll(".category-btn")
                .forEach((btn) => btn.classList.remove("active"));
            e.target.classList.add("active");

            const category = e.target.getAttribute("data-category");
            if (category === "all") {
                renderFaqs(faqData);
            } else {
                const filtered = faqData.filter(
                    (faq) => faq.category === category
                );
                renderFaqs(filtered);
            }
        });
    });

    // 검색 기능
    document
        .getElementById("faq-search-btn")
        .addEventListener("click", () => {
            const searchInput = document
                .getElementById("faq-search-input")
                .value.toLowerCase();
            const filtered = faqData.filter((faq) =>
                faq.title.toLowerCase().includes(searchInput)
            );
            renderFaqs(filtered);
        });

    // 초기 데이터 렌더링
    renderFaqsWithPagination();
}