// ============================================================
// SpaceX homepage replica — interaction layer
// ============================================================

// ---------- Responsive video sources (desktop / mobile) ----------
// Each background video declares data-src-desktop / data-src-mobile,
// mirroring how spacex.com serves separate encodes per breakpoint.
const MOBILE_QUERY = window.matchMedia('(max-width: 599px)');

function applyVideoSources() {
    document.querySelectorAll('video.bg-video').forEach((video) => {
        const desired = MOBILE_QUERY.matches
            ? video.dataset.srcMobile || video.dataset.srcDesktop
            : video.dataset.srcDesktop;
        if (desired && video.getAttribute('src') !== desired) {
            video.setAttribute('src', desired);
            video.load();
            video.play().catch(() => {});
        }
    });
}

// ---------- Play/pause videos as they enter/leave the viewport ----------
function initVideoObserver() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) target.play().catch(() => {});
            else target.pause();
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('video.bg-video').forEach((v) => observer.observe(v));
}

// ---------- Resume autoplay after first user interaction if blocked ----------
function enableVideosOnInteraction() {
    const resume = () => {
        document.querySelectorAll('video.bg-video').forEach((v) => {
            if (v.paused) v.play().catch(() => {});
        });
        document.removeEventListener('click', resume);
        document.removeEventListener('touchstart', resume);
    };
    document.addEventListener('click', resume);
    document.addEventListener('touchstart', resume);
}

// ---------- Scroll-reveal for tile content ----------
function initRevealObserver() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    items.forEach((el) => observer.observe(el));
}

// ---------- Navbar: darken after scrolling past the top ----------
function initNavScroll() {
    const navbar = document.getElementById('navbar');
    const update = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    update();
}

// ---------- Mobile menu ----------
function initMobileMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');

    const close = () => {
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        menuIcon.classList.remove('open');
        menuIcon.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };
    const open = () => {
        navLinks.classList.add('open');
        overlay.classList.add('active');
        menuIcon.classList.add('open');
        menuIcon.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    menuIcon.addEventListener('click', () => {
        navLinks.classList.contains('open') ? close() : open();
    });
    overlay.addEventListener('click', close);
    navLinks.addEventListener('click', (e) => {
        if (e.target.closest('a')) close();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) close();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyVideoSources();
    MOBILE_QUERY.addEventListener('change', applyVideoSources);
    initVideoObserver();
    enableVideosOnInteraction();
    initRevealObserver();
    initNavScroll();
    initMobileMenu();
});
