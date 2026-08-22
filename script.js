/**
 * ApexCraft Studio — Swiss Editorial Web Design & Strategy
 * Interactions & Interactive Modules
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCustomCursor();
  initPortfolioCarousel();
  initAudienceFilters();
  initAccordions();
  initProcessOrbit();
  initContactModal();
  initFaqDiscountPopup();
  initMobileMenu();
  initScrollAnimations();
  initHeroCanvasObject();
});

/* --------------------------------------------------------------------------
   1. HEADER SCROLL EFFECT & ACTIVE NAVIGATION
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. CUSTOM MAGNETIC "VIEW" CURSOR FOR SHOWCASE CARDS
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('visible');
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('visible');
    });
  });
}

/* --------------------------------------------------------------------------
   3. 1-ROW HORIZONTAL SCROLLABLE PORTFOLIO CAROUSEL
   -------------------------------------------------------------------------- */
function initPortfolioCarousel() {
  const carousel = document.getElementById('portfolioCarouselWrapper');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const progressBar = document.getElementById('carouselProgressBar');

  if (!carousel) return;

  function updateProgressBar() {
    if (!progressBar) return;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (maxScroll <= 0) {
      progressBar.style.width = '100%';
      return;
    }
    const scrollPercent = (carousel.scrollLeft / maxScroll);
    const minWidthPercent = 25;
    const remainingPercent = 75;
    progressBar.style.width = `${minWidthPercent + (scrollPercent * remainingPercent)}%`;
  }

  carousel.addEventListener('scroll', updateProgressBar, { passive: true });
  window.addEventListener('resize', updateProgressBar);
  updateProgressBar();

  // Navigation Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const card = carousel.querySelector('.project-card');
      const cardWidth = card ? card.offsetWidth + 24 : 400;
      carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const card = carousel.querySelector('.project-card');
      const cardWidth = card ? card.offsetWidth + 24 : 400;
      carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  // Mouse Drag to Scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });
}

/* --------------------------------------------------------------------------
   4. AUDIENCE / PORTFOLIO FILTERING
   -------------------------------------------------------------------------- */
function initAudienceFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');
  const carousel = document.getElementById('portfolioCarouselWrapper');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const target = pill.dataset.target;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (target === 'all' || category === target) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0.35';
          card.style.transform = 'scale(0.96)';
        }
      });

      // Scroll to first matching card
      if (carousel && target !== 'all') {
        const firstMatch = carousel.querySelector(`.project-card[data-category="${target}"]`);
        if (firstMatch) {
          firstMatch.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. ACCORDIONS (DELIVERABLES & FAQ)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionLists = document.querySelectorAll('.accordion-list');

  accordionLists.forEach(list => {
    const items = list.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const icon = item.querySelector('.accordion-icon');

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items in the same accordion group
        items.forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const siblingHeader = sibling.querySelector('.accordion-header');
            const siblingIcon = sibling.querySelector('.accordion-icon');
            if (siblingHeader) siblingHeader.setAttribute('aria-expanded', 'false');
            if (siblingIcon) siblingIcon.textContent = '+';
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
          if (icon) icon.textContent = '+';
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          if (icon) icon.textContent = '–';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE 5-STEP DARK ORBITAL PROCESS STAGE
   -------------------------------------------------------------------------- */
function initProcessOrbit() {
  const steps = [
    {
      eyebrow: "STAGE 01",
      title: "01 — Discover",
      desc: "We talk about your business, services, audience, goals, existing website, and what you want the new website to accomplish.",
      svg: `
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="16" stroke="#ff3823" stroke-width="1.2" opacity="0.4"/>
          <circle cx="60" cy="60" r="28" stroke="#ff3823" stroke-width="1.2" opacity="0.6"/>
          <circle cx="60" cy="60" r="40" stroke="#ff3823" stroke-width="1.2" opacity="0.8"/>
          <circle cx="60" cy="60" r="52" stroke="#ff3823" stroke-width="1.2" opacity="1"/>
          <ellipse cx="60" cy="60" rx="52" ry="24" stroke="#ffffff" stroke-width="0.8" opacity="0.3" transform="rotate(25 60 60)"/>
          <ellipse cx="60" cy="60" rx="52" ry="24" stroke="#ffffff" stroke-width="0.8" opacity="0.3" transform="rotate(-25 60 60)"/>
        </svg>`
    },
    {
      eyebrow: "STAGE 02",
      title: "02 — Plan",
      desc: "We determine the structure, pages, messaging, content requirements, and calls to action.",
      svg: `
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.3"/>
          <polygon points="60,10 75,45 110,60 75,75 60,110 45,75 10,60 45,45" stroke="#ff3823" stroke-width="1.4" fill="none"/>
          <circle cx="60" cy="60" r="20" stroke="#ff3823" stroke-width="1.2" opacity="0.8"/>
          <circle cx="60" cy="60" r="6" fill="#ff3823"/>
        </svg>`
    },
    {
      eyebrow: "STAGE 03",
      title: "03 — Design",
      desc: "The strategy becomes a clean, professional visual design tailored to your business.",
      svg: `
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" stroke="#ff3823" stroke-width="1.2"/>
          <ellipse cx="60" cy="60" rx="50" ry="20" stroke="#ff3823" stroke-width="1"/>
          <ellipse cx="60" cy="60" rx="20" ry="50" stroke="#ff3823" stroke-width="1"/>
          <line x1="10" y1="60" x2="110" y2="60" stroke="#ffffff" stroke-width="0.8" opacity="0.4"/>
          <line x1="60" y1="10" x2="60" y2="110" stroke="#ffffff" stroke-width="0.8" opacity="0.4"/>
        </svg>`
    },
    {
      eyebrow: "STAGE 04",
      title: "04 — Build",
      desc: "Once the design is approved, the website is developed into a responsive, functional site.",
      svg: `
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="24" width="84" height="60" rx="8" stroke="#ff3823" stroke-width="1.4" fill="none"/>
          <line x1="18" y1="36" x2="102" y2="36" stroke="#ffffff" stroke-width="0.8" opacity="0.4"/>
          <circle cx="28" cy="30" r="3" fill="#ff3823"/>
          <circle cx="36" cy="30" r="3" fill="#ff3823" opacity="0.6"/>
          <circle cx="44" cy="30" r="3" fill="#ff3823" opacity="0.3"/>
          <path d="M42 54 L52 64 L42 74" stroke="#ff3823" stroke-width="1.4" stroke-linecap="round"/>
          <line x1="58" y1="74" x2="74" y2="74" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round"/>
        </svg>`
    },
    {
      eyebrow: "STAGE 05",
      title: "05 — Review & Launch",
      desc: "You review the finished website, we make the agreed refinements, and your website is prepared for launch.",
      svg: `
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="48" stroke="#ff3823" stroke-width="1.2"/>
          <g stroke="#ff3823" stroke-width="1.2">
            <line x1="60" y1="15" x2="60" y2="28"/>
            <line x1="60" y1="92" x2="60" y2="105"/>
            <line x1="15" y1="60" x2="28" y2="60"/>
            <line x1="92" y1="60" x2="105" y2="60"/>
          </g>
          <path d="M44 60 L54 70 L76 48" stroke="#ff3823" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    }
  ];

  let currentStep = 0;
  const eyebrowEl = document.getElementById('processStepEyebrow');
  const titleEl = document.getElementById('processStepTitle');
  const descEl = document.getElementById('processStepDesc');
  const graphicEl = document.getElementById('processGraphic');
  const orbitNodes = document.querySelectorAll('.orbit-node');
  const stepDots = document.querySelectorAll('.step-dot');
  const prevBtn = document.getElementById('prevStepBtn');
  const nextBtn = document.getElementById('nextStepBtn');

  if (!titleEl) return;

  function updateStep(index) {
    currentStep = (index + steps.length) % steps.length;
    const step = steps[currentStep];

    titleEl.style.opacity = '0';
    descEl.style.opacity = '0';
    graphicEl.style.opacity = '0';

    setTimeout(() => {
      eyebrowEl.textContent = step.eyebrow;
      titleEl.textContent = step.title;
      descEl.textContent = step.desc;
      graphicEl.innerHTML = step.svg;

      titleEl.style.opacity = '1';
      descEl.style.opacity = '1';
      graphicEl.style.opacity = '1';
    }, 180);

    orbitNodes.forEach((node, i) => {
      node.classList.toggle('active', i === currentStep);
    });

    stepDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentStep);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => updateStep(currentStep - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateStep(currentStep + 1));

  orbitNodes.forEach((node, i) => {
    node.addEventListener('click', () => updateStep(i));
  });

  stepDots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateStep(i));
  });

  // Auto progression every 6 seconds
  let autoTimer = setInterval(() => {
    updateStep(currentStep + 1);
  }, 6000);

  const stage = document.getElementById('orbitalStage');
  if (stage) {
    stage.addEventListener('mouseenter', () => clearInterval(autoTimer));
    stage.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => {
        updateStep(currentStep + 1);
      }, 6000);
    });
  }
}

/* --------------------------------------------------------------------------
   6. CONSULTATION MODAL OVERLAY
   -------------------------------------------------------------------------- */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const openButtons = document.querySelectorAll('.open-contact-modal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modal) return;

  function openModal(e) {
    const tierGroup = document.getElementById('tierSelectGroup');
    const tierSelect = document.getElementById('clientTier');
    const discountBanner = document.getElementById('modalDiscountBanner');
    const discountCodeField = document.getElementById('discountCodeField');
    const leadSourceField = document.getElementById('leadSourceField');
    const emailSubjectField = document.getElementById('emailSubjectField');

    // Reset discount flags unless claimed via discount popup
    if (discountBanner) discountBanner.style.display = 'none';
    if (discountCodeField) discountCodeField.value = 'None';
    if (leadSourceField) leadSourceField.value = 'Direct Website Consultation';
    if (emailSubjectField) emailSubjectField.value = '🚀 New Website Consultation Request - ApexCraft';

    if (e) {
      e.preventDefault();
      const plan = e.currentTarget ? e.currentTarget.getAttribute('data-plan') : null;
      
      if (plan && tierGroup && tierSelect) {
        tierGroup.style.display = 'block';
        tierSelect.disabled = false;
        tierSelect.value = plan;
      } else if (tierGroup && tierSelect) {
        tierGroup.style.display = 'none';
        tierSelect.disabled = true;
      }
    } else if (tierGroup && tierSelect) {
      tierGroup.style.display = 'none';
      tierSelect.disabled = true;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const tierGroup = document.getElementById('tierSelectGroup');
    const tierSelect = document.getElementById('clientTier');
    if (tierGroup && tierSelect) {
      tierGroup.style.display = 'none';
      tierSelect.disabled = true;
    }
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. FAQ 5% DISCOUNT POP-UP CONTROLLER (CODE: POP5)
   -------------------------------------------------------------------------- */
function initFaqDiscountPopup() {
  const faqSection = document.getElementById('faq');
  const popup = document.getElementById('faqDiscountPopup');
  const closeBtn = document.getElementById('faqPopupCloseBtn');
  const dismissBtn = document.getElementById('dismissPopupBtn');
  const claimBtn = document.getElementById('claimDiscountBtn');
  
  const contactModal = document.getElementById('contactModal');
  const discountBanner = document.getElementById('modalDiscountBanner');
  const discountCodeField = document.getElementById('discountCodeField');
  const leadSourceField = document.getElementById('leadSourceField');
  const emailSubjectField = document.getElementById('emailSubjectField');
  const tierGroup = document.getElementById('tierSelectGroup');
  const tierSelect = document.getElementById('clientTier');

  if (!faqSection || !popup) return;

  function openPopup() {
    if (sessionStorage.getItem('faq_popup_shown') === 'true') return;
    sessionStorage.setItem('faq_popup_shown', 'true');
    popup.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');
  }

  function closePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
  }

  // Trigger popup when user scrolls into the FAQ section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(openPopup, 500);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(faqSection);

  if (closeBtn) closeBtn.addEventListener('click', closePopup);
  if (dismissBtn) dismissBtn.addEventListener('click', closePopup);

  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });

  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      closePopup();
      
      // Open Consultation Modal with POP5 Auto-Applied
      if (contactModal) {
        if (discountBanner) discountBanner.style.display = 'flex';
        if (discountCodeField) discountCodeField.value = 'POP5 (5% Off Auto-Applied via FAQ Pop-up)';
        if (leadSourceField) leadSourceField.value = 'FAQ Discount Pop-up (POP5)';
        if (emailSubjectField) emailSubjectField.value = '🚀 New Website Lead [POP5 5% Discount Claimed] - ApexCraft';
        
        // Show the package selector so they choose their package with the 5% discount
        if (tierGroup && tierSelect) {
          tierGroup.style.display = 'block';
          tierSelect.disabled = false;
        }

        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}

function handleFormSubmit() {
  const form = document.getElementById('inquiryForm');
  const btn = document.getElementById('submitFormBtn');
  const originalText = btn.textContent;
  
  btn.textContent = 'Sending Details...';
  btn.disabled = true;

  // If running directly as local file:/// instead of http://localhost, use standard POST
  if (window.location.protocol === 'file:') {
    form.submit();
    return;
  }

  const formData = new FormData(form);

  fetch('https://formsubmit.co/ajax/darshandayanand599@gmail.com', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
  .then(result => {
    if (result.success === true || result.success === "true") {
      btn.textContent = '✓ Request Received! Redirecting...';
      btn.style.backgroundColor = '#10b981';

      // Store submission flag in session
      sessionStorage.setItem('lead_submitted', 'true');

      // Redirect to Thank You page for Conversion Tracking
      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 400);
    } else {
      // FormSubmit standard submit fallback
      form.submit();
    }
  })
  .catch(error => {
    console.error('Submission fallback:', error);
    form.submit();
  });
}

/* --------------------------------------------------------------------------
   7. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !mainNav) return;

  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   8. HIGH-PERFORMANCE INTERSECTION OBSERVER SCROLL REVEAL & SPIROGRAPH ROTATION
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const autoTargets = [
    '.hero-content',
    '.hero-cta-wrapper',
    '.filter-bar',
    '.project-card',
    '.section-heading-large',
    '.editorial-story-block',
    '.story-callout-card',
    '.clarity-card',
    '.vision-hero-card',
    '.vision-point',
    '.build-statement-card',
    '.accordion-item',
    '.q-flow-item',
    '.process-dark-section',
    '.process-orbital-stage',
    '.capability-card',
    '.target-badge',
    '.useful-when-box',
    '.pricing-card',
    '.pricing-guarantee-card',
    '.faq-layout',
    '.footer-cta-card'
  ];

  autoTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll', 'reveal-up');
        if (el.parentElement && (
            el.parentElement.classList.contains('clarity-grid') || 
            el.parentElement.classList.contains('vision-points-grid') ||
            el.parentElement.classList.contains('capabilities-grid') ||
            el.parentElement.classList.contains('pricing-cards-grid') ||
            el.parentElement.classList.contains('questions-flow-grid') ||
            el.parentElement.classList.contains('target-badges-cloud') ||
            el.parentElement.classList.contains('portfolio-carousel-track')
        )) {
          el.parentElement.classList.add('stagger-parent');
        }
      }
    });
  });

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // Dynamic Spirograph Rotation on Scroll
  const spirographs = document.querySelectorAll('.spirograph-svg');
  if (spirographs.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      spirographs.forEach((spiro, idx) => {
        const speed = (idx % 2 === 0) ? 0.04 : -0.04;
        spiro.style.transform = `rotate(${scrollY * speed}deg)`;
      });
    }, { passive: true });
  }
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE ANIMATED ABSTRACT GEOMETRIC CANVAS OBJECT (HERO BACKGROUND)
   -------------------------------------------------------------------------- */
function initHeroCanvasObject() {
  const canvas = document.getElementById('heroAbstractCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  let rotation = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  if (!window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 25;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 25;
    }, { passive: true });
  }

  function draw() {
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;
    rotation += 0.0035;

    ctx.clearRect(0, 0, width, height);

    if (width === 0 || height === 0) {
      requestAnimationFrame(draw);
      return;
    }

    const centerX = width / 2 + targetX;
    const centerY = height / 2 + targetY;
    const maxRadius = Math.min(width, height) * 0.44;
    const numPetals = 16;

    ctx.save();
    ctx.translate(centerX, centerY);

    // Multi-layered geometric iris petals
    for (let i = 0; i < numPetals; i++) {
      const angle = (i * Math.PI * 2) / numPetals + rotation;
      ctx.save();
      ctx.rotate(angle);

      // Outer delicate ellipse
      ctx.beginPath();
      ctx.ellipse(maxRadius * 0.38, 0, maxRadius * 0.38, maxRadius * 0.16, 0, 0, Math.PI * 2);
      ctx.strokeStyle = (i % 2 === 0) ? 'rgba(255, 56, 35, 0.42)' : 'rgba(240, 192, 186, 0.65)';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Inner orbiting ring
      ctx.beginPath();
      ctx.arc(maxRadius * 0.22, 0, maxRadius * 0.12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 56, 35, 0.2)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Pulsing node glow point
      const pulse = 3 + Math.sin(rotation * 4 + i) * 1.5;
      ctx.beginPath();
      ctx.arc(maxRadius * 0.58, 0, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#ff3823';
      ctx.shadowColor = 'rgba(255, 56, 35, 0.8)';
      ctx.shadowBlur = 6;
      ctx.fill();

      ctx.restore();
    }

    // Outer framing ring
    ctx.beginPath();
    ctx.arc(0, 0, maxRadius * 0.74, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 56, 35, 0.18)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center core iris
    ctx.beginPath();
    ctx.arc(0, 0, maxRadius * 0.18, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff3823';
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.restore();

    requestAnimationFrame(draw);
  }

  draw();
}


