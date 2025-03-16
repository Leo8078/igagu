document.addEventListener("DOMContentLoaded", () => {
    // 햄버거 아이콘을 표시할 페이지 경로 설정
    const pagesWithHamburger = ["mypage.html", "coupon-history.html", "customer-service.html", "userinfo-history.html", "notice.html", "membership.html", "faq.html", "notice-detail.html", "order-view.html"];

    // 현재 URL 경로 확인
    const currentPath = window.location.pathname;

    // 헤더와 사이드 메뉴 HTML 정의
    const headerHTML = `
        <header>
            <nav>
                <button class="hamburger-btn" id="hamburger-btn">
                    <span>&#9776;</span> <!-- 햄버거 아이콘 -->
                </button>
                <div class="logo">!gagU</div>
            <ul class="nav-links">
                <li><a href="main.html">홈</a></li>
                <li class="dropdown">
                    <a href="#">카테고리</a>
                    <!-- 드롭다운 전체 메뉴 -->
                    <div class="dropdown-menu">
                      <div class="dropdown-content">
                        <div class="menu-section">
                          <h4><a href="shopping-gagu.html">가구</a></h4>
                          <ul>
                            <li><a href="shopping-gagu.html">가구 All</a></li>
                            <li><a href="shopping-lighting.html">조명&홈데코</a></li>
                            <li><a href="shopping-bathroom.html">욕실</a></li>
                          </ul>
                        </div>
                        <!-- 두 번째 컬럼 -->
                        <div class="menu-section">
                          <h4><a href="shopping-gagu.html">가구 All</a></h4>
                          <ul>
                            <li><a href="shopping-gagu.html">소파</a></li>
                            <li><a href="shopping-gagu.html">침대</a></li>
                            <li><a href="shopping-gagu.html">책상</a></li>
                          </ul>
                        </div>
                        <!-- 세 번째 컬럼 -->
                        <div class="menu-section">
                          <h4><a href="shopping-lighting.html">조명&홈데코</a></h4>
                          <ul>
                            <li><a href="shopping-lighting.html">조명</a></li>
                            <li><a href="shopping-lighting.html">홈데코</a></li>
                          </ul>
                        </div>
                        <!-- 네 번째 컬럼 -->
                        <div class="menu-section">
                          <h4><a href="shopping-bathroom.html">욕실</a></h4>
                          <ul>
                            <li><a href="shopping-bathroom.html">욕조</a></li>
                            <li><a href="shopping-bathroom.html">변기</a></li>
                            <li><a href="shopping-bathroom.html">배스밤</a></li>
                          </ul>
                        </div>
                        <!-- 다섯 번째 컬럼 -->
                        <div class="menu-section">
                          <h4><a href="shopping-interior.html">인테리어</a></h4>
                          <ul>
                            <li><a href="shopping-interior.html">인테리어A</a></li>
                            <li><a href="shopping-interior.html">인테리어B</a></li>
                            <li><a href="shopping-interior.html">인테리어C</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                </li>
                <li><a href="brand-shop.html">브랜드</a></li>
                <li><a href="customer-service.html" id="customer" class="customer">고객센터</a></li>
                <li><a href="admin-page.html" id="admin-link" class="customer">관리자</a></li>
            </ul>
            <div class="search-container">
                <form id="search-form" action="search_results.html" method="GET">
                    <input type="text" id="search-input" name="query" autocomplete="off" required>
                    <button type="submit"><i class="fas fa-search"></i></button>
                </form>
                <div class="search-dropdown" id="search-dropdown">
                    <div class="search-columns">
                        <div class="recent-searches">
                            <h4>최근 검색어</h4>
                            <ul id="recent-searches"></ul>
                        </div>
                        <div class="popular-searches">
                            <h4>인기 검색어</h4>
                            <ul id="popular-searches"></ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="icons">
                <a href="mypage.html" id="user-icon" class="user-icon">
                    <i class="fas fa-user"></i>
                </a>
                <a href="cart.html" id="user-bag" class="user-bag">
                    <i class="fas fa-shopping-bag"></i>
                </a>
                <a href="#" id="out-icon" class="out-icon">
                    <i class="fas fa-door-open"></i>
                </a>
            </div>
            </nav>
        </header>

        <!-- 사이드 메뉴 -->
        <div id="side-menu" class="side-menu">
            <button id="close-btn" class="close-btn">×</button>
            <ul>
                <li class="menu-item">
                    <a href="#" class="menu-title">· 나의 쇼핑 내역</a>
                    <ul class="submenu">
                        <li><a href="order-view.html">주문 조회</a></li>
                    </ul>
                </li>
                <li class="menu-item">
                    <a href="#" class="menu-title">· 나의 혜택 관리</a>
                    <ul class="submenu">
                        <li><a href="point-history.html">포인트 조회</a></li>
                        <li><a href="coupon-history.html">쿠폰 조회</a></li>
                    </ul>
                </li>
                <li class="menu-item">
                    <a href="#" class="menu-title">· 나의 커뮤니티</a>
                    <ul class="submenu">
                        <li><a href="customer-service.html">고객센터</a></li>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="#">나의 문의 내역</a></li>
                    </ul>
                </li>
                <li class="menu-item">
                    <a href="#" class="menu-title">· 회원 정보 관리</a>
                    <ul class="submenu">
                        <li><a href="userinfo-history.html">회원 정보 수정</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    `;

    // 헤더를 동적으로 삽입
    const headerContainer = document.getElementById("header-container");
    headerContainer.innerHTML = headerHTML;

    // 현재 페이지가 설정된 경로에 포함되어 있는지 확인
    if (pagesWithHamburger.some(page => currentPath.includes(page))) {
        document.body.classList.add("show-hamburger");
    } else {
        document.body.classList.remove("show-hamburger");
    }

    // 동적으로 추가된 요소에 이벤트 리스너 설정
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const sideMenu = document.getElementById('side-menu');

    // 햄버거 버튼 클릭 시 사이드 메뉴 열기
    hamburgerBtn.addEventListener('click', () => {
        sideMenu.classList.add('open'); // 사이드 메뉴 열기
    });

    // 닫기 버튼 클릭 시 사이드 메뉴 닫기
    closeBtn.addEventListener('click', () => {
        sideMenu.classList.remove('open'); // 사이드 메뉴 닫기
    });

    // 메뉴 타이틀 클릭 시 서브메뉴 토글
    document.querySelectorAll('.menu-title').forEach(item => {
        item.addEventListener('click', (event) => {
            const parentMenu = item.parentElement;

            // 현재 메뉴 활성화 상태 토글
            if (parentMenu.classList.contains('active')) {
                parentMenu.classList.remove('active');
            } else {
                parentMenu.classList.add('active');
            }

            // 기본 링크 이동 막기
            event.preventDefault();
        });
    });
});

/////////////////////검색//////////////////////
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
        window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
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