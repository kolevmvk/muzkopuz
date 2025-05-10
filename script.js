// Hamburger meni
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Zatvaranje menija kada se klikne na link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Testimonial slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const sliderContainer = document.querySelector('.testimonial-container');

function showSlide(n) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    currentSlide = (n + testimonials.length) % testimonials.length;
    testimonials[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Event listeners za kontrole
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Klik na tačke
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Swipe funkcionalnost
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        showSlide(currentSlide + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        showSlide(currentSlide - 1);
    }
}

// Automatsko promenjavanje slajdova samo na mobilnim uređajima
let slideInterval;

function startAutoSlide() {
    if (window.innerWidth <= 768) {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Inicijalizacija
window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        showSlide(0);
        startAutoSlide();
    }
});

// Resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        showSlide(currentSlide);
        startAutoSlide();
    } else {
        stopAutoSlide();
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
    }
});

// Skrolovanje do sekcije
function scrollToUsluge() {
    const usluge = document.getElementById('usluge');
    if (usluge) {
        usluge.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToContact() {
    const kontakt = document.getElementById('kontakt');
    if (kontakt) {
        kontakt.scrollIntoView({ behavior: 'smooth' });
    }
}

// Katalog slider
const katalogTrack = document.querySelector('.katalog-track');
const katalogCards = document.querySelectorAll('.katalog-card');
const katalogDots = document.querySelectorAll('.katalog-dot');
const katalogPrev = document.querySelector('.katalog-prev');
const katalogNext = document.querySelector('.katalog-next');

let currentKatalogSlide = 0;
let cardsPerView = window.innerWidth <= 768 ? 1 : 3;
let maxSlides = Math.ceil(katalogCards.length / cardsPerView) - 1;

function updateKatalogSlider() {
    const slideWidth = katalogCards[0].offsetWidth + 32; // 32px za margin
    katalogTrack.style.transform = `translateX(-${currentKatalogSlide * slideWidth * cardsPerView}px)`;
    
    // Update dots
    katalogDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentKatalogSlide);
    });
}

function nextKatalogSlide() {
    if (currentKatalogSlide < maxSlides) {
        currentKatalogSlide++;
    } else {
        currentKatalogSlide = 0;
    }
    updateKatalogSlider();
}

function prevKatalogSlide() {
    if (currentKatalogSlide > 0) {
        currentKatalogSlide--;
    } else {
        currentKatalogSlide = maxSlides;
    }
    updateKatalogSlider();
}

// Event listeners za katalog kontrole
katalogPrev.addEventListener('click', prevKatalogSlide);
katalogNext.addEventListener('click', nextKatalogSlide);

// Klik na tačke
katalogDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentKatalogSlide = index;
        updateKatalogSlider();
    });
});

// Swipe funkcionalnost za katalog
let katalogTouchStartX = 0;
let katalogTouchEndX = 0;

katalogTrack.addEventListener('touchstart', e => {
    katalogTouchStartX = e.changedTouches[0].screenX;
});

katalogTrack.addEventListener('touchend', e => {
    katalogTouchEndX = e.changedTouches[0].screenX;
    handleKatalogSwipe();
});

function handleKatalogSwipe() {
    const swipeThreshold = 50;
    if (katalogTouchEndX < katalogTouchStartX - swipeThreshold) {
        nextKatalogSlide();
    }
    if (katalogTouchEndX > katalogTouchStartX + swipeThreshold) {
        prevKatalogSlide();
    }
}

// Resize handler za katalog
window.addEventListener('resize', () => {
    cardsPerView = window.innerWidth <= 768 ? 1 : 3;
    maxSlides = Math.ceil(katalogCards.length / cardsPerView) - 1;
    currentKatalogSlide = Math.min(currentKatalogSlide, maxSlides);
    updateKatalogSlider();
});

// Inicijalizacija katalog slidera
window.addEventListener('load', () => {
    updateKatalogSlider();
}); 