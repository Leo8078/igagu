document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector('.slides');
    const slideElements = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0; // 현재 슬라이드 인덱스
    const slideCount = slideElements.length; // 슬라이드 개수

    // 각 슬라이드의 너비를 가져옴
    const slideWidth = slideElements[0].clientWidth;

    // 슬라이드 컨테이너 크기 설정 (슬라이드 개수 * 슬라이드 너비)
    slides.style.width = `${slideWidth * slideCount}px`;

    // 자동 슬라이드
    let slideInterval = setInterval(() => {
        moveToNextSlide();
    }, 3000);

    // 다음 슬라이드로 이동
    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount; // 마지막 슬라이드에서 처음으로 돌아감
        updateSlidePosition();
    }

    // 이전 슬라이드로 이동
    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount; // 첫 슬라이드에서 마지막으로 돌아감
        updateSlidePosition();
    }

    // 슬라이드 위치 업데이트
    function updateSlidePosition() {
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // 버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval); // 자동 슬라이드 멈춤
        moveToNextSlide();
        slideInterval = setInterval(() => moveToNextSlide(), 5000); // 자동 슬라이드 재시작
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval); // 자동 슬라이드 멈춤
        moveToPrevSlide();
        slideInterval = setInterval(() => moveToNextSlide(), 5000); // 자동 슬라이드 재시작
    });

    // 윈도우 크기 조정 시 슬라이드 너비 재계산
    window.addEventListener('resize', () => {
        const newSlideWidth = slideElements[0].clientWidth;
        slides.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
    });
});


/////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("check_session.php", {
            method: "GET",
        });
        const result = await response.json();

        const userIcon = document.getElementById("user-icon");

        if (response.ok && result.loggedIn) {
            userIcon.href = "mypage.html"; // 로그인된 경우 마이페이지로 이동
        } else {
            userIcon.href = "login.html"; // 비로그인 시 로그인 페이지로 이동
        }
    } catch (error) {
        console.error("세션 확인 중 오류가 발생했습니다.", error);
    }
});



document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("check_session.php", {
            method: "GET",
        });
        const result = await response.json();

        const userIcon = document.getElementById("customer");

        if (response.ok && result.loggedIn) {
            userIcon.href = "customer-service.html"; // 로그인된 경우 고객센터로 이동
        } else {
            userIcon.href = "login.html"; // 비로그인 시 로그인 페이지로 이동
        }
    } catch (error) {
        console.error("세션 확인 중 오류가 발생했습니다.", error);
    }
});


///////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const searchDropdown = document.getElementById("search-dropdown");
    const recentSearchesList = document.getElementById("recent-searches");
    const popularSearchesList = document.getElementById("popular-searches");

    const maxRecent = 5;

    // 로컬 스토리지에서 최근 검색어 가져오기
    const loadRecentSearches = () => {
        const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
        recentSearchesList.innerHTML = "";

        if (recent.length === 0) {
            recentSearchesList.innerHTML = "<li>최근 검색어가 없습니다.</li>";
        } else {
            recent.forEach((term) => {
                const li = document.createElement("li");
                li.textContent = term;
                li.addEventListener("click", () => {
                    searchInput.value = term;
                    searchForm.submit(); // 선택된 검색어로 바로 검색
                });
                recentSearchesList.appendChild(li);
            });
        }
    };

    // 검색어 저장 및 제출
    searchForm.addEventListener("submit", (e) => {
        const query = searchInput.value.trim();
        if (query) {
            // 로컬 스토리지에 저장
            let recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
            if (!recent.includes(query)) {
                recent.unshift(query);
                if (recent.length > maxRecent) recent.pop();
                localStorage.setItem("recentSearches", JSON.stringify(recent));
            }
        }
        // 폼을 그대로 제출하여 검색 결과 페이지로 이동
    });

    // 인기 검색어 가져오기
    const loadPopularSearches = async () => {
        try {
            const response = await fetch("popular_searches.php");
            const data = await response.json();
            popularSearchesList.innerHTML = "";

            if (data.length === 0) {
                popularSearchesList.innerHTML = "<li>인기 검색어가 없습니다.</li>";
            } else {
                data.forEach((term) => {
                    const li = document.createElement("li");
                    li.textContent = term;
                    li.addEventListener("click", () => {
                        searchInput.value = term;
                        searchForm.submit(); // 선택된 검색어로 바로 검색
                    });
                    popularSearchesList.appendChild(li);
                });
            }
        } catch (error) {
            console.error("인기 검색어를 불러오는 중 오류:", error);
        }
    };

    // 검색창 클릭 시 드롭다운 표시
    searchInput.addEventListener("focus", () => {
        searchDropdown.style.display = "block";
        loadRecentSearches();
        loadPopularSearches();
    });

    // 외부 클릭 시 드롭다운 숨기기
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) {
            searchDropdown.style.display = "none";
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const menu = document.querySelector('.dropdown-menu');
    let timer;
  
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(timer); // 기존 타이머 제거
      menu.style.display = 'block';
    });
  
    dropdown.addEventListener('mouseleave', () => {
      timer = setTimeout(() => {
        menu.style.display = 'none';
      }, 200); // 200ms 딜레이
    });
  });
  


  document.addEventListener('DOMContentLoaded', function() {
    // 로그인 상태 및 사용자 정보 확인
    fetch('check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                // 로그인 상태일 때 처리
                const userInfo = data.userInfo;
                console.log(userInfo); // 사용자 정보 출력 (콘솔)

                // 로그인한 상태에서 out-icon을 표시
                document.getElementById('out-icon').style.display = 'inline-block';

                // 로그아웃 버튼에 이벤트 추가
                document.getElementById('out-icon').addEventListener('click', function() {
                    alert('로그아웃되었습니다.')
                    window.location.href = 'logout.php'; // 로그아웃 후 리다이렉트
                });
            } else {
                // 로그인하지 않은 상태일 때 처리
                console.log("로그인되지 않았습니다.");
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
});


document.addEventListener('DOMContentLoaded', function() {
    // 로그인 상태 및 사용자 정보 확인
    fetch('check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                // 로그인 상태일 때 처리
                const userInfo = data.userInfo;
                console.log(userInfo); // 사용자 정보 출력 (콘솔)

                // 관리자 전용 메뉴 표시 설정
                const adminMenu = document.querySelector("a[href='admin-page.html']"); // 관리자 메뉴 링크
                if (userInfo.username === "admin") {
                    adminMenu.style.display = "block"; // 관리자라면 메뉴 보이기
                } else {
                    adminMenu.style.display = "none"; // 관리자가 아니라면 메뉴 숨기기
                }
            } else {
                // 로그인하지 않은 상태일 때 처리
                console.log("로그인되지 않았습니다.");
                // 로그인하지 않은 경우 관리자 메뉴 숨기기
                const adminMenu = document.querySelector("a[href='admin-page.html']"); // 관리자 메뉴 링크
                adminMenu.style.display = "none"; // 로그인하지 않으면 관리자 메뉴 숨김
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
});



