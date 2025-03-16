document.addEventListener("DOMContentLoaded", function () {
    const searchQueryElement = document.getElementById("search-query");
    const productsContainer = document.querySelector(".product-list");
    const sortingButtons = document.querySelectorAll(".sort-btn");
    const itemsPerPage = 16;
    let products = [];
    let currentPage = 1;

    highlightCurrentMenu();

    // 검색어 가져오기 (URL 쿼리 파라미터에서 query 값을 가져옴)
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

     // 검색어를 화면에 표시
     searchQueryElement.textContent = query;

    // 검색어가 있을 경우, 검색 API 호출
    if (query) {
        fetch(`/igagu/search_results.php?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                products = data;
                renderProducts();
                initializePagination();
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                showNoProductsMessage();
            });
    } else {
        showNoProductsMessage(); // 검색어가 없으면 결과가 없다는 메시지 표시
    }

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
        sortingButtons.forEach(button => button.classList.remove("active"));
        activeButton.classList.add("active");
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
        const paginationContainer = document.querySelector(".pagination");
        const totalPages = Math.ceil(products.length / itemsPerPage);

        paginationContainer.innerHTML = "";

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
                renderProducts();
                updatePagination();
            });

            paginationContainer.appendChild(button);
        }
    }

    // 상품 렌더링
    function renderProducts() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const visibleProducts = products.slice(start, end);

        productsContainer.innerHTML = "";
        visibleProducts.forEach(product => {
            const productPrice = parseFloat(product.price);
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
    }

    function showNoProductsMessage() {
        productsContainer.innerHTML = `
            <div class='no-products-container'>
                <p class='no-products'>검색 결과가 없습니다.</p>
            </div>
        `;
    }

    function highlightCurrentMenu() {
        const currentUrl = window.location.pathname.split("/").pop();
        const menuItems = document.querySelectorAll(".menu-list a");

        menuItems.forEach(menuItem => {
            const menuHref = menuItem.getAttribute("href");
            if (menuHref === currentUrl) {
                menuItem.classList.add("active");
            } else {
                menuItem.classList.remove("active");
            }
        });
    }
});
