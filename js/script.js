/* ===== Dark mode ===== */
(function () {
    const root = document.documentElement;
    const btn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (btn) {
            btn.textContent = theme === 'dark' ? '☀️ Sáng' : '🌙 Tối';
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
        }
    }

    applyTheme(root.getAttribute('data-theme') || 'light');

    if (btn) {
        btn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            try { localStorage.setItem('theme', next); } catch (e) { /* bỏ qua */ }
        });
    }
})();

/* ===== Animation khi scroll (Intersection Observer) ===== */
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // chỉ chạy 1 lần
            }
        });
    }, { threshold: 0.15 });

    items.forEach((el, i) => {
        el.style.transitionDelay = (i % 3) * 80 + 'ms';
        observer.observe(el);
    });

    console.log('Portfolio của Trần Anh Vũ đã load xong!');
});
