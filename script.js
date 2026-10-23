(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = document.querySelector('.hero');
    const heroItems = hero ? hero.querySelectorAll('h1, p, ul') : [];

    heroItems.forEach((item, index) => {
        item.dataset.reveal = '';
        item.style.transitionDelay = `${index * 110}ms`;
    });

    document.querySelectorAll('main > section:not(.hero) > h2, main > section:not(.hero) > p, main > section:not(.hero) > article, main > section:not(.hero) > ul, main > section:not(.hero) > h3')
        .forEach((item, index) => {
            item.dataset.reveal = '';
            item.style.transitionDelay = `${(index % 4) * 75}ms`;
        });

    if (!('IntersectionObserver' in window) || reducedMotion) {
        document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'));
        hero?.classList.add('is-in-view');
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            if (entry.target === hero) hero.classList.add('is-in-view');
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    document.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item));
    if (hero) observer.observe(hero);
})();
