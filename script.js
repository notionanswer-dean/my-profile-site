// Portfolio Website JavaScript - Light Mode with GSAP Animations

document.addEventListener('DOMContentLoaded', function() {
  // ========================
  // GSAP Animations
  // ========================

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero Section Entry Animation
  initHeroAnimation();

  // Scroll-based Section Reveal
  initScrollAnimations();

  // Card Hover Effects (3D Tilt)
  initCardHoverEffects();

  // Button Hover Effects
  initButtonHoverEffects();
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('open');

      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        menuToggle.setAttribute('aria-label', '메뉴 열기');
      } else {
        mobileMenu.classList.remove('hidden');
        // Trigger reflow for animation
        mobileMenu.offsetHeight;
        mobileMenu.classList.add('open');
        menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        menuToggle.setAttribute('aria-label', '메뉴 닫기');
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      });
    });
  }

  // Fade In Animation on Scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // Active Navigation Link Management
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // Smooth Scroll for Navigation Links
  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  allNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add stagger delay to skill cards and project cards
  const skillCards = document.querySelectorAll('.skill-card');
  const projectCards = document.querySelectorAll('.project-card');

  skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});

// ========================
// GSAP Animation Functions
// ========================

// Hero Section Entry Animation
function initHeroAnimation() {
  const heroTitle = document.querySelector('.gsap-hero-title');
  const heroDesc = document.querySelector('.gsap-hero-desc');
  const heroButtons = document.querySelector('.gsap-hero-buttons');
  const heroImage = document.querySelector('.gsap-hero-image');

  if (!heroTitle) return;

  // Make elements visible before animation
  gsap.set([heroTitle, heroDesc, heroButtons, heroImage], {
    visibility: 'visible'
  });

  // Create timeline for hero animation
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Title animation - fade in and slide up
  heroTl.fromTo(heroTitle,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8 }
  );

  // Description animation - fade in and slide up with delay
  heroTl.fromTo(heroDesc,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.4'
  );

  // Buttons animation - scale and fade
  heroTl.fromTo(heroButtons,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
    '-=0.3'
  );

  // Profile image animation - slide in from right
  heroTl.fromTo(heroImage,
    { opacity: 0, x: 60, scale: 0.95 },
    { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
    '-=0.5'
  );
}

// Scroll-based Section Reveal with GSAP ScrollTrigger
function initScrollAnimations() {
  // Section titles animation
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Skill cards stagger animation
  const skillCardsContainer = document.querySelector('#skills .grid');
  if (skillCardsContainer) {
    const skillCards = skillCardsContainer.querySelectorAll('.skill-card');
    gsap.fromTo(skillCards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillCardsContainer,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // Project cards stagger animation
  const projectCardsContainer = document.querySelector('#projects .grid');
  if (projectCardsContainer) {
    const projectCards = projectCardsContainer.querySelectorAll('.project-card');
    gsap.fromTo(projectCards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: projectCardsContainer,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // About section paragraphs
  const aboutParagraphs = document.querySelectorAll('#about p');
  gsap.fromTo(aboutParagraphs,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Contact cards animation
  const contactCards = document.querySelectorAll('.contact-card');
  gsap.fromTo(contactCards,
    { opacity: 0, y: 30, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
}

// 3D Tilt Effect for Cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.project-card, .skill-card');

  cards.forEach(card => {
    card.classList.add('gsap-hover');

    card.addEventListener('mouseenter', function(e) {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation based on mouse position
      const rotateX = (mouseY / (rect.height / 2)) * -8;
      const rotateY = (mouseX / (rect.width / 2)) * 8;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', function() {
      gsap.to(card, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// Button Hover Effects with Elastic Animation
function initButtonHoverEffects() {
  const buttons = document.querySelectorAll('.btn-primary');

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      });
    });

    btn.addEventListener('mouseleave', function() {
      gsap.to(btn, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)'
      });
    });

    // Click animation
    btn.addEventListener('mousedown', function() {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseup', function() {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  // Contact cards magnetic effect
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(card, {
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', function() {
      gsap.to(card, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)'
      });
    });

    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) * 0.1;
      const moveY = (e.clientY - centerY) * 0.1;

      gsap.to(card, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}
