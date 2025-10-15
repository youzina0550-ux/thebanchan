//오늘그만보기 버튼 누르면 사라짐
document.getElementById("closeBtn").addEventListener("click", function (e) {
    e.preventDefault(); // a태그 링크 이동 막기
    document.querySelector(".event_banner").style.display = "none";
});

//category button에 마우스 허버시 category_list 고정
const category = document.querySelector('.category');
const list = document.querySelector('.category_list');

category.addEventListener('mouseenter', () => {
    list.style.display = 'block';
});
category.addEventListener('mouseleave', () => {
    list.style.display = 'none';
});
// 리스트에 마우스 올릴 때도 사라지지 않도록
list.addEventListener('mouseenter', () => {
    list.style.display = 'block';
});
list.addEventListener('mouseleave', () => {
    list.style.display = 'none';
});

//category_hover_list의 li에 마우스 허버시 아이콘 바뀜
document.querySelectorAll('.category_hover_list li').forEach(li => {
    const img = li.querySelector('img');
    const defaultSrc = img.getAttribute('data-default');
    const hoverSrc = img.getAttribute('data-hover');

    li.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
    });

    li.addEventListener('mouseleave', () => {
        img.src = defaultSrc;
    });
});

//search 영역 클릭시 AI 키워드, 최근 검색어 나오기
const searchInput = document.querySelector('.search input');
const dropdown = document.querySelector('.search-dropdown');

searchInput.addEventListener('focus', () => {
    dropdown.style.display = 'block';
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) {
        dropdown.style.display = 'none';
    }
});

//search 영역에 ai 키워드 아이콘 마우스 허버시 말풍선 나오기
const toolIcon = document.querySelector(".tool_tip_ico");
const toolTip = document.querySelector(".tool_tip");

toolIcon.addEventListener("mouseenter", () => {
    toolTip.style.display = "block";
});

toolIcon.addEventListener("mouseleave", () => {
    toolTip.style.display = "none";
});

//최근 본 상품 아이콘에 마우스 허버시 말풍선 나오기
const lastIcon = document.querySelector(".bottom_right a:nth-child(2)");
const hoverBox = document.querySelector(".hover-box");

lastIcon.addEventListener("mouseenter", () => {
    hoverBox.style.display = "block";
});

lastIcon.addEventListener("mouseleave", () => {
    hoverBox.style.display = "none";
});

//메인어사이드 영역 고정
const mainAside = document.getElementsByClassName('main_aside')[0];
let mainAsideOffset = mainAside.offsetTop;

window.addEventListener('scroll', () => {
    console.log(window.scrollY); // 현재 스크롤 위치 확인
    if (window.scrollY >= 252) {   // 스크롤 위치가 100px 이상이면
        mainAside.classList.add('fixed');   // fixed 클래스 추가
    } else {
        mainAside.classList.remove('fixed'); // fixed 클래스 제거
    }
});


//메인콘텐츠 스와이퍼 + 재생/정지 버튼
var swiper = new Swiper(".mySwiper", {
    effect: "fade",
    speed: 600,
    loop: true, // loop 가능
    autoplay: false, // 초기 autoplay 끔
    pagination: { el: ".swiper-pagination", type: "fraction", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
});

let autoPlayInterval = null;
// 슬라이드 자동 재생 시작 함수
function startAutoplay() {
    if (autoPlayInterval) return;
    autoPlayInterval = setInterval(() => {
        swiper.slideNext();
    }, 4000); // 4초마다 슬라이드 전환
}
// 슬라이드 자동 재생 정지 함수
function stopAutoplay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
}
// 버튼 토글(버튼 아이콘 누르면 바뀌기)
const btnToggle = document.querySelector(".swiper-button-toggle");
const toggleImg = btnToggle.querySelector("img");

btnToggle.addEventListener("click", () => {
    if (autoPlayInterval) {
        stopAutoplay();
        toggleImg.src = "img/ico/ico_play.png";
    } else {
        startAutoplay();
        toggleImg.src = "img/ico/ico_pause.png";
    }
});
// 페이지 로드시 자동 재생 시작
startAutoplay();

