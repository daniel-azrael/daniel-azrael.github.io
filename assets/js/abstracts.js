// Abstract toggle for the research cards.
//
// The abstract of each paper already lives in the thumbnail's pop-up caption
// (data-caption), so each panel is filled from there rather than storing a
// second copy of the text in the HTML: one source, no drift.
//
// Opening reserves the space first: the panel takes its full height, the masonry
// is re-laid out so the cards below move immediately, and only then does the
// text fade in. Animating the panel's height first, and re-laying out at the
// end, leaves the text overlapping the cards underneath while it grows.
//
// The arrow is drawn in CSS and rotates on its own, so the script only tracks
// the state of the button.

$(function () {
  // Fill the panels once, on load, so the text is in the DOM before anyone clicks.
  $('.c-abstract-panel').each(function () {
    var $panel = $(this);
    var caption = $panel.closest('.grid-item').find('.img-place').data('caption') || '';
    var match = caption.match(/<p>([\s\S]*?)<\/p>/);
    if (match) {
      $panel.html('<p>' + match[1] + '</p>');
    }
  });

  $('.c-abstract-toggle').on('click', function () {
    var $btn = $(this);
    var $panel = $('#' + $btn.data('target'));
    var isOpen = $btn.hasClass('is-active');

    if (isOpen) {
      // Fade the text out first, keeping the space, then take the space back.
      $panel.stop(true, true).animate({ opacity: 0 }, 120, function () {
        $panel.css({ display: 'none', height: 'auto', opacity: 1 });
        $('.gridder').isotope('layout');
      });
    } else {
      // Create the space, move the other cards, and only then reveal the text.
      $panel.stop(true, true).css({ display: 'block', height: 'auto', opacity: 0 });
      $('.gridder').isotope('layout');
      $panel.animate({ opacity: 1 }, 160);
    }

    $btn.toggleClass('is-active', !isOpen);
    $btn.attr('aria-expanded', isOpen ? 'false' : 'true');
  });
});
