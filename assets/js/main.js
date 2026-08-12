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

  /* ===== FOCUS TRAP (shared by the mobile menu and the lightbox) =====
     Keeps Tab inside an open overlay. Returns a function that removes it. */
  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function trapFocus(container) {
    function onKeydown(e) {
      if (e.key !== 'Tab') return;
      /* getClientRects, not offsetParent: offsetParent is null for
         position:fixed elements, which silently emptied this list for the
         lightbox and disabled the trap entirely. */
      var items = Array.prototype.filter.call(
        container.querySelectorAll(FOCUSABLE),
        function (el) { return el.getClientRects().length > 0; }
      );
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      /* If focus never landed inside (e.g. .focus() ran before the overlay
         finished becoming visible), pull it in rather than letting Tab escape. */
      if (!container.contains(document.activeElement)) {
        e.preventDefault(); first.focus(); return;
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
    document.addEventListener('keydown', onKeydown);
    return function () { document.removeEventListener('keydown', onKeydown); };
  }

  /* ===== MOBILE NAV TOGGLE ===== */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var releaseMenuTrap = null;

  function closeMenu() {
    if (hamburger.getAttribute('aria-expanded') !== 'true') return;
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    if (releaseMenuTrap) { releaseMenuTrap(); releaseMenuTrap = null; }
    unlockScroll();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
        hamburger.focus();
      } else {
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('open');
        lockScroll();
        releaseMenuTrap = trapFocus(mobileMenu);
        var firstLink = mobileMenu.querySelector('a[href]');
        if (firstLink) firstLink.focus();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
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

  /* ===== NAV DROPDOWN =====
     The menu shows on CSS :hover/:focus-within for pointer and keyboard users.
     Touch has neither, so the trigger also toggles an .is-open class; without
     it the first tap on a touch device did nothing at all. aria-expanded is
     kept in sync with whichever path opened the menu. */
  document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
    var trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;
    var setExpanded = function (val) {
      trigger.setAttribute('aria-expanded', String(val));
      dropdown.classList.toggle('is-open', val);
    };
    /* Only wire the hover path on devices that actually hover. On touch, a tap
       fires mouseenter first, which set aria-expanded="true" and made the
       click handler immediately toggle it back off, so the menu never opened. */
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      setExpanded(!dropdown.classList.contains('is-open'));
    });
    if (canHover) {
      dropdown.addEventListener('mouseenter', function () { setExpanded(true); });
      dropdown.addEventListener('mouseleave', function () { setExpanded(false); });
    }
    dropdown.addEventListener('focusin', function () { setExpanded(true); });
    dropdown.addEventListener('focusout', function (e) {
      if (!dropdown.contains(e.relatedTarget)) setExpanded(false);
    });
    dropdown.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dropdown.classList.contains('is-open')) {
        setExpanded(false);
        trigger.focus();
      }
    });
    /* Tapping elsewhere closes an open menu on touch. */
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) setExpanded(false);
    });
  });

  /* ===== LIGHTBOX (used on service pages + gallery.html; no-op if .lightbox absent) ===== */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var lightboxClose = lightbox.querySelector('.lightbox__close');
    var lastOpener = null;
    var releaseLightboxTrap = null;

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
        releaseLightboxTrap = trapFocus(lightbox);
        lightboxClose.focus();
      };
      item.addEventListener('click', activate);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });

    var closeLightbox = function () {
      lightbox.classList.remove('is-open');
      if (releaseLightboxTrap) { releaseLightboxTrap(); releaseLightboxTrap = null; }
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
      e.preventDefault();

      var allValid = true;
      required.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });
      if (!allValid) {
        var firstError = form.querySelector('.is-error');
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      /* No backend: build a pre-filled email to the business and open the
         visitor's mail app. The visitor still has to press Send. */
      var to = form.getAttribute('data-mailto');
      var getVal = function (id) {
        var el = form.querySelector('#' + id);
        return el ? el.value.trim() : '';
      };
      var serviceEl = form.querySelector('#service');
      var serviceLabel = serviceEl && serviceEl.selectedIndex > 0
        ? serviceEl.options[serviceEl.selectedIndex].text
        : 'Not specified';

      var subject = 'New Quote Request | MLH Drywall Taping Painting';
      var body =
        'Name: ' + getVal('name') + '\n' +
        'Phone: ' + getVal('phone') + '\n' +
        'Email: ' + getVal('email') + '\n' +
        'Service Needed: ' + serviceLabel + '\n\n' +
        'Project Details:\n' + getVal('details') + '\n';

      var mailto = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      var success = form.querySelector('.form-success');
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

})();
