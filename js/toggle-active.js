$(document).ready(() => {
  function toggleActiveState () {
    let target = $(this).data('jsToggleActiveTrigger');
    let activeClass = 'active';

    if (target) {
      $('[data-js-toggle-active-target=' + target + ']').toggleClass(activeClass);

      if($('[data-js-toggle-active-target=' + target + ']').hasClass(activeClass)) {
        $(this).addClass(activeClass);
      } else {
        $(this).removeClass(activeClass);
      }
    }
  }

  $('input[type=checkbox][data-js-toggle-active-trigger]').change(toggleActiveState);
  $('[data-js-toggle-active-trigger]:not(input[type=checkbox])').click(toggleActiveState);
});