/* // 슬라이드 전환 시 애니메이션
swiper.on("slideChangeTransitionStart", function () {
    var nextSlide = swiper.slides[swiper.activeIndex];
    // /animateText(nextSlide);
}); */

//메인어사이드 스와이퍼
var asideSwiper = new Swiper(".aside", {
    speed: 600, // 전환 속도 (ms 단위, 기본값은 300)
    loop: true, // 마지막 → 첫번째로 자연스럽게 순환
    autoplay: {
        delay: 4000, // 자동 전환 시간 (4초)
        disableOnInteraction: false, // 유저가 클릭해도 autoplay 유지
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//릴레이 스와이퍼
var relSwiper = new Swiper(".relSwiper", {
    speed: 600, // 전환 속도 (ms 단위, 기본값은 300)
    loop: true, // 마지막 → 첫번째로 자연스럽게 순환
    autoplay: {
        delay: 5000, // 자동 전환 시간 (5초)
        disableOnInteraction: false, // 유저가 클릭해도 autoplay 유지
    },
});

//릴레이 한정판매 종료 시간
const endTime = new Date("2025-10-31T00:00:00"); // 원하는 종료 시각으로 수정

function updateTimers() {
    const now = new Date();
    let diff = Math.floor((endTime - now) / 1000); // 초 단위 남은 시간

    document.querySelectorAll("#count_next").forEach(el => {
        if (diff <= 0) {
            el.textContent = "종료되었습니다";
        } else {
            const days = Math.floor(diff / (60 * 60 * 24));
            const hours = Math.floor((diff % (60 * 60 * 24)) / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            el.textContent =
                String(days).padStart(2, "0") + "일 " +
                String(hours).padStart(2, "0") + ":" +
                String(minutes).padStart(2, "0") + ":" +
                String(seconds).padStart(2, "0") + " 남음";
        }
    });
}
//릴레이 1초마다 갱신
setInterval(updateTimers, 1000);
updateTimers(); // 첫 실행

//theme 스와이퍼
var themeSwiper = new Swiper(".themeSwiper", {
    slidesPerView: 2,
    spaceBetween: 15,
    speed: 300, // 전환 속도 (ms 단위, 기본값은 300)
    loop: true, // 마지막 → 첫번째로 자연스럽게 순환
    autoplay: {
        delay: 4000, // 자동 전환 시간 (4초)
        disableOnInteraction: false, // 유저가 클릭해도 autoplay 유지
    },
});

//monthly-goods 스와이퍼
var monthlySwiper = new Swiper(".monthlySwiper", {
    slidesPerView: 4,
    spaceBetween: 15,
    speed: 200, // 전환 속도 (ms 단위, 기본값은 300)
    loop: true, // 마지막 → 첫번째로 자연스럽게 순환
    autoplay: {
        delay: 3000, // 자동 전환 시간 (4초)
        disableOnInteraction: false, // 유저가 클릭해도 autoplay 유지
    },
});

//review 스와이퍼
var reviewSwiper = new Swiper(".reviewSwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    speed: 600, // 전환 속도 (ms 단위, 기본값은 300)
    loop: true, // 마지막 → 첫번째로 자연스럽게 순환
    autoplay: {
        delay: 4000, // 자동 전환 시간 (4초)
        disableOnInteraction: false, // 유저가 클릭해도 autoplay 유지
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction", // 1/5 이런 형태
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//md_recom 영역
const btnMd = document.querySelectorAll('.md_recom .md_recom_tab button');
const contents = document.querySelectorAll('.md_recom > div[class^="md_recomArea"]');

btnMd.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // 버튼 초기화
        btnMd.forEach(b => b.classList.remove('active'));
        // 콘텐츠 초기화
        contents.forEach(c => c.classList.remove('active'));

        // 클릭된 버튼 & 콘텐츠에 active 추가
        btn.classList.add('active');
        contents[index].classList.add('active');
    });
});