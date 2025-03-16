document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.querySelector(".product-list");
    const brandTitle = document.getElementById("brand-title");
    const sortingButtons = document.querySelectorAll(".sort-btn");
    const itemsPerPage = 16;
    let products = [];
    let currentPage = 1;

    // URL에서 브랜드 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const brandFilter = urlParams.get("brand");
    console.log("Selected Brand:", brandFilter);

    // 브랜드 이름 표시
    if (brandTitle) {
        brandTitle.textContent = brandFilter
            ? `${brandFilter.toUpperCase()} 브랜드`
            : "브랜드를 선택하세요.";
        brandTitle.style.marginBottom = "20px"; // 추가된 스타일
    } else {
        console.error("Error: Element with id 'brand-title' not found in the DOM.");
    }

    // 데이터 가져오기
    fetch(`/이가구SB/products.php?brand=${brandFilter}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data);
            products = data;
            if (products.length === 0) {
                showNoProductsMessage();
            } else {
                renderProducts();
                initializePagination();
            }
        })
        .catch(error => console.error("Error loading products:", error));

    // 정렬 버튼 클릭 이벤트
    sortingButtons.forEach(button => {
        button.addEventListener("click", function () {
            const sortType = this.getAttribute("data-sort");
            sortProducts(sortType);
            updateActiveButton(this); // 버튼 스타일 업데이트
            renderProducts(); // 정렬 후 다시 렌더링
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
                console.error("Unknown sort type:", sortType);
        }
    }

    // 버튼 스타일 업데이트
    function updateActiveButton(activeButton) {
        sortingButtons.forEach(button => button.classList.remove("active"));
        activeButton.classList.add("active");
    }

    // 상품이 없을 경우 메시지 표시
    function showNoProductsMessage() {
        productsContainer.innerHTML = `
            <div class='no-products-container'>
                <p class='no-products'>해당 브랜드에 상품이 없습니다. (품절)</p>
            </div>
        `;
        productsContainer.style.backgroundImage = "url('./image/logo_smaller_transparent.png')";
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

    // 상품 렌더링
    function renderProducts() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const visibleProducts = products.slice(start, end);

        productsContainer.innerHTML = "";
        visibleProducts.forEach(product => {
            const productHTML = `
                <div class="product-item" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image_url}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <span>[${product.brand}]</span>
                        <p>${product.name}</p>
                        <strong>₩${Number(product.price).toLocaleString()}</strong>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productHTML;
        });

        // 상품 클릭 시 상세 페이지로 이동
        addProductClickEvents();
    }

    // 상품 클릭 시 상세 페이지로 이동
    function addProductClickEvents() {
        const productItems = document.querySelectorAll(".product-item");

        productItems.forEach(item => {
            item.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                window.location.href = `product-details.html?id=${productId}`;
            });
        });
    }

    // 페이지네이션 초기화
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

    // 페이지네이션 스타일 업데이트
    function updatePagination() {
        const paginationButtons = document.querySelectorAll(".page-btn");
        paginationButtons.forEach(button => button.classList.remove("active"));
        const activeButton = document.querySelector(`.page-btn[data-page="${currentPage}"]`);
        if (activeButton) {
            activeButton.classList.add("active");
        }
    }
});
