// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});
// Need this to show animation when go back in browser
window.onunload = function() {};
// If a page is restored from the back/forward cache (or a link opened in a
// new tab), make sure it isn't left faded out / blank.
// ---------------------------------------------------------------------------
// Blob page transitions. Every time, a new random animation is generated:
// random blob shapes, uneven squish, a little tilt and drift, varied timing,
// and an elastic wobble when the page grows back in.
// ---------------------------------------------------------------------------
var BlobTransition = (function() {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnimate = !reduceMotion && typeof Element !== 'undefined' && Element.prototype.animate;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick() { return Math.round(rnd(28, 72)); }
  // A random organic blob: opposite corners are complementary so the outline stays smooth
  function blobRadius() {
    var a = pick(), b = pick(), c = pick(), d = pick();
    return a + '% ' + (100 - a) + '% ' + c + '% ' + (100 - c) + '% / ' +
           b + '% ' + d + '% ' + (100 - d) + '% ' + (100 - b) + '%';
  }
  function target() {
    var panel = document.querySelector('body.panel-page .wrapper');
    if (panel) return { el: panel, isPanel: true };
    var home = document.querySelector('.header .container');
    return home ? { el: home, isPanel: false } : null;
  }
  function show(el) { el.classList.add('blob-in'); }

  // Page arrives: grows out of a tiny random blob, overshoots, wobbles, settles
  function arrive() {
    var t = target(); if (!t) return;
    if (!canAnimate || window.innerWidth <= 480) { show(t.el); return; }
    var el = t.el, r = rnd(-12, 12), tx = rnd(-6, 6), ty = rnd(-5, 5);
    el.style.transition = 'none';   // don't let the old CSS transition smear the pivot point
    el.style.transformOrigin = rnd(35, 65) + '% ' + rnd(35, 65) + '%';
    var f0 = { offset: 0, opacity: 0,
               transform: 'translate(' + tx + 'vw,' + ty + 'vh) rotate(' + r + 'deg) scale(' + rnd(0.03, 0.08) + ',' + rnd(0.04, 0.1) + ')' };
    var f1 = { offset: 0.14, opacity: 1 };
    var f2 = { offset: rnd(0.48, 0.58),
               transform: 'translate(' + (-tx * 0.12) + 'vw,' + (-ty * 0.12) + 'vh) rotate(' + (-r * 0.25) + 'deg) scale(' + rnd(1.03, 1.06) + ',' + rnd(0.93, 0.97) + ')' };
    var f3 = { offset: rnd(0.72, 0.82),
               transform: 'rotate(' + (r * 0.07) + 'deg) scale(' + rnd(0.98, 0.995) + ',' + rnd(1.01, 1.03) + ')' };
    var f4 = { offset: 1, opacity: 1, transform: 'none' };
    if (t.isPanel) {
      f0.borderRadius = blobRadius();
      f2.borderRadius = blobRadius();
      f3.borderRadius = '5rem';
      f4.borderRadius = '2.5rem';
    }
    el.animate([f0, f1, f2, f3, f4], {
      duration: rnd(720, 920),
      easing: 'cubic-bezier(.25,.7,.35,1)',
      fill: 'backwards'
    });
    show(el);
  }

  // Page leaves: squishes, morphs into a random blob, and collapses toward a random point
  function leave(done) {
    var t = target();
    if (!t || !canAnimate) { done(); return; }
    var el = t.el, r = rnd(-16, 16), tx = rnd(-9, 9), ty = rnd(-7, 7);
    el.style.transition = 'none';
    el.style.transformOrigin = rnd(35, 65) + '% ' + rnd(35, 65) + '%';
    var f0 = { offset: 0, opacity: 1, transform: 'none' };
    var f1 = { offset: rnd(0.22, 0.38),
               transform: 'rotate(' + (r * 0.2) + 'deg) scale(' + rnd(0.88, 0.94) + ',' + rnd(1.01, 1.05) + ')' };
    var f2 = { offset: 0.85, opacity: 1 };
    var f3 = { offset: 1, opacity: 0,
               transform: 'translate(' + tx + 'vw,' + ty + 'vh) rotate(' + r + 'deg) scale(' + rnd(0.02, 0.06) + ',' + rnd(0.03, 0.07) + ')' };
    if (t.isPanel) {
      f0.borderRadius = '2.5rem';
      f1.borderRadius = blobRadius();
      f3.borderRadius = blobRadius();
    }
    var dur = rnd(420, 540);
    var anim = el.animate([f0, f1, f2, f3], { duration: dur, easing: 'cubic-bezier(.55,0,.75,.35)', fill: 'forwards' });
    var called = false;
    function finish() { if (!called) { called = true; done(); } }
    anim.onfinish = finish;
    setTimeout(finish, dur + 150);   // safety net
  }

  // Coming back via the browser's Back button: clear any finished "leave" animation
  function reset() {
    var t = target(); if (!t) return;
    if (t.el.getAnimations) t.el.getAnimations().forEach(function(a) { if (a.effect && a.effect.getComputedTiming().fill === 'forwards') a.cancel(); });
    show(t.el);
  }

  return { arrive: arrive, leave: leave, reset: reset, enabled: canAnimate };
})();

BlobTransition.arrive();
window.addEventListener('pageshow', function(e) { if (e.persisted) BlobTransition.reset(); });

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// FitVids options
$(function() {
  $(".content").fitVids();
});

// All others
$(document).ready(function() {
    // Nav clicks: play the random shrink, then go to the next page
    $(document).on('click', 'a.zoombtn', function(e) {
        var href = this.href;
        // let the browser handle new tabs, modifier-clicks, and same-page links normally
        if (!href || this.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (href === window.location.href) { e.preventDefault(); return; }
        if (!BlobTransition.enabled) return;
        e.preventDefault();
        BlobTransition.leave(function() { window.location.href = href; });
    });
    // go up button
    $.goup({
        trigger: 500,
        bottomOffset: 10,
        locationOffset: 20,
        containerRadius: 0,
        containerColor: '#fff',
        arrowColor: '#000',
        goupSpeed: 'normal'
    });
	$('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open. 
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});
