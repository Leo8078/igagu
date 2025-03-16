document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 기본 제출 방지

    const sizeOptions = [];
    document.querySelectorAll('input[name="size_options"]:checked').forEach((checkbox) => {
        sizeOptions.push(checkbox.value);
    });

    const colorOptions = [];
    document.querySelectorAll('input[name="color_options"]:checked').forEach((checkbox) => {
        colorOptions.push(checkbox.value);
    });

    const benefits = [];
    document.querySelectorAll('input[name="benefits"]:checked').forEach((checkbox) => {
        benefits.push(checkbox.value);
    });

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('brand', document.getElementById('brand').value);
    formData.append('category', document.querySelector('input[name="category"]:checked')?.value);
    formData.append('description', document.getElementById('description').value);
    formData.append('popularity', document.getElementById('popularity').value);
    formData.append('reviews', document.getElementById('reviews').value);
    formData.append('detailed_desc', document.getElementById('detailed_desc').value);
    formData.append('size_options', JSON.stringify(sizeOptions)); // JSON 배열로 변환하여 전송
    formData.append('color_options', JSON.stringify(colorOptions)); // JSON 배열로 변환하여 전송
    formData.append('benefits', JSON.stringify(benefits)); // JSON 배열로 변환하여 전송

    // 상품 이미지 파일 처리 (상품 이미지)
    const imageFile = document.getElementById('image_upload').files[0];
    if (imageFile) {
        formData.append('image_upload', imageFile); // 상품 이미지 파일을 FormData에 추가
    }

    // 상세 이미지 파일 처리
    const detailImageFile = document.getElementById('detail_image').files[0];
    if (detailImageFile) {
        formData.append('detail_image', detailImageFile); // 상세 이미지 파일을 FormData에 추가
    }

    fetch('product-add.php', {
        method: 'POST',
        body: formData  // FormData 객체로 데이터 전송
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('상품이 추가되었습니다.');
            location.href = 'admin-page.html'; // 상품 목록 페이지로 리디렉션
        } else {
            alert('상품 추가에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('상품 추가에 오류가 발생했습니다.');
    });
});
