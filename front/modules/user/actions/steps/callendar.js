import $ from 'jquery'

if (typeof jQuery === 'undefined') {
  throw new Error('jQuery is not loaded')
}

$.fn.zabuto_calendar = function (options) {
  let opts = $.extend({}, $.fn.zabuto_calendar_defaults(), options)
  let languageSettings = $.fn.zabuto_calendar_language(opts.language)
  opts = $.extend({}, opts, languageSettings)

  this.each(function () {
    let $calendarElement = $(this)
    $calendarElement.attr('id', 'zabuto_calendar_' + Math.floor(Math.random() * 99999).toString(36))

    $calendarElement.data('initYear', opts.year)
    $calendarElement.data('initMonth', opts.month)
    $calendarElement.data('monthLabels', opts.month_labels)
    $calendarElement.data('weekStartsOn', opts.weekstartson)
    $calendarElement.data('navIcons', opts.nav_icon)
    $calendarElement.data('dowLabels', opts.dow_labels)
    $calendarElement.data('showToday', opts.today)
    $calendarElement.data('showDays', opts.show_days)
    $calendarElement.data('showPrevious', opts.show_previous)
    $calendarElement.data('showNext', opts.show_next)
    $calendarElement.data('cellBorder', opts.cell_border)
    $calendarElement.data('jsonData', opts.data)
    $calendarElement.data('ajaxSettings', opts.ajax)
    $calendarElement.data('legendList', opts.legend)
    $calendarElement.data('actionFunction', opts.action)
    $calendarElement.data('actionNavFunction', opts.action_nav)

    drawCalendar()

    function drawCalendar () {
      let dateInitYear = parseInt($calendarElement.data('initYear'))
      let dateInitMonth = parseInt($calendarElement.data('initMonth')) - 1
      let dateInitObj = new Date(dateInitYear, dateInitMonth, 1, 0, 0, 0, 0)
      $calendarElement.data('initDate', dateInitObj)

      let tableClassHtml = ($calendarElement.data('cellBorder') === true) ? ' table-bordered' : ''

      let $tableObj = $('<table class="table' + tableClassHtml + '"></table>')
      $tableObj = drawTable($calendarElement, $tableObj, dateInitObj.getFullYear(), dateInitObj.getMonth())

      let $legendObj = drawLegend($calendarElement)

      let $containerHtml = $('<div class="zabuto_calendar" id="' + $calendarElement.attr('id') + '"></div>')
      $containerHtml.append($tableObj)
      $containerHtml.append($legendObj)

      $calendarElement.append($containerHtml)

      let jsonData = $calendarElement.data('jsonData')
      if (false !== jsonData) {
        checkEvents($calendarElement, dateInitObj.getFullYear(), dateInitObj.getMonth())
      }
    }

    function drawTable ($calendarElement, $tableObj, year, month) {
      let dateCurrObj = new Date(year, month, 1, 0, 0, 0, 0)
      $calendarElement.data('currDate', dateCurrObj)

      $tableObj.empty()
      $tableObj = appendMonthHeader($calendarElement, $tableObj, year, month)
      $tableObj = appendDayOfWeekHeader($calendarElement, $tableObj)
      $tableObj = appendDaysOfMonth($calendarElement, $tableObj, year, month)
      checkEvents($calendarElement, year, month)
      return $tableObj
    }

    function drawLegend ($calendarElement) {
      let $legendObj = $('<div class="legend" id="' + $calendarElement.attr('id') + '_legend"></div>')
      let legend = $calendarElement.data('legendList')
      if (typeof(legend) === 'object' && legend.length > 0) {
        $(legend).each(function (index, item) {
          if (typeof(item) === 'object') {
            if ('type' in item) {
              let itemLabel = ''
              if ('label' in item) {
                itemLabel = item.label
              }
              let badgeClassName, listClassName
              switch (item.type) {
                case 'text':
                  if (itemLabel !== '') {
                    let itemBadge = ''
                    if ('badge' in item) {
                      if (typeof(item.classname) === 'undefined') {
                        badgeClassName = 'badge-event'
                      } else {
                        badgeClassName = item.classname
                      }
                      itemBadge = '<span class="badge ' + badgeClassName + '">' + item.badge + '</span> '
                    }
                    $legendObj.append('<span class="legend-' + item.type + '">' + itemBadge + itemLabel + '</span>')
                  }
                  break
                case 'block':
                  if (itemLabel !== '') {
                    itemLabel = '<span>' + itemLabel + '</span>'
                  }
                  if (typeof(item.classname) === 'undefined') {
                    listClassName = 'event'
                  } else {
                    listClassName = 'event-styled ' + item.classname
                  }
                  $legendObj.append('<span class="legend-' + item.type + '"><ul class="legend"><li class="' + listClassName + '"></li></u>' + itemLabel + '</span>')
                  break
                case 'list':
                  if ('list' in item && typeof(item.list) === 'object' && item.list.length > 0) {
                    let $legendUl = $('<ul class="legend"></u>')
                    $(item.list).each(function (listIndex, listClassName) {
                      $legendUl.append('<li class="' + listClassName + '"></li>')
                    })
                    $legendObj.append($legendUl)
                  }
                  break
                case 'spacer':
                  $legendObj.append('<span class="legend-' + item.type + '"> </span>')
                  break

              }
            }
          }
        })
      }

      return $legendObj
    }

    function appendMonthHeader ($calendarElement, $tableObj, year, month) {
      let navIcons = $calendarElement.data('navIcons')
      let $prevMonthNavIcon = $('<span><span class="glyphicon glyphicon-chevron-left"></span></span>')
      let $nextMonthNavIcon = $('<span><span class="glyphicon glyphicon-chevron-right"></span></span>')
      if (typeof(navIcons) === 'object') {
        if ('prev' in navIcons) {
          $prevMonthNavIcon.html(navIcons.prev)
        }
        if ('next' in navIcons) {
          $nextMonthNavIcon.html(navIcons.next)
        }
      }

      let prevIsValid = $calendarElement.data('showPrevious')
      if (typeof(prevIsValid) === 'number' || prevIsValid === false) {
        prevIsValid = checkMonthLimit($calendarElement.data('showPrevious'), true)
      }

      let $prevMonthNav = $('<div class="calendar-month-navigation"></div>')
      $prevMonthNav.attr('id', $calendarElement.attr('id') + '_nav-prev')
      $prevMonthNav.data('navigation', 'prev')
      if (prevIsValid !== false) {
        let prevMonth = (month - 1)
        let prevYear = year
        if (prevMonth === -1) {
          prevYear = (prevYear - 1)
          prevMonth = 11
        }
        $prevMonthNav.data('to', {year: prevYear, month: (prevMonth + 1)})
        $prevMonthNav.append($prevMonthNavIcon)
        if (typeof($calendarElement.data('actionNavFunction')) === 'function') {
          $prevMonthNav.click($calendarElement.data('actionNavFunction'))
        }
        $prevMonthNav.click(function (e) {
          drawTable($calendarElement, $tableObj, prevYear, prevMonth)
        })
      }

      let nextIsValid = $calendarElement.data('showNext')
      if (typeof(nextIsValid) === 'number' || nextIsValid === false) {
        nextIsValid = checkMonthLimit($calendarElement.data('showNext'), false)
      }

      let $nextMonthNav = $('<div class="calendar-month-navigation"></div>')
      $nextMonthNav.attr('id', $calendarElement.attr('id') + '_nav-next')
      $nextMonthNav.data('navigation', 'next')
      if (nextIsValid !== false) {
        let nextMonth = (month + 1)
        let nextYear = year
        if (nextMonth === 12) {
          nextYear = (nextYear + 1)
          nextMonth = 0
        }
        $nextMonthNav.data('to', {year: nextYear, month: (nextMonth + 1)})
        $nextMonthNav.append($nextMonthNavIcon)
        if (typeof($calendarElement.data('actionNavFunction')) === 'function') {
          $nextMonthNav.click($calendarElement.data('actionNavFunction'))
        }
        $nextMonthNav.click(function (e) {
          drawTable($calendarElement, $tableObj, nextYear, nextMonth)
        })
      }

      let monthLabels = $calendarElement.data('monthLabels')

      let $prevMonthCell = $('<th></th>').append($prevMonthNav)
      let $nextMonthCell = $('<th></th>').append($nextMonthNav)

      let $currMonthLabel = $('<span>' + monthLabels[month] + ' ' + year + '</span>')
      $currMonthLabel.dblclick(function () {
        let dateInitObj = $calendarElement.data('initDate')
        drawTable($calendarElement, $tableObj, dateInitObj.getFullYear(), dateInitObj.getMonth())
      })

      let $currMonthCell = $('<th colspan="5"></th>')
      $currMonthCell.append($currMonthLabel)

      let $monthHeaderRow = $('<tr class="calendar-month-header"></tr>')
      $monthHeaderRow.append($prevMonthCell, $currMonthCell, $nextMonthCell)

      $tableObj.append($monthHeaderRow)
      return $tableObj
    }

    function appendDayOfWeekHeader ($calendarElement, $tableObj) {
      if ($calendarElement.data('showDays') === true) {
        let weekStartsOn = $calendarElement.data('weekStartsOn')
        let dowLabels = $calendarElement.data('dowLabels')
        if (weekStartsOn === 0) {
          let dowFull = $.extend([], dowLabels)
          let sunArray = new Array(dowFull.pop())
          dowLabels = sunArray.concat(dowFull)
        }

        let $dowHeaderRow = $('<tr class="calendar-dow-header"></tr>')
        $(dowLabels).each(function (index, value) {
          $dowHeaderRow.append('<th>' + value + '</th>')
        })
        $tableObj.append($dowHeaderRow)
      }
      return $tableObj
    }

    function appendDaysOfMonth ($calendarElement, $tableObj, year, month) {
      let ajaxSettings = $calendarElement.data('ajaxSettings')
      let weeksInMonth = calcWeeksInMonth(year, month)
      let lastDayinMonth = calcLastDayInMonth(year, month)
      let firstDow = calcDayOfWeek(year, month, 1)
      let lastDow = calcDayOfWeek(year, month, lastDayinMonth)
      let currDayOfMonth = 1

      let weekStartsOn = $calendarElement.data('weekStartsOn')
      if (weekStartsOn === 0) {
        if (lastDow === 6) {
          weeksInMonth++
        }
        if (firstDow === 6 && (lastDow == 0 || lastDow == 1 || lastDow == 5)) {
          weeksInMonth--
        }
        firstDow++
        if (firstDow === 7) {
          firstDow = 0
        }
      }

      for (let wk = 0; wk < weeksInMonth; wk++) {
        let $dowRow = $('<tr class="calendar-dow"></tr>')
        for (let dow = 0; dow < 7; dow++) {
          if (dow < firstDow || currDayOfMonth > lastDayinMonth) {
            $dowRow.append('<td></td>')
          } else {
            let dateId = $calendarElement.attr('id') + '_' + dateAsString(year, month, currDayOfMonth)
            let dayId = dateId + '_day'

            let $dayElement = $('<div id="' + dayId + '" class="day" >' + currDayOfMonth + '</div>')
            $dayElement.data('day', currDayOfMonth)

            if ($calendarElement.data('showToday') === true) {
              if (isToday(year, month, currDayOfMonth)) {
                $dayElement.html('<span class="badge badge-today">' + currDayOfMonth + '</span>')
              }
            }

            let $dowElement = $('<td id="' + dateId + '"></td>')
            $dowElement.append($dayElement)

            $dowElement.data('date', dateAsString(year, month, currDayOfMonth))
            $dowElement.data('hasEvent', false)

            if (typeof($calendarElement.data('actionFunction')) === 'function') {
              $dowElement.addClass('dow-clickable')
              $dowElement.click(function () {
                $calendarElement.data('selectedDate', $(this).data('date'))
              })
              $dowElement.click($calendarElement.data('actionFunction'))
            }

            $dowRow.append($dowElement)

            currDayOfMonth++
          }
          if (dow === 6) {
            firstDow = 0
          }
        }

        $tableObj.append($dowRow)
      }
      return $tableObj
    }

    /* ----- Modal functions ----- */

    function createModal (id, title, body, footer) {
      let $modalHeaderButton = $('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>')
      let $modalHeaderTitle = $('<h4 class="modal-title" id="' + id + '_modal_title">' + title + '</h4>')

      let $modalHeader = $('<div class="modal-header"></div>')
      $modalHeader.append($modalHeaderButton)
      $modalHeader.append($modalHeaderTitle)

      let $modalBody = $('<div class="modal-body" id="' + id + '_modal_body">' + body + '</div>')

      let $modalFooter = $('<div class="modal-footer" id="' + id + '_modal_footer"></div>')
      if (typeof(footer) !== 'undefined') {
        let $modalFooterAddOn = $('<div>' + footer + '</div>')
        $modalFooter.append($modalFooterAddOn)
      }

      let $modalContent = $('<div class="modal-content"></div>')
      $modalContent.append($modalHeader)
      $modalContent.append($modalBody)
      $modalContent.append($modalFooter)

      let $modalDialog = $('<div class="modal-dialog"></div>')
      $modalDialog.append($modalContent)

      let $modalFade = $('<div class="modal fade" id="' + id + '_modal" tabindex="-1" role="dialog" aria-labelledby="' + id + '_modal_title" aria-hidden="true"></div>')
      $modalFade.append($modalDialog)

      $modalFade.data('dateId', id)
      $modalFade.attr('dateId', id)

      return $modalFade
    }

    /* ----- Event functions ----- */

    function checkEvents ($calendarElement, year, month) {
      let jsonData = $calendarElement.data('jsonData')
      let ajaxSettings = $calendarElement.data('ajaxSettings')

      $calendarElement.data('events', false)

      if (false !== jsonData) {
        return jsonEvents($calendarElement)
      } else if (false !== ajaxSettings) {
        return ajaxEvents($calendarElement, year, month)
      }

      return true
    }

    function jsonEvents ($calendarElement) {
      let jsonData = $calendarElement.data('jsonData')
      $calendarElement.data('events', jsonData)
      drawEvents($calendarElement, 'json')
      return true
    }

    function ajaxEvents ($calendarElement, year, month) {
      let ajaxSettings = $calendarElement.data('ajaxSettings')

      if (typeof(ajaxSettings) !== 'object' || typeof(ajaxSettings.url) === 'undefined') {
        alert('Invalid calendar event settings')
        return false
      }

      let data = {year: year, month: (month + 1)}

      $.ajax({
        type: 'GET',
        url: ajaxSettings.url,
        data: data,
        dataType: 'json'
      }).done(function (response) {
        let events = []
        $.each(response, function (k, v) {
          events.push(response[k])
        })
        $calendarElement.data('events', events)
        drawEvents($calendarElement, 'ajax')
      })

      return true
    }

    function drawEvents ($calendarElement, type) {
      let jsonData = $calendarElement.data('jsonData')
      let ajaxSettings = $calendarElement.data('ajaxSettings')

      let events = $calendarElement.data('events')
      if (events !== false) {
        $(events).each(function (index, value) {
          let id = $calendarElement.attr('id') + '_' + value.date
          let $dowElement = $('#' + id)
          let $dayElement = $('#' + id + '_day')

          $dowElement.data('hasEvent', true)

          if (typeof(value.title) !== 'undefined') {
            $dowElement.attr('title', value.title)
          }

          if (typeof(value.classname) === 'undefined') {
            $dowElement.addClass('event')
          } else {
            $dowElement.addClass('event-styled')
            $dayElement.addClass(value.classname)
          }

          if (typeof(value.badge) !== 'undefined' && value.badge !== false) {
            let badgeClass = (value.badge === true) ? '' : ' badge-' + value.badge
            let dayLabel = $dayElement.data('day')
            $dayElement.html('<span class="badge badge-event' + badgeClass + '">' + dayLabel + '</span>')
          }

          if (typeof(value.body) !== 'undefined') {
            let modalUse = false
            if (type === 'json' && typeof(value.modal) !== 'undefined' && value.modal === true) {
              modalUse = true
            } else if (type === 'ajax' && 'modal' in ajaxSettings && ajaxSettings.modal === true) {
              modalUse = true
            }

            if (modalUse === true) {
              $dowElement.addClass('event-clickable')

              let $modalElement = createModal(id, value.title, value.body, value.footer)
              $('body').append($modalElement)

              $('#' + id).click(function () {
                $('#' + id + '_modal').modal()
              })
            }
          }
        })
      }
    }

    /* ----- Helper functions ----- */

    function isToday (year, month, day) {
      let todayObj = new Date()
      let dateObj = new Date(year, month, day)
      return (dateObj.toDateString() === todayObj.toDateString())
    }

    function dateAsString (year, month, day) {
      let d = (day < 10) ? '0' + day : day
      let m = month + 1
      m = (m < 10) ? '0' + m : m
      return year + '-' + m + '-' + d
    }

    function calcDayOfWeek (year, month, day) {
      let dateObj = new Date(year, month, day, 0, 0, 0, 0)
      let dow = dateObj.getDay()
      if (dow === 0) {
        dow = 6
      } else {
        dow--
      }
      return dow
    }

    function calcLastDayInMonth (year, month) {
      let day = 28
      while (checkValidDate(year, month + 1, day + 1)) {
        day++
      }
      return day
    }

    function calcWeeksInMonth (year, month) {
      let daysInMonth = calcLastDayInMonth(year, month)
      let firstDow = calcDayOfWeek(year, month, 1)
      let lastDow = calcDayOfWeek(year, month, daysInMonth)
      let days = daysInMonth
      let correct = (firstDow - lastDow)
      if (correct > 0) {
        days += correct
      }
      return Math.ceil(days / 7)
    }

    function checkValidDate (y, m, d) {
      return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate()
    }

    function checkMonthLimit (count, invert) {
      if (count === false) {
        count = 0
      }
      let d1 = $calendarElement.data('currDate')
      let d2 = $calendarElement.data('initDate')

      let months
      months = (d2.getFullYear() - d1.getFullYear()) * 12
      months -= d1.getMonth() + 1
      months += d2.getMonth()

      if (invert === true) {
        if (months < (parseInt(count) - 1)) {
          return true
        }
      } else {
        if (months >= (0 - parseInt(count))) {
          return true
        }
      }
      return false
    }
  }) // each()

  return this
}

