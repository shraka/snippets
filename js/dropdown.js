// For a collapse / accordion element
// Note: Fussy linting, don't use end lines

import $ from 'jquery'

$(document).on('turbolinks:load', function (e) {
  const containerDataLabel = 'js-dropdown'
  const triggerDataLabel = 'js-dropdown-trigger'
  const targetDataLabel = 'js-dropdown-target'
  // Put on the trigger
  const closeableDataLabel = '[data-js-dropdown-closeable]'
  const activeClass = 'active'
  const transitionSpeed = '180ms'

  const $trigger = $(`[data-${triggerDataLabel}]`)
  const $target = $(`[data-${targetDataLabel}]`)

  function openDropdownMenu(thisElement, e) {
    e.stopPropagation()
    closeAllDropdownMenus(true)

    if (!$(thisElement).hasClass(activeClass)) {
      $(thisElement).addClass(activeClass).attr('aria-expanded', 'true')
      $(`[data-${targetDataLabel}=${$(thisElement).data(triggerDataLabel)}]`)
        .addClass(activeClass)
        .stop()
        .slideDown(transitionSpeed)
    }
  }
  function closeAllDropdownMenus(soft = false) {
    if (soft !== true) {
      $trigger.closest(`[data-${containerDataLabel}`).removeClass(activeClass)
    }
    $trigger.removeClass(activeClass).attr('aria-expanded', 'false')
    $target.removeClass(activeClass).stop().slideUp(transitionSpeed)
  }

  function handleClickDropdownMenu(e) {
    if ($(this).is(closeableDataLabel)) {
      if ($(this).hasClass(activeClass)) {
        e.stopPropagation()
        closeAllDropdownMenus(true)
        return
      }
    }
    $(this).closest(`[data-${containerDataLabel}`).addClass(activeClass)
    openDropdownMenu(this, e)
  }
  function handleMouseEnterDropdownMenu(e) {
    if (!$(this).closest(`[data-${containerDataLabel}`).hasClass(activeClass)) {
      closeAllDropdownMenus(true)
      openDropdownMenu(this, e)
    }
  }
  function handleMouseLeaveDropdownMenu(e) {
    if (!$(this).closest(`[data-${containerDataLabel}`).hasClass(activeClass)) {
      closeAllDropdownMenus()
    }
  }

  // Init
  $(`[data-${containerDataLabel}`).each(function (i) {
    if ($(this).data(containerDataLabel) === 'hover') {
      $(this)
        .find(`[data-${triggerDataLabel}`)
        .on('mouseenter', handleMouseEnterDropdownMenu)
      $(this)
        .find(`[data-${triggerDataLabel}`)
        .on('mouseleave', handleMouseLeaveDropdownMenu)
    }
  })

  $trigger.on('click keypress', handleClickDropdownMenu)
  $target.on('click keypress', function (e) {
    e.stopPropagation()
  })
  $(window).click(closeAllDropdownMenus)
})
