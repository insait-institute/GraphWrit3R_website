/* GraphWrit3R — "Signature"
   Section scroll-spy, BibTeX copy and Cite button. No dependencies. */
(function () {
  'use strict';

  /* --- scroll-spy -------------------------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (targets.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* --- copy bibtex ------------------------------------------------------- */
  function bibtex() {
    var code = document.querySelector('.bibtex-wrap code');
    return code ? code.textContent : '';
  }

  function copyText(text, done) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }

    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  var copy = document.getElementById('copy-bibtex');
  if (copy) {
    copy.addEventListener('click', function () {
      copyText(bibtex(), function () {
        copy.textContent = 'Copied';
        setTimeout(function () { copy.textContent = 'Copy'; }, 1200);
      });
    });
  }

  /* --- cite button (hero) ------------------------------------------------ */
  var cite = document.getElementById('cite-bibtex');
  if (cite) {
    var status = cite.querySelector('[role="status"]');
    var reset;
    cite.addEventListener('click', function () {
      copyText(bibtex(), function () {
        clearTimeout(reset);
        // Restart the pulse even on rapid repeat clicks.
        cite.classList.remove('is-copied');
        void cite.offsetWidth;
        cite.classList.add('is-copied');
        if (status) status.textContent = 'BibTeX citation copied to clipboard';
        reset = setTimeout(function () {
          cite.classList.remove('is-copied');
          if (status) status.textContent = '';
        }, 1800);
      });
    });
  }
})();
