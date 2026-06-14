// ===== Modal =====
(function () {
    const modal = document.getElementById('offerModal');
    const closeBtn = document.getElementById('modalClose');

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Show modal immediately on load (no delay)
    document.body.style.overflow = 'hidden';

    // Close on X button
    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeModal();
    });

    // Close on clicking anywhere on the overlay or modal body
    modal.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
})();

// ===== Navbar scroll effect =====
(function () {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
})();

// ===== Mobile menu toggle =====
(function () {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    toggle.addEventListener('click', function () {
        menu.classList.toggle('active');
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
        });
    });
})();

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            var offset = 80;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    });
});

// ===== Intersection Observer for fade-in animations =====
(function () {
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class and observe elements
    var selectors = [
        '.story-grid', '.story-continuation', '.story-quote',
        '.philosophy-card', '.stat',
        '.course-card',
        '.gallery-item',
        '.testimonial-card',
        '.info-block', '.access-map'
    ];

    selectors.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });

    // Add CSS for fade-in
    var style = document.createElement('style');
    style.textContent =
        '.fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }' +
        '.fade-in.visible { opacity: 1; transform: translateY(0); }';
    document.head.appendChild(style);
})();
