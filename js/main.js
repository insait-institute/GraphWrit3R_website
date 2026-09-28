/* GraphWrit3R — "Signature"
   Section scroll-spy and BibTeX copy. No dependencies. */
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
  var copy = document.getElementById('copy-bibtex');
  if (copy) {
    copy.addEventListener('click', function () {
      var code = document.querySelector('.bibtex-wrap code');
      if (!code) return;
      var text = code.textContent;

      var done = function () {
        copy.textContent = 'Copied';
        setTimeout(function () { copy.textContent = 'Copy'; }, 1200);
      };

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
    });
  }
})();
