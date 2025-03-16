document.addEventListener("DOMContentLoaded", async () => {
    const saleContainer = document.getElementById("sale_container");
    try {
        const response = await fetch("sale_slide.html");
        if (response.ok) {
            const html = await response.text();
            saleContainer.innerHTML = html;
        } else {
            console.error("HTML 파일을 불러올 수 없습니다:", response.status);
        }
    } catch (error) {
        console.error("에러 발생:", error);
    }
});
