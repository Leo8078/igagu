document.addEventListener("DOMContentLoaded", () => {
    // sessionStorage에서 현재 사용자의 username 값을 가져옴
    const username = sessionStorage.getItem('username');

    // username이 "admin"인지 확인하여 isAdmin 값 설정
    const isAdmin = (username === 'admin');

    const currentPath = window.location.pathname.split("/").pop();

    // 공통: 사이드 메뉴 활성화
    activateMenu(currentPath);

    // 공지사항 페이지 로직
    if (currentPath === "notice.html" || currentPath === "customer-service.html") {
        handleNoticePage(isAdmin, currentPath);
    }
});

function activateMenu(currentPath) {
    const menuItems = document.querySelectorAll(".menu-list li a");
    menuItems.forEach((item) => {
        if (item.getAttribute("href") === currentPath) {
            item.parentElement.classList.add("active");
        }
    });
}

function handleNoticePage(isAdmin, currentPath) {
    const noticeList = document.getElementById('notice-list');
    const writeBtn = document.getElementById('write-btn');

    // 관리자만 작성하기 버튼 보이기
    if (isAdmin) {
        writeBtn.style.display = "block"; // 버튼을 보이도록 설정
        writeBtn.addEventListener("click", () => {
            window.location.href = "notice-create.html"; // 작성 페이지로 이동
        });
    }

    // 공지사항 데이터 가져오기
    fetch('notice-get.php')
        .then(response => response.json())
        .then(data => {
            // notice-list 초기화 (중복 추가 방지)
            noticeList.innerHTML = '';

            // 고객센터 페이지라면 최대 5개만 표시
            const noticesToShow = (currentPath === "customer-service.html") ? data.slice(0, 5) : data;

            noticesToShow.forEach(post => {
                const row = document.createElement('tr');
                row.setAttribute('data-id', post.id);
                row.innerHTML = `
                    <td><a href="notice-detail.html?id=${post.id}">${post.title}</a></td>
                    <td>${post.date}</td>
                    <!-- 관리자만 보이도록 삭제 버튼 추가 -->
                    <td><button class="delete-btn" style="display: ${isAdmin ? 'block' : 'none'}" data-id="${post.id}">삭제</button></td>
                `;
                noticeList.appendChild(row);
            });

            // 삭제 버튼 클릭 시 삭제 처리
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    deleteNotice(id);  // 삭제 함수 호출
                });
            });
        })
        .catch(error => console.error("공지사항 데이터를 불러오는 데 오류가 발생했습니다.", error));
}

// 공지사항 삭제 함수
function deleteNotice(id) {
    fetch('notice-delete.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('공지사항이 삭제되었습니다.');
            window.location.reload(); // 페이지 새로고침
        } else {
            alert('삭제 실패');
        }
    })
    .catch(error => {
        console.error('삭제 중 오류 발생', error);
        alert('삭제 중 오류가 발생했습니다.');
    });
}
