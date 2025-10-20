// --- Sayfa yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', function() {

    // --- HEADER KODLARI (DEĞİŞMEDİ) ---
    const loginButton = document.getElementById('login-button');
    const loginDropdown = document.getElementById('login-dropdown');

    loginButton.addEventListener('click', function(event) {
        loginDropdown.classList.toggle('show');
        event.stopPropagation();
    });

    window.addEventListener('click', function(event) {
        if (!loginButton.contains(event.target)) {
            if (loginDropdown.classList.contains('show')) {
                loginDropdown.classList.remove('show');
            }
        }
    });
    // --- HEADER KODLARI BİTİŞ ---


    // --- YENİ SLIDER KODLARI (DÜZELTİLMİŞ VE EKLENMİŞ) ---
const heroSlider = document.querySelector('.hero-slider'); // Yeni slider kapsayıcı sınıfı
const sliderTrack = heroSlider.querySelector('.slider-track');
const slides = Array.from(sliderTrack.children);
const sliderPrevBtn = heroSlider.querySelector('.slider-prev');
const sliderNextBtn = heroSlider.querySelector('.slider-next');
const sliderPagination = heroSlider.querySelector('.slider-pagination');

const slideCount = slides.length;
let currentSlideIndex = 0;
let slideInterval; // Otomatik geçiş için interval değişkeni

// Pagination noktalarını oluştur
function createPaginationDots() {
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-pagination-dot');
        dot.dataset.slideIndex = i; // Hangi slide'a ait olduğunu belirt
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoSlide();
        });
        sliderPagination.appendChild(dot);
    }
}

// Belirli bir slayta gitme fonksiyonu
function goToSlide(index) {
    currentSlideIndex = index;
    updateSliderPosition();
    updatePaginationDots();
    updateSliderButtons();
}

// Slider'ı doğru pozisyona kaydırır
function updateSliderPosition() {
    const offset = -currentSlideIndex * 100; // Her slide %100 genişliğinde olduğu için
    sliderTrack.style.transform = `translateX(${offset}%)`;
}

// Pagination noktalarının aktif durumunu günceller
function updatePaginationDots() {
    const dots = sliderPagination.querySelectorAll('.slider-pagination-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Slider butonlarının aktif/pasif durumunu günceller
function updateSliderButtons() {
    sliderPrevBtn.disabled = currentSlideIndex === 0;
    sliderNextBtn.disabled = currentSlideIndex === slideCount - 1;
}

// Otomatik kaydırma fonksiyonu
function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slideCount;
    updateSliderPosition();
    updatePaginationDots();
    updateSliderButtons(); // Otomatik geçişte de butonları güncelle
    
    // Eğer son slayda gelindiyse, JavaScript'te hızlıca başa dönme efekti
    // CSS transition'ı kapatıp anında başa dön, sonra transition'ı aç
    if (currentSlideIndex === 0) {
        sliderTrack.style.transition = 'none'; // Animasyonu kapat
        sliderTrack.style.transform = 'translateX(0)'; // Anında başa dön
        // Bir sonraki frame'de animasyonu tekrar aç
        requestAnimationFrame(() => {
            sliderTrack.style.transition = 'transform 0.8s ease-in-out';
        });
    }
}

// Otomatik kaydırmayı başlat ve sıfırla
function startAutoSlide() {
    clearInterval(slideInterval); // Önceki interval'i temizle
    slideInterval = setInterval(autoSlide, 5000); // 5 saniyede bir kaydır
}

function resetAutoSlide() {
    startAutoSlide(); // Tekrar başlat
}

// Buton tıklamaları
sliderNextBtn.addEventListener('click', () => {
    if (currentSlideIndex < slideCount - 1) {
        goToSlide(currentSlideIndex + 1);
        resetAutoSlide();
    }
});

sliderPrevBtn.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
        goToSlide(currentSlideIndex - 1);
        resetAutoSlide();
    }
});

// Başlangıçta çalışacak fonksiyonlar
createPaginationDots();
goToSlide(0); // İlk slide'ı göster
startAutoSlide(); // Otomatik kaydırmayı başlat

// --- SLIDER KODLARI BİTİŞ ---


/* === EĞİTİM KARUSELLERİ KODLARI BAŞLANGIÇ (DÜZELTİLMİŞ VERSİYON) === */

// Sayfadaki tüm karusel elementlerini seçiyoruz
const carousels = document.querySelectorAll('.course-carousel');

// Her bir karusel için başlatma fonksiyonunu çalıştırıyoruz
carousels.forEach(initCarousel);

// Karusel işlevselliğini başlatan ana fonksiyon
function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const cards = Array.from(track.children);
    const nextButton = carousel.querySelector('.next');
    const prevButton = carousel.querySelector('.prev');
    const viewport = carousel.querySelector('.carousel-viewport');
    
    // Kart yoksa fonksiyonu durdur
    if (cards.length === 0) return;

    // Her seferinde kaç kartın görüneceğini belirliyoruz
    const cardsPerPage = 4;
    // Toplam sayfa sayısını hesaplıyoruz (ör: 8 kart / 4'lü grup = 2 sayfa)
    const pageCount = Math.ceil(cards.length / cardsPerPage);
    let currentPage = 0;

    // Butonların başlangıç durumunu ayarla
    updateButtons();

    // Sonraki butona tıklandığında
    nextButton.addEventListener('click', () => {
        // Eğer son sayfada değilsek, bir sonraki sayfaya geç
        if (currentPage < pageCount - 1) {
            currentPage++;
            updateTrackPosition();
        }
    });

    // Önceki butona tıklandığında
    prevButton.addEventListener('click', () => {
        // Eğer ilk sayfada değilsek, bir önceki sayfaya geç
        if (currentPage > 0) {
            currentPage--;
            updateTrackPosition();
        }
    });
    
    // Kaydırma işlemini yapan fonksiyon
    function updateTrackPosition() {
        // Görünür alanın (viewport) genişliğini alıyoruz
        const viewportWidth = viewport.getBoundingClientRect().width;
        // Gidilecek pozisyonu hesaplıyoruz: sayfa_numarası * sayfa_genişliği
        const offset = -currentPage * viewportWidth;
        
        // Boşluk (gap) değerini de hesaba katarak ince ayar yapıyoruz
        const gap = parseInt(window.getComputedStyle(track).gap);
        const totalOffset = offset - (currentPage * gap);

        track.style.transform = `translateX(${totalOffset}px)`;
        updateButtons();
    }
    
    // Butonları (ileri/geri) duruma göre aktif/pasif yapan fonksiyon
    function updateButtons() {
        // En baştaysak 'geri' butonunu pasif yap
        prevButton.disabled = currentPage === 0;
        // En sondaysek 'ileri' butonunu pasif yap
        nextButton.disabled = currentPage >= pageCount - 1;
    }
}

/* === EĞİTİM KARUSELLERİ KODLARI BİTİŞ === */

/* === FOOTER YILINI OTOMATİK GÜNCELLEME === */

    // footer-year id'li elementi bul ve içini mevcut yılla doldur
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Düğmeyi al
var mybutton = document.getElementById("scrollToTopBtn");

// Kullanıcı sayfayı aşağı kaydırdığında düğmeyi göster/gizle
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    // 200 pikselden fazla kaydırıldıysa göster
    mybutton.style.display = "block";
  } else {
    // 200 pikselden az kaydırıldıysa gizle
    mybutton.style.display = "none";
  }
}

// Düğmeye tıklandığında sayfanın en üstüne kaydır
function scrollToTop() {
  // Yumuşak kaydırma için modern tarayıcı desteği
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}
