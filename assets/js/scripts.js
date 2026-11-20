// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});
// Need this to show animation when go back in browser
window.onunload = function() {};
// ---------------------------------------------------------------------------
// Blob page transitions.
// Arriving: every page starts as a homepage-sized blob, wobbles for a beat,
// then unfurls into the full panel while the text grows to full size.
// Leaving: the panel curls back up into a blob and the text shrinks away,
// so the next page picks up from the same blob.
// Each time the blob's shape, size, tilt, and timing are randomized.
// ---------------------------------------------------------------------------
var BlobTransition = (function() {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsClip = window.CSS && CSS.supports && CSS.supports('clip-path', 'inset(1px round 1px)');
  var canAnimate = !reduceMotion && typeof Element !== 'undefined' && !!Element.prototype.animate;
  var PANEL_RADIUS = 40; // px; matches border-radius: 2.5rem in site.scss

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick() { return rnd(28, 72); }
  // Random organic blob as pixel radii for a bw x bh box
  // (opposite corners are complementary so the outline stays smooth)
  function blobRadiusPx(bw, bh) {
    var a = pick(), b = pick(), c = pick(), d = pick();
    function px(p, size) { return (p / 100 * size).toFixed(1) + 'px'; }
    return [px(a, bw), px(100 - a, bw), px(c, bw), px(100 - c, bw)].join(' ') + ' / ' +
           [px(b, bh), px(d, bh), px(100 - d, bh), px(100 - b, bh)].join(' ');
  }
  function clip(iy, ix, radius) {
    return 'inset(' + iy.toFixed(1) + 'px ' + ix.toFixed(1) + 'px ' + iy.toFixed(1) + 'px ' + ix.toFixed(1) + 'px round ' + radius + ')';
  }
  var FULL_RADIUS = [PANEL_RADIUS, PANEL_RADIUS, PANEL_RADIUS, PANEL_RADIUS].join('px ') + 'px / ' +
                    [PANEL_RADIUS, PANEL_RADIUS, PANEL_RADIUS, PANEL_RADIUS].join('px ') + 'px';

  function target() {
    var panel = document.querySelector('body.panel-page .wrapper');
    if (panel) return { el: panel, inner: panel.querySelector('.content'), isPanel: true };
    var home = document.querySelector('.header .container');
    return home ? { el: home, inner: home.querySelector('.row'), isPanel: false } : null;
  }
  function show(el) { el.classList.add('blob-in'); }
  function enabledFor(t) {
    return t && canAnimate && window.innerWidth > 480 && (!t.isPanel || supportsClip);
  }

  // Geometry of the blob that a panel starts from / curls into
  function blobGeometry(el) {
    var W = el.offsetWidth, H = el.offsetHeight;
    var bw = Math.min(W * 0.66, rnd(520, 620));
    var bh = Math.min(H * 0.8, rnd(460, 540));
    return { W: W, H: H, bw: bw, bh: bh, ix: (W - bw) / 2, iy: (H - bh) / 2,
             s: Math.min(bw / W, bh / H) * 0.92 };   // how small the text gets inside the blob
  }
  // Scale the text toward the middle of the panel (not its top edge)
  function centerOrigin(inner, el) {
    var y = el.offsetHeight / 2 - inner.offsetTop + el.scrollTop;
    inner.style.transformOrigin = '50% ' + y.toFixed(0) + 'px';
  }

  function arrive() {
    var t = target(); if (!t) return;
    if (!enabledFor(t)) { show(t.el); return; }
    var el = t.el, inner = t.inner, r = rnd(-7, 7);
    var dur = rnd(1000, 1250);
    el.style.transition = 'none';

    if (t.isPanel) {
      var g = blobGeometry(el);
      var hold = rnd(0.24, 0.32);                    // how long it stays a blob before unfurling
      el.animate([
        { offset: 0,    opacity: 0, transform: 'rotate(' + r + 'deg) scale(0.9)',
          clipPath: clip(g.iy, g.ix, blobRadiusPx(g.bw, g.bh)) },
        { offset: 0.1,  opacity: 1 },
        { offset: hold, transform: 'rotate(' + (r * 0.5) + 'deg) scale(1)',
          clipPath: clip(g.iy * rnd(0.94, 1.06), g.ix * rnd(0.94, 1.06), blobRadiusPx(g.bw, g.bh)) },
        { offset: rnd(0.74, 0.8), transform: 'rotate(' + (-r * 0.08) + 'deg) scale(' + rnd(1.008, 1.018) + ',' + rnd(0.988, 0.996) + ')',
          clipPath: clip(0, 0, FULL_RADIUS.replace(/40px/g, '72px')) },
        { offset: 0.9,  transform: 'scale(' + rnd(0.996, 0.999) + ',' + rnd(1.003, 1.008) + ')' },
        { offset: 1,    opacity: 1, transform: 'none', clipPath: clip(0, 0, FULL_RADIUS) }
      ], { duration: dur, easing: 'cubic-bezier(.35,.55,.3,1)', fill: 'backwards' });

      if (inner) {
        centerOrigin(inner, el);
        inner.animate([
          { offset: 0,    opacity: 0, transform: 'scale(' + (g.s * 0.85) + ')' },
          { offset: hold * 0.8, opacity: 1, transform: 'scale(' + g.s + ')' },
          { offset: hold, transform: 'scale(' + g.s + ')' },
          { offset: 0.8,  transform: 'scale(1.01)' },
          { offset: 1,    opacity: 1, transform: 'none' }
        ], { duration: dur, easing: 'cubic-bezier(.35,.55,.3,1)', fill: 'backwards' });
      }
    } else {
      // Homepage: it already is a blob, so it just pops in and the contents grow
      el.animate([
        { offset: 0,   opacity: 0, transform: 'rotate(' + r + 'deg) scale(0.9)' },
        { offset: 0.2, opacity: 1 },
        { offset: 0.65, transform: 'rotate(' + (-r * 0.1) + 'deg) scale(1.02, 0.99)' },
        { offset: 1,   opacity: 1, transform: 'none' }
      ], { duration: dur * 0.8, easing: 'cubic-bezier(.35,.55,.3,1)', fill: 'backwards' });
      if (inner) inner.animate([
        { offset: 0,   opacity: 0, transform: 'scale(0.6)' },
        { offset: 0.3, opacity: 1 },
        { offset: 1,   opacity: 1, transform: 'none' }
      ], { duration: dur * 0.8, easing: 'cubic-bezier(.35,.55,.3,1)', fill: 'backwards' });
    }
    show(el);
  }

  function leave(done) {
    var t = target();
    if (!enabledFor(t)) { done(); return; }
    var el = t.el, inner = t.inner, r = rnd(-7, 7);
    var dur = rnd(520, 650), anims = [];
    el.style.transition = 'none';

    if (t.isPanel) {
      var g = blobGeometry(el);
      anims.push(el.animate([
        { offset: 0,   transform: 'none', clipPath: clip(0, 0, FULL_RADIUS) },
        { offset: 0.3, transform: 'scale(' + rnd(0.99, 0.996) + ',' + rnd(1.004, 1.01) + ')',
          clipPath: clip(g.H * 0.04, g.W * 0.04, FULL_RADIUS.replace(/40px/g, '90px')) },
        { offset: 0.75, transform: 'rotate(' + (r * 0.5) + 'deg) scale(1)',
          clipPath: clip(g.iy, g.ix, blobRadiusPx(g.bw, g.bh)) },
        { offset: 1,   transform: 'rotate(' + r + 'deg) scale(0.9)',
          clipPath: clip(g.iy * rnd(0.94, 1.06), g.ix * rnd(0.94, 1.06), blobRadiusPx(g.bw, g.bh)) }
      ], { duration: dur, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'forwards' }));
      if (inner) {
        centerOrigin(inner, el);
        anims.push(inner.animate([
          { offset: 0,    opacity: 1, transform: 'none' },
          { offset: 0.7,  opacity: 1, transform: 'scale(' + g.s + ')' },
          { offset: 1,    opacity: 0, transform: 'scale(' + (g.s * 0.85) + ')' }
        ], { duration: dur, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'forwards' }));
      }
    } else {
      anims.push(el.animate([
        { offset: 0, transform: 'none' },
        { offset: 0.4, transform: 'scale(1.02, 0.99)' },
        { offset: 1, transform: 'rotate(' + r + 'deg) scale(0.9)' }
      ], { duration: dur, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'forwards' }));
      if (inner) anims.push(inner.animate([
        { offset: 0, opacity: 1, transform: 'none' },
        { offset: 1, opacity: 0, transform: 'scale(0.6)' }
      ], { duration: dur, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'forwards' }));
    }
    var called = false;
    function finish() { if (!called) { called = true; done(); } }
    anims[0].onfinish = finish;
    setTimeout(finish, dur + 150);   // safety net
  }

  // Coming back via the browser's Back button: clear any finished "leave" animation
  function reset() {
    var t = target(); if (!t) return;
    [t.el, t.inner].forEach(function(node) {
      if (node && node.getAnimations) node.getAnimations().forEach(function(a) {
        if (a.effect && a.effect.getComputedTiming().fill === 'forwards') a.cancel();
      });
    });
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
