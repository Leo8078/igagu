document.addEventListener("DOMContentLoaded", function () {
    const brandItems = document.querySelectorAll(".brand-item");

    brandItems.forEach(brandItem => {
        brandItem.addEventListener("click", function () {
            const brandName = this.dataset.brand;
            console.log(`${brandName} 브랜드 클릭됨`);

            // 브랜드 전용 페이지로 이동
            window.location.href = `shopping-brand.html?brand=${brandName}`;
        });
    });
});
