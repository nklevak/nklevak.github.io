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
window.addEventListener('pageshow', function() {
  $(".container, .wrapper").removeClass("fadeOut panel-leaving blob-leaving");
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// FitVids options
$(function() {
  $(".content").fitVids();
});

// All others
$(document).ready(function() {
    // Blob transition: when you click a nav link, the panel/blob shrinks back
    // into a blob, then the next page's panel grows out of a blob (see site.scss).
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $(document).on('click', 'a.zoombtn', function(e) {
        var href = this.href;
        // let the browser handle new tabs, modifier-clicks, and same-page links normally
        if (!href || this.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (href === window.location.href) { e.preventDefault(); return; }
        if (reduceMotion) return;
        e.preventDefault();
        $(".wrapper").addClass("panel-leaving");
        $(".container").addClass("blob-leaving");
        setTimeout(function() { window.location.href = href; }, 320);
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
