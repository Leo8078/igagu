document.addEventListener("DOMContentLoaded", async () => {
    const weekContainer = document.getElementById("week_container");
    try {
        const response = await fetch("week.html");
        if (response.ok) {
            const html = await response.text();
            weekContainer.innerHTML = html;
        } else {
            console.error("HTML 파일을 불러올 수 없습니다:", response.status);
        }
    } catch (error) {
        console.error("에러 발생:", error);
    }
});
