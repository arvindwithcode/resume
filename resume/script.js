// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 800);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX - 4 + 'px';
  cursor.style.top = e.clientY - 4 + 'px';
  follower.style.left = e.clientX - 18 + 'px';
  follower.style.top = e.clientY - 18 + 'px';
});
document.querySelectorAll('a, button, .tech-item').forEach(el => {
  el.addEventListener('mouseenter', () => { follower.style.transform = 'scale(1.5)'; follower.style.borderColor = 'var(--accent)'; });
  el.addEventListener('mouseleave', () => { follower.style.transform = 'scale(1)'; follower.style.borderColor = 'var(--primary)'; });
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 500);
  updateActiveNav();
});
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => { navToggle.classList.remove('active'); navLinks.classList.remove('open'); });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === current);
  });
}

// ===== TYPING EFFECT =====
const titles = ['Graphic Designer', 'Web Developer', 'Sales Executive', 'Brand Strategist', 'AI Enthusiast'];
let titleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');
function type() {
  const current = titles[titleIdx];
  typingEl.textContent = current.substring(0, charIdx);
  if (!deleting) {
    charIdx++;
    if (charIdx > current.length) { deleting = true; setTimeout(type, 1500); return; }
  } else {
    charIdx--;
    if (charIdx === 0) { deleting = false; titleIdx = (titleIdx + 1) % titles.length; }
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.top = Math.random() * 100 + '%';
  p.style.animationDuration = 4 + Math.random() * 6 + 's';
  p.style.animationDelay = Math.random() * 4 + 's';
  p.style.width = p.style.height = 1 + Math.random() * 3 + 'px';
  particlesContainer.appendChild(p);
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.progress + '%';
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-progress').forEach(bar => skillObserver.observe(bar));

// ===== STATS COUNTER =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

// ===== PROJECT FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'animateUp 0.5s forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== DOWNLOAD CV =====
document.getElementById('downloadResume').addEventListener('click', (e) => {
  e.preventDefault();
  // Link to the existing PDF resume
  const link = document.createElement('a');
  link.href = 'arvind cv.pdf';
  link.download = 'Arvind_Kumar_Sharma_CV.pdf';
  link.click();
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = document.getElementById('formSubmit');
  btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
  btn.style.background = 'linear-gradient(135deg, #00C9A7, #6C63FF)';
  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});
