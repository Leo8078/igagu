document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.querySelector(".product-list");
    const sortingButtons = document.querySelectorAll(".sort-btn"); // 정렬 버튼들
    const itemsPerPage = 16;
    let products = [];
    let currentPage = 1;

    highlightCurrentMenu();

    // 현재 카테고리 판별
    const category = getCategoryFromUrl();
    console.log("Current Category:", category); // 디버깅용

    // 데이터 가져오기
    fetch(`/igagu/products.php?category=${category}`)
        .then(response => {
         console.log("Fetch URL:", `/igagu/products.php?category=${category}`); // 요청 URL 디버깅
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data); // 데이터를 제대로 가져오는지 확인
            products = data;
            renderProducts();
            console.log("Calling initializePagination...");
            initializePagination();
        })
        .catch(error => {
            console.error("Fetch Error:", error); // 오류 로그 출력
            showNoProductsMessage();
        });

    // 정렬 버튼 클릭 이벤트
    sortingButtons.forEach(button => {
        button.addEventListener("click", () => {
            const sortType = button.getAttribute("data-sort");

            // 정렬 수행
            sortProducts(sortType);

            // 버튼 스타일 업데이트
            updateActiveButton(button);

            // 정렬 후 상품 렌더링
            renderProducts();
        });
    });

    // 정렬 함수
    function sortProducts(sortType) {
        switch (sortType) {
            case "popularity":
                products.sort((a, b) => b.popularity - a.popularity); // 인기순
                break;
            case "newest":
                products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // 신상품순
                break;
            case "low-price":
                products.sort((a, b) => a.price - b.price); // 낮은 가격순
                break;
            case "high-price":
                products.sort((a, b) => b.price - a.price); // 높은 가격순
                break;
            case "reviews":
                products.sort((a, b) => b.reviews - a.reviews); // 리뷰순
                break;
            default:
                console.error("알 수 없는 정렬 기준:", sortType);
        }
    }

    // 버튼 스타일 업데이트
    function updateActiveButton(activeButton) {
        sortingButtons.forEach(button => button.classList.remove("active")); // 기존 active 제거
        activeButton.classList.add("active"); // 클릭된 버튼에 active 추가
    }

    function updatePagination() {
        const paginationButtons = document.querySelectorAll(".page-btn");
        paginationButtons.forEach(button => button.classList.remove("active"));

        const activeButton = document.querySelector(`.page-btn[data-page="${currentPage}"]`);
        if (activeButton) {
            activeButton.classList.add("active");
        }
    }

    function initializePagination() {
        if (!Array.isArray(products) || products.length === 0) {
            console.error("No products available for pagination.");
            showNoProductsMessage();
            return;
        }

        const paginationContainer = document.querySelector(".pagination");
        const totalPages = Math.ceil(products.length / itemsPerPage);

        console.log("Total Pages:", totalPages); // 총 페이지 수 확인
        paginationContainer.innerHTML = ""; // 기존 버튼 제거

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.className = "page-btn";
            button.textContent = i;
            button.dataset.page = i;

            if (i === currentPage) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {
                currentPage = i;
                renderProducts(); // 페이지 변경 시 상품 렌더링
                updatePagination(); // 현재 페이지 스타일 업데이트
            });

            paginationContainer.appendChild(button);
        }
    }

    // 상품 렌더링
    function renderProducts() {
        if (!Array.isArray(products) || products.length === 0) {
            console.error("Products is not an array or empty:", products);
            showNoProductsMessage();
            return;
        }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const visibleProducts = products.slice(start, end);

        productsContainer.innerHTML = "";
        visibleProducts.forEach(product => {
            const productPrice = parseFloat(product.price); // 문자열을 숫자로 변환
            const productHTML = `
                <div class="product-item" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image_url}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <span>[${product.brand}]</span>
                        <p>${product.name}</p>
                        <strong>₩${productPrice.toLocaleString()}</strong>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productHTML;
        });

        addClickEvents();
    }

    function addClickEvents() {
        const productItems = document.querySelectorAll(".product-item");
        productItems.forEach(item => {
            item.addEventListener("click", () => {
                const productId = item.getAttribute("data-id");
                window.location.href = `product-details.html?id=${productId}`;
            });
        });
        console.log("Product click events added."); // 디버깅용 로그
    }

    function showNoProductsMessage() {
        productsContainer.innerHTML = `
            <div class='no-products-container'>
                <p class='no-products'>해당 카테고리에 상품이 없습니다. (품절)</p>
            </div>
        `;
        productsContainer.style.backgroundImage = "url('image/logo_smaller_transparent.png')";
        productsContainer.style.backgroundSize = "contain";
        productsContainer.style.backgroundRepeat = "no-repeat";
        productsContainer.style.backgroundPosition = "center";
        productsContainer.style.display = "flex";
        productsContainer.style.flexDirection = "column";
        productsContainer.style.justifyContent = "center";
        productsContainer.style.alignItems = "center";
        productsContainer.style.height = "300px";
        productsContainer.style.textAlign = "center";
    }

    // 현재 카테고리 가져오기
    function getCategoryFromUrl() {
        const currentPage = window.location.pathname.split("/").pop();
        console.log("Current Page:", currentPage); // 디버깅용
        if (currentPage.includes("shopping-gagu")) return "가구";
        if (currentPage.includes("shopping-bathroom")) return "욕실";
        if (currentPage.includes("shopping-lighting")) return "홈";
        if (currentPage.includes("shopping-interior")) return "인테리어";
        return null; // 기본값 (카테고리를 찾지 못한 경우)
    }

    function highlightCurrentMenu() {
        const currentUrl = window.location.pathname.split("/").pop(); // 현재 URL 파일명 가져오기
        const menuItems = document.querySelectorAll(".menu-list a");

        menuItems.forEach(menuItem => {
            const menuHref = menuItem.getAttribute("href");
            if (menuHref === currentUrl) {
                menuItem.classList.add("active");
            } else {
                menuItem.classList.remove("active"); // 다른 항목에서 active 제거
            }
        });

        console.log("Current URL:", currentUrl); // 디버깅용
    }
});
