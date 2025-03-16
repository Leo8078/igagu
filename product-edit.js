document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");  // URL에서 상품 ID 가져오기

    if (productId) {
        // 상품 데이터 불러오기
        fetch(`get-products.php?id=${productId}`)
            .then(response => response.json())
            .then(product => {
                if (product.error) {
                    console.error("상품을 불러오는 중 오류 발생:", product.error);
                } else {
                    populateForm(product);  // 폼에 기존 값 채워넣기
                }
            })
            .catch(error => {
                console.error("상품 데이터를 불러오는 중 오류 발생:", error);
            });
    } else {
        console.error("상품 ID가 URL에 포함되어 있지 않습니다.");
    }

    function populateForm(product) {
        // 기본 정보
        document.getElementById("name").value = product.name || '';
        document.getElementById("price").value = product.price || '';
        document.getElementById("brand").value = product.brand || '';
        document.querySelector(`input[name="category"][value="${product.category}"]`).checked = true;
        document.getElementById("description").value = product.description || '';
        
        // 상세 정보
        document.getElementById("detailed_desc").value = product.detailed_desc || '';

        // 사이즈 옵션 체크박스 처리
        let sizeOptions = [];
        try {
            sizeOptions = JSON.parse(product.size_options) || [];  // JSON 문자열이거나 빈 배열 처리
        } catch (e) {
            console.error("사이즈 옵션 파싱 오류:", e);
        }
        sizeOptions.forEach(option => {
            const sizeCheckbox = document.querySelector(`input[name="size_options"][value="${option}"]`);
            if (sizeCheckbox) {
                sizeCheckbox.checked = true;
            }
        });

        // 색상 옵션 체크박스 처리
        let colorOptions = [];
        try {
            colorOptions = JSON.parse(product.color_options) || [];  // JSON 문자열이거나 빈 배열 처리
        } catch (e) {
            console.error("색상 옵션 파싱 오류:", e);
        }
        colorOptions.forEach(option => {
            const colorCheckbox = document.querySelector(`input[name="color_options"][value="${option}"]`);
            if (colorCheckbox) {
                colorCheckbox.checked = true;
            }
        });

        // 혜택 옵션 체크박스 처리
        let benefits = [];
        try {
            benefits = JSON.parse(product.benefits) || [];  // JSON 문자열이거나 빈 배열 처리
        } catch (e) {
            console.error("혜택 옵션 파싱 오류:", e);
        }
        benefits.forEach(option => {
            const benefitCheckbox = document.querySelector(`input[name="benefits"][value="${option}"]`);
            if (benefitCheckbox) {
                benefitCheckbox.checked = true;
            }
        });
    }

    document.getElementById("editProductForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("id", productId);  // 상품 ID를 함께 전송
        formData.append("name", document.getElementById("name").value);
        formData.append("price", document.getElementById("price").value);
        formData.append("brand", document.getElementById("brand").value);
        formData.append("category", document.querySelector('input[name="category"]:checked').value);
        formData.append("description", document.getElementById("description").value);
        formData.append("detailed_desc", document.getElementById("detailed_desc").value);

        // 사이즈 옵션 (체크박스)
        const sizeOptions = [];
        document.querySelectorAll('input[name="size_options"]:checked').forEach(checkbox => sizeOptions.push(checkbox.value));
        formData.append("size_options", JSON.stringify(sizeOptions));

        // 색상 옵션 (체크박스)
        const colorOptions = [];
        document.querySelectorAll('input[name="color_options"]:checked').forEach(checkbox => colorOptions.push(checkbox.value));
        formData.append("color_options", JSON.stringify(colorOptions));

        // 혜택 옵션 (체크박스)
        const benefits = [];
        document.querySelectorAll('input[name="benefits"]:checked').forEach(checkbox => benefits.push(checkbox.value));
        formData.append("benefits", JSON.stringify(benefits));

        fetch("product-edit.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("상품이 수정되었습니다.");
                window.location.href = "admin-page.html"; // 수정 완료 후 관리자 페이지로 리디렉션
            } else {
                alert("상품 수정에 실패했습니다.");
            }
        })
        .catch(error => {
            console.error("상품 수정 중 오류 발생:", error);
            alert("상품 수정 중 오류가 발생했습니다.");
        });
    });
});
