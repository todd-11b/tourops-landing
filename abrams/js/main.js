/* ============================================================
   ABRAMS FENCE COMPANY — Main JavaScript
   Premium Redesign
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Sticky Header ---
  const header = document.getElementById('header');
  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader);
  updateHeader();

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.accordion__trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      const item = this.parentElement;
      const content = item.querySelector('.accordion__content');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.accordion__item').forEach(function(i) {
        i.classList.remove('open');
        i.querySelector('.accordion__content').style.maxHeight = null;
      });

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

  // --- Estimator ---
  var lengthSlider = document.getElementById('fenceLength');
  var lengthValue = document.getElementById('fenceLengthValue');
  var priceDisplay = document.getElementById('estimatePrice');

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
    baseTotal += gates * 350;
    if (removeOld) baseTotal += length * 3;
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

  document.querySelectorAll('.estimator__options').forEach(function(group) {
    group.querySelectorAll('.estimator__option').forEach(function(btn) {
      btn.addEventListener('click', function() {
        group.querySelectorAll('.estimator__option').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        calculateEstimate();
      });
    });
  });

  var removeOld = document.getElementById('removeOld');
  var slopedYard = document.getElementById('slopedYard');
  if (removeOld) removeOld.addEventListener('change', calculateEstimate);
  if (slopedYard) slopedYard.addEventListener('change', calculateEstimate);

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

      setTimeout(function() {
        btn.textContent = 'Quote Requested ✓';
        btn.style.background = '#22c55e';
        setTimeout(function() {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          estimateForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Scroll Reveal Animations ---
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  // Observe all elements with the reveal class (added in HTML)
  document.querySelectorAll('.reveal, .section-text-center').forEach(function(el) {
    revealObserver.observe(el);
  });

});
