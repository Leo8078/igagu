const scrollWrapper = document.querySelector('.scroll-wrapper');
const scrollableElement = document.querySelector('.scrollable-element');

let isDragging = false;
let startX, scrollLeft;

const SCROLL_SPEED = 10; // 스크롤 속도 배율

// 드래그 시작
scrollWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - scrollWrapper.offsetLeft;
    scrollLeft = scrollableElement.scrollLeft;
    scrollWrapper.style.cursor = 'grabbing'; // 드래그 중 커서 변경
});

// 드래그 중
scrollWrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollWrapper.offsetLeft;
    const distance = (x - startX) * SCROLL_SPEED; // 속도 배율 적용
    scrollableElement.scrollLeft = scrollLeft - distance; // 내부 스크롤 이동
});

// 드래그 종료
scrollWrapper.addEventListener('mouseup', () => {
    isDragging = false;
    scrollWrapper.style.cursor = 'grab'; // 기본 커서로 복구
});

scrollWrapper.addEventListener('mouseleave', () => {
    isDragging = false; // 드래그 종료
});



// 버튼 클릭 시 전체 페이지 이동 (부모 페이지 포함)
document.querySelector('.product').addEventListener('click', function() {
    const productId = 348; // 예시로 348번 상품
    const url = `http://localhost/igagu/product-details.html?id=${productId}`;
    
    // 부모 페이지 포함하여 이동 (iframe에서 부모 페이지까지 리다이렉트)
    window.top.location.href = url;
});