document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        // 상품 데이터 가져오기
        fetch(`product-details.php?id=${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`서버 오류: ${response.status}`);
                }
                return response.json();
            })
            .then(product => {
                if (product.error) {
                    console.error("상품 데이터를 가져오는 중 오류 발생:", product.error);
                    alert("상품 정보를 불러오는 중 문제가 발생했습니다.");
                } else {
                    displayProductDetails(product);
                    renderRelatedProducts(product.related_products || []); // 관련 상품 렌더링
                }
            })
            .catch(error => {
                console.error("상품 데이터를 불러오는 중 오류 발생:", error);
                alert("상품 정보를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
            });
    } else {
        console.error("상품 ID가 URL에 포함되어 있지 않습니다.");
    }

    function displayProductDetails(product) {
        try {
            // 기본값을 설정하여 안전하게 렌더링
            document.getElementById("product-image").src = product.image_url || "images/default.jpg";
            document.getElementById("product-name").textContent = product.name || "상품 이름 없음";
            document.getElementById("product-price").textContent = product.price
                ? `₩${Number(product.price).toLocaleString()}`
                : "가격 정보 없음";
            document.getElementById("product-description").textContent = product.detailed_desc || "상품 설명이 없습니다.";

            populateList("product-benefits", product.benefits || []);
            populateSelect("product-size", product.size_options || []);
            populateSelect("product-color", product.color_options || []);
            populateImage("product-detail-images", product.detail_images || "images/default-detail.jpg");
        } catch (error) {
            console.error("상품 세부 정보를 렌더링하는 중 오류 발생:", error);
            alert("상품 정보를 표시하는 중 문제가 발생했습니다.");
        }
    }

    function populateList(elementId, items) {
        const listElement = document.getElementById(elementId);
        if (!Array.isArray(items) || items.length === 0) {
            listElement.innerHTML = "<li>해당 정보가 없습니다.</li>";
            return;
        }
        listElement.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }

    function populateSelect(elementId, options) {
        const selectElement = document.getElementById(elementId);
        if (!Array.isArray(options) || options.length === 0) {
            selectElement.innerHTML = "<option>옵션 없음</option>";
            return;
        }
        selectElement.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
    }

    function populateImage(elementId, imageUrl) {
        const container = document.getElementById(elementId);
        container.innerHTML = `<img src="${imageUrl}" alt="상세 이미지">`;
    }

    function renderRelatedProducts(relatedProducts) {
        const relatedContainer = document.getElementById("related-products");
        relatedContainer.innerHTML = ''; // 기존 내용을 지움

        if (!Array.isArray(relatedProducts) || relatedProducts.length === 0) {
            relatedContainer.innerHTML = "<p>관련 상품이 없습니다.</p>";
            return;
        }

        relatedProducts.forEach(product => {
            const productHTML = `
                <div class="related-product-item">
                    <a href="product-details.html?id=${product.id}">
                        <img src="${product.image_url || "images/default-related.jpg"}" alt="${product.name || "관련 상품"}">
                        <p>${product.name || "관련 상품"}</p>
                        <strong>₩${product.price ? Number(product.price).toLocaleString() : "가격 정보 없음"}</strong>
                    </a>
                </div>
            `;
            relatedContainer.innerHTML += productHTML;
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const addToCartButton = document.getElementById("add-to-cart");

    addToCartButton.addEventListener("click", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        if (!productId) {
            alert("상품 정보를 가져올 수 없습니다.");
            return;
        }

        // 선택한 옵션 가져오기
        const size = document.getElementById("product-size").value;
        const color = document.getElementById("product-color").value;

        // 서버에 데이터 전송
        fetch('add_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: parseInt(productId),
                quantity: 1, // 기본 수량 1
                size: size,  // 사이즈 옵션
                color: color // 색상 옵션
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("장바구니에 추가되었습니다.");
            } else {
                console.error(data.error);
                alert("장바구니에 추가하는 중 오류가 발생했습니다.");
            }
        })
        .catch(error => {
            console.error("서버 요청 중 오류 발생:", error);
            alert("장바구니에 추가하지 못했습니다. 나중에 다시 시도해주세요.");
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const buyNowButton = document.getElementById("buy-now");

    buyNowButton.addEventListener("click", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        if (!productId) {
            alert("상품 정보를 가져올 수 없습니다.");
            return;
        }

        // 선택한 옵션 가져오기
        const size = document.getElementById("product-size").value;
        const color = document.getElementById("product-color").value;

        // 서버에 데이터 전송
        fetch('add_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: parseInt(productId),
                quantity: 1, // 기본 수량 1
                size: size,  // 사이즈 옵션
                color: color // 색상 옵션
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "payment2.html";
            } else {
                console.error(data.error);
                alert("오류가 발생했습니다.");
            }
        })
        .catch(error => {
            console.error("서버 요청 중 오류 발생:", error);
            alert("장바구니에 추가하지 못했습니다. 나중에 다시 시도해주세요.");
        });
    });
});