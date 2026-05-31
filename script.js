const loader = document.getElementById("loader");
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const spotlight = document.getElementById("spotlight");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 900);
});

// Typing animation for hero role line
const typeTarget = document.getElementById("typedText");
const typeLines = [
  "AI/ML Developer",
  "Python Enthusiast",
  "Student Builder"
];
let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = typeLines[lineIndex];
  typeTarget.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1100);
    return;
  } else {
    isDeleting = false;
    lineIndex = (lineIndex + 1) % typeLines.length;
  }

  const speed = isDeleting ? 45 : 85;
  setTimeout(typeEffect, speed);
}

typeEffect();

// Responsive navbar toggling
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Reveal elements when they enter viewport
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Counter animation
const counters = document.querySelectorAll("[data-counter]");
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.counter);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 70));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          entry.target.textContent = target;
          clearInterval(timer);
        } else {
          entry.target.textContent = current;
        }
      }, 24);

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// Skills progress bars animation
const skillCards = document.querySelectorAll(".skill-card");
const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const progress = entry.target.dataset.progress;
      const bar = entry.target.querySelector(".bar span");
      bar.style.width = `${progress}%`;
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.25 }
);

skillCards.forEach((card) => skillObserver.observe(card));

// Update navbar style, active link and scroll progress
const sections = [...document.querySelectorAll("section[id]")];
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / maxScroll) * 100;
  scrollProgress.style.width = `${progress}%`;

  navbar.classList.toggle("scrolled", scrollTop > 20);

  let currentId = "home";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (scrollTop >= top) currentId = section.id;
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
});

// Spotlight mouse-follow effect
window.addEventListener("mousemove", (event) => {
  spotlight.style.left = `${event.clientX}px`;
  spotlight.style.top = `${event.clientY}px`;
});

// Basic tilt interaction for cards
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

// Back-to-top interaction
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Floating particles background
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor(window.innerWidth / 14);

  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 212, 255, 0.75)";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
animateParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

