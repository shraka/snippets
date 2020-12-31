// Note: Fussy linting, don't use end lines

import $ from 'jquery'

$(document).on('turbolinks:load', function (e) {
  const triggerAttr = 'data-js-modal-trigger'
  const modalAttr = 'data-js-modal'
  const lockFlagAttr = 'data-js-modal-lock-scroll'

  const trigger = `[${triggerAttr}]`
  const modal = `[${modalAttr}]`
  const dialog = '[data-js-modal-dialog]'
  const close = '[data-js-modal-close]'

  const activeClass = 'open'
  const bodyActiveClass = 'modal-open'
  const animateClass = 'animate'

  const transitionSpeed = '120ms'

  function openModal(targetModal, locked = true) {
    closeModals(targetModal)

    $(targetModal)
      .addClass(activeClass)
      .find(dialog)
      .stop()
      .slideDown(transitionSpeed, function () {
        $(this).addClass(activeClass)
      })
    $(targetModal).addClass(animateClass)

    if (locked === true) {
      $('body').addClass(bodyActiveClass)
    }
  }

  function closeModals(except = false) {
    $('body').removeClass(bodyActiveClass)

    $(`${modal}.${activeClass}`)
      .not(except)
      .removeClass(animateClass)
      .find(dialog)
      .stop()
      .slideUp(transitionSpeed, function () {
        $(this).removeClass(activeClass).closest(modal).removeClass(activeClass)
      })
  }

  // Init
  $(dialog).css('display', 'none')

  // Apply triggers
  $(trigger).on('click keypress', function (e) {
    const targetModalStr = $(this).attr(triggerAttr)
    const targetModal = `[${modalAttr}=${targetModalStr}]`
    const locked = $(this).attr(lockFlagAttr) === 'false' ? false : true

    e.stopPropagation()

    if ($(this).hasClass(activeClass)) {
      closeModals()
      return
    }
    openModal(targetModal, locked)
  })
  $(close).on('click keypress', function (e) {
    e.stopPropagation()
    closeModals()
  })
  $(`${dialog}`).click(function (e) {
    e.stopPropagation()
  })
  $(`${modal}::after`).click(function (e) {
    e.stopPropagation()
    closeModals()
  })
  $('body').click(function (e) {
    closeModals()
  })
})
