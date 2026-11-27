// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});
// Need this to show animation when go back in browser
window.onunload = function() {};
// Page transitions are handled by the browser (View Transitions, see site.scss).

// ---------------------------------------------------------------------------
// Homepage blob reacts to the cursor: it leans and stretches gently toward the
// mouse, and puffs up a little when you hover over it. Desktop mice/trackpads
// only; skipped for "reduce motion".
// ---------------------------------------------------------------------------
(function () {
  var blob = document.querySelector('.header .container');
  if (!blob || !window.requestAnimationFrame) return;
  var mq = window.matchMedia;
  if (mq && (mq('(prefers-reduced-motion: reduce)').matches || !mq('(pointer: fine)').matches)) return;

  var cur = { x: 0, y: 0, s: 0, h: 0 }, goal = { x: 0, y: 0, s: 0, h: 0 }, ang = 0;
  blob.style.transition = 'none';   // smoothing is done below instead

  window.addEventListener('mousemove', function (e) {
    var r = blob.getBoundingClientRect();
    var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var pull = Math.min(dist / 900, 1);               // farther away = stronger lean, up to a cap
    goal.x = (dx / dist) * pull * 14;                 // lean up to ~14px toward the cursor
    goal.y = (dy / dist) * pull * 14;
    goal.s = pull * 0.035;                            // stretch along the cursor direction
    ang = Math.atan2(dy, dx) * 180 / Math.PI;
    goal.h = (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) ? 1 : 0;
  });
  document.addEventListener('mouseleave', function () { goal.x = goal.y = goal.s = goal.h = 0; });

  (function tick() {
    var k = 0.08;                                     // easing: lower = floatier
    cur.x += (goal.x - cur.x) * k; cur.y += (goal.y - cur.y) * k;
    cur.s += (goal.s - cur.s) * k; cur.h += (goal.h - cur.h) * k;
    var puff = 1 + cur.h * 0.015;
    blob.style.transform =
      'translate(' + cur.x.toFixed(2) + 'px,' + cur.y.toFixed(2) + 'px) ' +
      'rotate(' + ang.toFixed(1) + 'deg) scale(' + ((1 + cur.s) * puff).toFixed(4) + ',' + ((1 - cur.s * 0.6) * puff).toFixed(4) + ') rotate(' + (-ang).toFixed(1) + 'deg)';
    requestAnimationFrame(tick);
  })();
})();


// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// FitVids options
$(function() {
  $(".content").fitVids();
});

// All others
$(document).ready(function() {
    // Clicking the tab you're already on does nothing
    $(document).on('click', 'a.zoombtn', function(e) {
        if (this.href === window.location.href) e.preventDefault();
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
