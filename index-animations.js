// Funny Bunny Apparel Homepage Advanced Interactions

// 1. Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic'
        });
    }

    // 2. Initialize Swiper for New Arrivals Carousel
    if (typeof Swiper !== 'undefined') {
        const swiperProducts = new Swiper('.swiper-products', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-products .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });

        // 3. Initialize Swiper for Testimonials Slider
        const swiperTestimonials = new Swiper('.swiper-testimonials', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-testimonials .swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });
    }

    // 4. Custom 3D Card Hover Tilt Effect for Category Grid
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set mouse position CSS variables for spot-light cursor following glow
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Calculate tilt angle based on cursor position relative to card center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = -(y - centerY) / 20; // Max 10 degrees tilt
            const rotateY = (x - centerX) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});

// 5. Interactive Fabric Workspace State Database & Switcher
const fabricData = {
    cotton: {
        title: "Egyptian Cotton",
        desc: "Sourced directly from the Nile Delta, our premium long-staple Egyptian cotton is recognized worldwide for its incredible durability, natural luster, and ultra-soft breathability. Ideal for everyday high-end shirting.",
        img: "assets/floral-top-with-sunglasses-and-colorful-jewelry-2026-03-19-23-40-24-utc.webp",
        softness: "90%",
        durability: "95%",
        breathability: "98%"
    },
    silk: {
        title: "Mulberry Silk",
        desc: "Woven from Grade-A premium raw silk threads, this fabric offers unparalleled draping, luxury skin feel, and elegant temperature regulation. Perfect for lightweight blouses and evening wear.",
        img: "assets/female-spring-clothing-glasses-and-flowers-on-blu-2026-01-09-08-04-11-utc.webp",
        softness: "98%",
        durability: "80%",
        breathability: "92%"
    },
    wool: {
        title: "Pure Merino Wool",
        desc: "Super-fine thermal wool yarns sourced responsibly and double-woven to ensure zero itchiness. Retains warmth effortlessly while letting moisture wick away, standard in our premium jackets.",
        img: "assets/winter-clothes-and-accessories-for-outdoor-adventu-2026-03-27-01-49-26-utc.webp",
        softness: "85%",
        durability: "92%",
        breathability: "88%"
    }
};

function switchFabric(fabricKey) {
    // 1. Toggle active class on tab buttons
    const tabs = document.querySelectorAll('.fabric-tab-btn');
    tabs.forEach(btn => btn.classList.remove('active'));
    
    // Find target tab trigger
    const currentEvent = window.event;
    if (currentEvent && currentEvent.currentTarget) {
        currentEvent.currentTarget.classList.add('active');
    }
    
    const data = fabricData[fabricKey];
    if (!data) return;
    
    // 2. Fetch DOM references
    const titleEl = document.getElementById('fabric-title');
    const descEl = document.getElementById('fabric-desc');
    const imgEl = document.getElementById('fabric-img');
    
    if (!titleEl || !descEl || !imgEl) return;
    
    // 3. Reset CSS animation styles to trigger reflow
    titleEl.style.animation = 'none';
    descEl.style.animation = 'none';
    imgEl.style.animation = 'none';
    
    titleEl.offsetHeight; // force reflow
    
    // 4. Update texts and paths
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    imgEl.src = data.img;
    imgEl.alt = data.title + " Bolts";
    
    // 5. Apply animations
    titleEl.style.animation = 'fadeInUp 0.5s ease forwards';
    descEl.style.animation = 'fadeInUp 0.5s ease 0.1s forwards';
    imgEl.style.animation = 'fadeInScale 0.6s cubic-bezier(0.25, 1, 0.2, 1) 0.3s forwards';
    
    // 6. Update progress bars and numeric metrics
    const softVal = document.getElementById('metric-softness-val');
    const softBar = document.getElementById('metric-softness-bar');
    if (softVal && softBar) {
        softVal.textContent = data.softness;
        softBar.style.width = data.softness;
    }
    
    const durVal = document.getElementById('metric-durability-val');
    const durBar = document.getElementById('metric-durability-bar');
    if (durVal && durBar) {
        durVal.textContent = data.durability;
        durBar.style.width = data.durability;
    }
    
    const breathVal = document.getElementById('metric-breathability-val');
    const breathBar = document.getElementById('metric-breathability-bar');
    if (breathVal && breathBar) {
        breathVal.textContent = data.breathability;
        breathBar.style.width = data.breathability;
    }
}

// 6. Lookbook Lightbox Modal Functionality
function openLightbox(imgSrc, captionText) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    if (modal && img && caption) {
        img.src = imgSrc;
        caption.textContent = captionText;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Global click event to close lookbook lightbox when clicking outside Content
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
});
