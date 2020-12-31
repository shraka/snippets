// For a collapse / accordion element
// Note: Fussy linting, don't use end lines

import $ from 'jquery'

$(document).on('turbolinks:load', function (e) {
  // Basic settings
  const transitionSpeed = '180ms'

  // Use accordion Wrapper only for accordion mode
  const accordionAttr = 'data-js-collapse-accordion'
  const collapseAttr = 'data-js-collapse'
  const collapsedClass = 'js-collapsed'
  const expandedClass = 'js-expanded'
  const collapsedTriggerClass = 'js-trigger-collapsed'
  const expandedTriggerClass = 'js-trigger-expanded'

  const accordionSelector = `[${accordionAttr}]`
  const collapseSelector = `[${collapseAttr}]`

  function getTarget($object) {
    const targetSelector = `#${$object.attr(collapseAttr)}`
    if (targetSelector) {
      return targetSelector
    }
    console.error('closeable.js could not find a target.')
    return
  }

  function collapse($collapseObj, animate = true) {
    const targetStr = getTarget($collapseObj)
    const animateSpeed = animate ? transitionSpeed : 0

    $collapseObj
      .attr('aria-expanded', 'false')
      .removeClass(expandedTriggerClass)
      .addClass(collapsedTriggerClass)
    $(targetStr)
      .stop()
      .slideUp(animateSpeed, function () {
        $(targetStr).addClass(collapsedClass)
        $(targetStr).removeClass(expandedClass)
      })
  }

  function expand($triggerObj, animate = true) {
    const targetStr = getTarget($triggerObj)
    const animateSpeed = animate ? transitionSpeed : 0

    if ($triggerObj.closest(accordionSelector)) {
      // Close other collapse targets
      $triggerObj
        .closest(accordionSelector)
        .find(collapseSelector)
        .not($triggerObj)
        .each(function () {
          collapse($(this))
        })
    }
    $triggerObj
      .attr('aria-expanded', 'true')
      .removeClass(collapsedTriggerClass)
      .addClass(expandedTriggerClass)
    $(targetStr).removeClass(collapsedClass).addClass(expandedClass)
    $(targetStr).stop().slideDown(animateSpeed)
  }

  //
  // Init
  //
  // Add accessibility
  $(collapseSelector).each(function () {
    if (!$(this).attr('aria-controls')) {
      $(this).attr('aria-controls', $(this).attr(collapseAttr))
    }
  })

  // Start closed if using accordion
  if ($(accordionSelector).length) {
    $(accordionSelector)
      .find(collapseSelector)
      .each(function () {
        collapse($(this), false)
      })
  } else {
    $(collapseSelector).each(function () {
      // Set up default states
      if ($(this).attr('aria-expanded') === 'false') {
        collapse($(this), false)
      } else {
        expand($(this), false)
      }
    })
  }

  // Attach click function
  $(collapseSelector).on('click keypress', function (e) {
    const $this = $(this)
    if ($this.attr('aria-expanded') === 'false') {
      expand($this)
      return
    }
    collapse($this)
  })
})
