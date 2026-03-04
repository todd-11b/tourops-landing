/* ============================================================
   ABRAMS FENCE COMPANY — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Sticky Header Background ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.accordion__trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      const item = this.parentElement;
      const content = item.querySelector('.accordion__content');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion__item').forEach(function(i) {
        i.classList.remove('open');
        i.querySelector('.accordion__content').style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Gallery Filter ---
  document.querySelectorAll('.gallery-filter').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.gallery-filter').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.getAttribute('data-filter');

      document.querySelectorAll('.gallery-item').forEach(function(item) {
        if (filter === 'all' || item.getAttribute('data-type') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- Lightbox ---
  var lightbox = document.getElementById('lightbox');
  var lightboxContent = document.getElementById('lightboxContent');

  document.querySelectorAll('.gallery-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var imgEl = item.querySelector('.gallery-item__image');
      var label = imgEl.querySelector('span').textContent;
      var bgStyle = imgEl.getAttribute('style');
      lightboxContent.innerHTML = '<div style="width:80vw;max-width:900px;height:60vh;border-radius:10px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);font-size:16px;' + bgStyle + '">' + label + '</div>';
      lightbox.classList.add('open');
    });
  });

  if (lightbox) {
    lightbox.querySelector('.lightbox__close').addEventListener('click', function() {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // --- Estimator ---
  var lengthSlider = document.getElementById('fenceLength');
  var lengthValue = document.getElementById('fenceLengthValue');
  var priceDisplay = document.getElementById('estimatePrice');

  // Base prices per linear foot
  var basePrices = {
    wood:      { 4: 18, 6: 25, 8: 34 },
    vinyl:     { 4: 22, 6: 30, 8: 42 },
    aluminum:  { 4: 28, 6: 38, 8: 50 },
    chainlink: { 4: 12, 6: 16, 8: 22 }
  };

  function getActiveValue(groupId) {
    var el = document.querySelector('#' + groupId + ' .estimator__option.active');
    return el ? el.getAttribute('data-value') : null;
  }

  function calculateEstimate() {
    var length = parseInt(lengthSlider.value);
    var height = parseInt(getActiveValue('fenceHeight') || '6');
    var material = getActiveValue('fenceMaterial') || 'wood';
    var gates = parseInt(getActiveValue('gateCount') || '1');
    var removeOld = document.getElementById('removeOld').checked;
    var sloped = document.getElementById('slopedYard').checked;

    var pricePerFoot = basePrices[material][height] || 25;
    var baseTotal = length * pricePerFoot;

    // Gate cost
    baseTotal += gates * 350;

    // Removal surcharge
    if (removeOld) baseTotal += length * 3;

    // Slope surcharge
    if (sloped) baseTotal *= 1.15;

    var low = Math.round(baseTotal * 0.85 / 100) * 100;
    var high = Math.round(baseTotal * 1.15 / 100) * 100;

    priceDisplay.textContent = '$' + low.toLocaleString() + ' – $' + high.toLocaleString();
  }

  if (lengthSlider) {
    lengthSlider.addEventListener('input', function() {
      lengthValue.textContent = this.value;
      calculateEstimate();
    });
  }

  // Option buttons (height, material, gates)
  document.querySelectorAll('.estimator__options').forEach(function(group) {
    group.querySelectorAll('.estimator__option').forEach(function(btn) {
      btn.addEventListener('click', function() {
        group.querySelectorAll('.estimator__option').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        calculateEstimate();
      });
    });
  });

  // Toggle checkboxes
  var removeOld = document.getElementById('removeOld');
  var slopedYard = document.getElementById('slopedYard');
  if (removeOld) removeOld.addEventListener('change', calculateEstimate);
  if (slopedYard) slopedYard.addEventListener('change', calculateEstimate);

  // Initial calculation
  calculateEstimate();

  // --- Estimate Form ---
  var estimateForm = document.getElementById('estimateForm');
  if (estimateForm) {
    estimateForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('.btn');
      var originalText = btn.textContent;
      btn.textContent = 'Submitting...';
      btn.disabled = true;

      // Simulate submission (replace with actual form handler)
      setTimeout(function() {
        btn.textContent = 'Quote Requested!';
        btn.style.background = '#2E7D4F';
        setTimeout(function() {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          estimateForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Scroll Animations ---
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .split__text, .split__visual, .comparison__col, .process-step, .style-card, .review-card, .timeline__row').forEach(function(el) {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

});
