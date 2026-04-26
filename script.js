document.addEventListener('DOMContentLoaded', function () {

    // Body fade-in
    document.body.classList.add('loaded');

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu toggle
    const btn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    btn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        btn.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            btn.classList.remove('open');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - navbar.offsetHeight, behavior: 'smooth' });
            }
        });
    });

    // Typing effect for hero title
    const titles = ['AI Engineer', 'Data Engineer', 'Multi-Agent AI Developer', 'ETL Pipeline Builder'];
    let ti = 0, ci = 0, deleting = false;
    const heroTitle = document.getElementById('heroTitle');
    function type() {
        const current = titles[ti];
        if (!deleting) {
            heroTitle.textContent = current.slice(0, ++ci);
            if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
        } else {
            heroTitle.textContent = current.slice(0, --ci);
            if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; }
        }
        setTimeout(type, deleting ? 60 : 110);
    }
    type();

    // Counter animation
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.dataset.target;
                let count = 0;
                const step = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    count = Math.min(count + step, target);
                    el.textContent = count + '+';
                    if (count >= target) clearInterval(timer);
                }, 50);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // Parallax orbs
    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        const o1 = document.querySelector('.orb-1');
        const o2 = document.querySelector('.orb-2');
        if (o1) o1.style.transform = `translateY(${sy * 0.15}px)`;
        if (o2) o2.style.transform = `translateY(${sy * -0.1}px)`;
    });

    // Project Showcase Carousel Logic
    const track = document.querySelector('.showcase-track');
    if (track) {
        const slides = Array.from(track.children);
        // Clone slides for infinite effect
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });

        let index = 0;
        setInterval(() => {
            index++;
            track.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            track.style.transform = `translateX(-${index * 100}%)`;

            if (index >= slides.length) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    index = 0;
                    track.style.transform = `translateX(0)`;
                }, 1000);
            }
        }, 2000);
    }
});