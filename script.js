// ===== Announcement bar dismiss =====
(function () {
    var bar = document.getElementById('announce');
    var close = document.getElementById('announceClose');
    if (!bar || !close) return;
    close.addEventListener('click', function () {
        bar.classList.add('hidden');
    });
})();

// ===== Sticky nav state on scroll =====
(function () {
    var nav = document.getElementById('nav');
    if (!nav) return;
    function onScroll() {
        if (window.pageYOffset > 24) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ===== Mobile menu toggle =====
(function () {
    var toggle = document.getElementById('navToggle');
    var list = document.getElementById('navList');
    if (!toggle || !list) return;
    toggle.addEventListener('click', function () {
        list.classList.toggle('open');
    });
    list.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            list.classList.remove('open');
        });
    });
})();

// ===== Smooth scroll with sticky-nav offset =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var nav = document.getElementById('nav');
        var offset = (nav ? nav.offsetHeight : 0) + 12;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
    });
});

// ===== Reveal on scroll =====
(function () {
    var selectors = [
        '.manifesto-text', '.field-lead', '.field-body', '.field-quote',
        '.promise-row', '.promise-stats', '.sec-head',
        '.menu-item', '.table-note',
        '.scene', '.voice',
        '.reserve-cta', '.visit-table', '.visit-routes', '.visit-map'
    ];
    var nodes = [];
    selectors.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            el.classList.add('reveal');
            nodes.push(el);
        });
    });

    if (!('IntersectionObserver' in window)) {
        nodes.forEach(function (el) { el.classList.add('in'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    nodes.forEach(function (el) { observer.observe(el); });
})();

// ===== Count-up stats =====
(function () {
    var stats = document.querySelectorAll('.pstat-num[data-count]');
    if (!stats.length || !('IntersectionObserver' in window)) return;

    function animate(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var duration = 1400;
        var start = null;
        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target);
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    stats.forEach(function (el) { observer.observe(el); });
})();

// ===== Pause marquee on hover =====
(function () {
    var track = document.querySelector('.marquee-track');
    if (!track) return;
    var marquee = track.closest('.marquee');
    marquee.addEventListener('mouseenter', function () { track.style.animationPlayState = 'paused'; });
    marquee.addEventListener('mouseleave', function () { track.style.animationPlayState = 'running'; });
})();
