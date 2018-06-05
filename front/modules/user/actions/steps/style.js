$(function () {
  $('#stepModalBtn').click(function () {
    $('#stepModal').css('display', 'block')
  })
  $('.close').click(function () {
    $('#stepModal').css('display', 'none')
  })
  $(window).click(function (e) {
    if (e.target === $('#stepModal')) {
      $('#stepModal').css('display', 'none')
    }
  })

  $('.steps-table .steps-table-body').click(function () {
    $('#updateModal').css('display', 'block')
  })

  $('.close').click(function () {
    $('#updateModal').css('display', 'none')
  })
  $(window).click(function (e) {
    if (e.target === $('#updateModal')) {
      $('#updateModal').css('display', 'none')
    }
  })
})