/**
 * Default settings
 *
 * @returns object
 *   language:          string,
 *   year:              integer,
 *   month:             integer,
 *   show_previous:     boolean|integer,
 *   show_next:         boolean|integer,
 *   cell_border:       boolean,
 *   today:             boolean,
 *   show_days:         boolean,
 *   weekstartson:      integer (0 = Sunday, 1 = Monday),
 *   nav_icon:          object: prev: string, next: string
 *   ajax:              object: url: string, modal: boolean,
 *   legend:            object array, [{type: string, label: string, classname: string}]
 *   action:            function
 *   action_nav:        function
 */
$.fn.zabuto_calendar_defaults = function () {
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let settings = {
    language: false,
    year: year,
    month: month,
    show_previous: true,
    show_next: true,
    cell_border: false,
    today: false,
    show_days: true,
    weekstartson: 1,
    nav_icon: false,
    data: false,
    ajax: false,
    action: false,
    action_nav: false
  }
  return settings
}

/**
 * Language settings
 *
 * @param lang
 * @returns {{month_labels: Array, dow_labels: Array}}
 */
$.fn.zabuto_calendar_language = function (lang) {
  if (typeof(lang) === 'undefined' || lang === false) {
    lang = 'en'
  }

  switch (lang.toLowerCase()) {

    case 'en':
      return {
        month_labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        dow_labels: ['Пн', 'Вт', 'Сер', 'Чет', 'Пт', 'Сб', 'Нд']
      }
      break
  }

}

$(document).ready(function () {
  $('#my-calendar').zabuto_calendar()
})