// ============================================
// THE KARAHI HOUSE - PREMIUM ANIMATIONS
// ============================================

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// PRELOADER
// ============================================
let preloaderProgress = 0;
const preloader = document.getElementById('preloader');
const preloaderFill = document.querySelector('.preloader__line-fill');
const preloaderCounter = document.querySelector('.preloader__counter');

function updatePreloader() {
  preloaderProgress += Math.random() * 15;
  if (preloaderProgress > 100) preloaderProgress = 100;
  
  preloaderFill.style.width = preloaderProgress + '%';
  preloaderCounter.textContent = Math.floor(preloaderProgress) + '%';
  
  if (preloaderProgress < 100) {
    requestAnimationFrame(updatePreloader);
  }
}

window.addEventListener('load', () => {
  updatePreloader();
  
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('loading');
    initAnimations();
  }, 2000);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;
  
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .bento__item, .menu-card, .review-card, .magnetic');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
});

// ============================================
// SCROLL PROGRESS
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// ============================================
// NAVIGATION
// ============================================
const nav = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Quick bar visibility
  const quickBar = document.getElementById('quickBar');
  if (window.scrollY > 800) {
    quickBar.classList.add('visible');
  } else {
    quickBar.classList.remove('visible');
  }
});

// Mobile menu toggle
navBurger.addEventListener('click', () => {
  navBurger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navBurger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// ============================================
// MAGNETIC BUTTONS
// ============================================
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// ============================================
// MAIN ANIMATIONS
// ============================================
function initAnimations() {
  
  // Hero Animations
  const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  
  // Animate individual characters
  heroTl.to('.hero__title .char', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.03,
    delay: 0.2
  })
  .to('.hero__eyebrow', {
    opacity: 1,
    y: 0,
    duration: 1
  }, '-=0.6')
  .to('.hero__subtitle', {
    opacity: 1,
    y: 0,
    duration: 1
  }, '-=0.6')
  .to('.hero__buttons', {
    opacity: 1,
    y: 0,
    duration: 1
  }, '-=0.6');
  
  // Hero Parallax
  gsap.to('.hero__bg-image', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  // Heritage Section
  gsap.from('.heritage__visual', {
    opacity: 0,
    x: -60,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.heritage',
      start: 'top 70%'
    }
  });
  
  gsap.from('.heritage__content > *', {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.heritage__content',
      start: 'top 70%'
    }
  });
  
  // Heritage Features
  gsap.utils.toArray('.heritage__feature').forEach((feature, i) => {
    gsap.from(feature, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: feature,
        start: 'top 85%'
      }
    });
  });
  
  // Bento Grid
  gsap.from('.bento__item', {
    opacity: 0,
    y: 80,
    duration: 1,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.bento',
      start: 'top 80%'
    }
  });
  
  // Menu Cards
  gsap.utils.toArray('.menu-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    });
  });
  
  // Experience Section
  gsap.from('.experience__content > *', {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.experience__content',
      start: 'top 70%'
    }
  });
  
  // Counter Animation
  gsap.utils.toArray('.stat').forEach(stat => {
    const countTarget = parseInt(stat.dataset.count);
    const countElement = stat.querySelector('.stat__count');
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(countElement, {
          innerText: countTarget,
          duration: 2.5,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate: function() {
            countElement.innerText = Math.ceil(parseFloat(countElement.innerText)).toLocaleString();
          }
        });
      },
      once: true
    });
  });
  
  // Reviews
  gsap.from('.review-card', {
    opacity: 0,
    y: 60,
    duration: 1,
    stagger: 0.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.reviews__grid',
      start: 'top 75%'
    }
  });
  
  // Visit Section
  gsap.from('.visit__info > *', {
    opacity: 0,
    x: -40,
    duration: 1,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.visit__info',
      start: 'top 70%'
    }
  });
  
  gsap.from('.visit__map', {
    opacity: 0,
    x: 40,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.visit__map',
      start: 'top 70%'
    }
  });
  
  // Reserve Form
  gsap.from('.form-group', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.reserve__form',
      start: 'top 80%'
    }
  });
  
  // Footer
  gsap.from('.footer__brand, .footer__column', {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%'
    }
  });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
gsap.utils.toArray('[data-parallax]').forEach(el => {
  const speed = parseFloat(el.dataset.parallax);
  
  gsap.to(el, {
    yPercent: -20 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

// ============================================
// 3D TILT EFFECT
// ============================================
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'expo.out'
      });
    }
  });
});

// ============================================
// WHATSAPP RESERVATION
// ============================================
const reserveForm = document.getElementById('reserveForm');

reserveForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const guests = document.getElementById('guests').value;
  const date = document.getElementById('date').value;
  const message = document.getElementById('message').value;
  
  const formattedDate = new Date(date).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  });
  
  const whatsappMessage = `🔥 *New Reservation Request*\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Guests:* ${guests}\n` +
    `*Date & Time:* ${formattedDate}\n` +
    `*Special Requests:* ${message || 'None'}`;
  
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const restaurantPhone = '923001234567'; // Replace with actual number
  
  window.open(`https://wa.me/${restaurantPhone}?text=${encodedMessage}`, '_blank');
});

// ============================================
// HORIZONTAL MENU SCROLL (Mouse Wheel)
// ============================================
const menuTrack = document.getElementById('menuTrack');

if (menuTrack) {
  menuTrack.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      menuTrack.scrollLeft += e.deltaY;
    }
  }, { passive: false });
}

// ============================================
// TEXT REVEAL ON SCROLL
// ============================================
const revealElements = document.querySelectorAll('.reveal-text, .reveal-up, .reveal-left, .reveal-right');

revealElements.forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
      
      if (el.classList.contains('reveal-text')) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      } else if (el.classList.contains('reveal-up')) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      } else if (el.classList.contains('reveal-left')) {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      } else if (el.classList.contains('reveal-right')) {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }
    },
    once: true
  });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}