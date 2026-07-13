(function () {
  'use strict';

  /* ===== SHARED SCROLL LOCK (mobile menu + lightbox can each hold a lock;
     body only unlocks once every overlay that requested a lock has released it) ===== */
  var openOverlays = 0;
  function lockScroll() {
    openOverlays++;
    document.body.style.overflow = 'hidden';
  }
  function unlockScroll() {
    openOverlays = Math.max(0, openOverlays - 1);
    if (openOverlays === 0) document.body.style.overflow = '';
  }

  /* ===== MOBILE NAV TOGGLE ===== */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    unlockScroll();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.classList.toggle('open', !isOpen);
      if (isOpen) { unlockScroll(); } else { lockScroll(); }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ===== STICKY HEADER SHADOW ===== */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===== ACTIVE NAV LINK + SCROLL REVEAL ===== */
  var navLinks = document.querySelectorAll('.main-nav a');
  var sections = document.querySelectorAll('main section[id]');
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('in-view');
          }, i * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(function (section) { navObserver.observe(section); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ===== FAQ ACCORDION (single-open) ===== */
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (button) {
    button.addEventListener('click', function () {
      var isOpen = button.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(button.getAttribute('aria-controls'));

      faqQuestions.forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
        if (otherPanel) otherPanel.hidden = true;
        other.closest('.faq-item').classList.remove('open');
      });

      if (!isOpen) {
        button.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        button.closest('.faq-item').classList.add('open');
      }
    });
  });

  /* ===== REVIEWS CAROUSEL (mobile) ===== */
  var reviewsGrid = document.querySelector('.reviews-grid');
  var reviewsDots = document.querySelectorAll('.reviews-dots button');
  if (reviewsGrid && reviewsDots.length) {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    reviewsDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        var card = reviewsGrid.children[i];
        if (card) {
          reviewsGrid.scrollTo({ left: card.offsetLeft, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });

    var updateActiveDot = function () {
      var index = Math.round(reviewsGrid.scrollLeft / reviewsGrid.clientWidth);
      reviewsDots.forEach(function (dot, i) {
        if (i === index) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    };
    reviewsGrid.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateActiveDot);
    }, { passive: true });
  }

  /* ===== TODAY'S HOURS HIGHLIGHT (America/Toronto) ===== */
  var hoursTable = document.getElementById('hours-table');
  if (hoursTable) {
    var todayInToronto = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })
    ).getDay();
    var todayRow = hoursTable.querySelector('tr[data-day="' + todayInToronto + '"]');
    if (todayRow) todayRow.classList.add('today');
  }

  /* ===== DYNAMIC FOOTER YEAR ===== */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== STICKY MOBILE CALL BAR ===== */
  var callBar = document.getElementById('mobile-call-bar');
  var lastScrollY = window.scrollY;
  function onCallBarScroll() {
    if (!callBar) return;
    var currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      callBar.style.transform = 'translateY(100%)';
    } else {
      callBar.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
  }
  window.addEventListener('scroll', onCallBarScroll, { passive: true });
  if (callBar) callBar.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1)';

  /* ===== NAV DROPDOWN (aria-expanded kept in sync with the CSS :hover/:focus-within
     that actually shows the menu, so screen readers never announce a state the
     menu isn't actually in) ===== */
  document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
    var trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;
    var setExpanded = function (val) { trigger.setAttribute('aria-expanded', String(val)); };
    dropdown.addEventListener('mouseenter', function () { setExpanded(true); });
    dropdown.addEventListener('mouseleave', function () { setExpanded(false); });
    dropdown.addEventListener('focusin', function () { setExpanded(true); });
    dropdown.addEventListener('focusout', function (e) {
      if (!dropdown.contains(e.relatedTarget)) setExpanded(false);
    });
  });

  /* ===== LIGHTBOX (used on service pages + gallery.html; no-op if .lightbox absent) ===== */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var lightboxClose = lightbox.querySelector('.lightbox__close');
    var lastOpener = null;

    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      var activate = function () {
        var img = item.querySelector('img');
        if (!img) return;
        lastOpener = item;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.classList.add('is-open');
        lockScroll();
        lightboxClose.focus();
      };
      item.addEventListener('click', activate);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });

    var closeLightbox = function () {
      lightbox.classList.remove('is-open');
      unlockScroll();
      if (lastOpener) lastOpener.focus();
    };
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  /* ===== QUOTE FORM VALIDATION ===== */
  /* Real-time inline validation: validates on blur, clears on input so
     errors disappear as the visitor corrects them. */
  var form = document.querySelector('.quote-form');
  if (form) {
    var isValidEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); };
    var isValidPhone = function (v) { return /[\d\s\(\)\-\+]{7,}/.test(v.trim()); };
    var isEmpty = function (v) { return v.trim().length === 0; };

    var getErrorEl = function (input) {
      var wrapper = input.closest('.form-group') || input.parentElement;
      return wrapper.querySelector('.form-error');
    };
    var setError = function (input, msg) {
      var errEl = getErrorEl(input);
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('is-error');
      input.classList.remove('is-valid');
      if (errEl) {
        errEl.textContent = msg;
        errEl.style.display = 'block';
      }
    };
    var clearError = function (input) {
      var errEl = getErrorEl(input);
      input.removeAttribute('aria-invalid');
      input.classList.remove('is-error');
      input.classList.add('is-valid');
      if (errEl) errEl.style.display = 'none';
    };

    var validateField = function (input) {
      var id = input.id;
      var val = input.value;

      if (id === 'name') {
        if (isEmpty(val)) { setError(input, 'Please enter your full name.'); return false; }
        if (val.trim().length < 2) { setError(input, 'Name must be at least 2 characters.'); return false; }
      }
      if (id === 'phone') {
        if (isEmpty(val)) { setError(input, 'Please enter your phone number.'); return false; }
        if (!isValidPhone(val)) { setError(input, 'Please enter a valid phone number.'); return false; }
      }
      if (id === 'email') {
        if (isEmpty(val)) { setError(input, 'Please enter your email address.'); return false; }
        if (!isValidEmail(val)) { setError(input, 'Please enter a valid email (e.g. name@example.com).'); return false; }
      }
      if (id === 'details') {
        if (isEmpty(val)) { setError(input, 'Please describe your project.'); return false; }
        if (val.trim().length < 10) { setError(input, 'Please provide a bit more detail.'); return false; }
      }

      clearError(input);
      return true;
    };

    var required = form.querySelectorAll('[required]');
    required.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-error')) validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      var allValid = true;
      required.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });
      if (!allValid) {
        e.preventDefault();
        var firstError = form.querySelector('.is-error');
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

})();
