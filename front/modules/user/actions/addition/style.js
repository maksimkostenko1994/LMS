// window.onload = function () {
//
//   let modal = document.getElementById('modal')
//
// // Get the button that opens the modal
//   let btn = document.getElementById('modalBtn')
//
//   let span = document.getElementsByClassName('close')[0]
//
//   btn.onclick = function() {
//     modal.style.display = 'block'
//   }
//
//   span.onclick = function() {
//     modal.style.display = 'none'
//   }
//
//   window.onclick = function(event) {
//     if (event.target === modal) {
//       modal.style.display = 'none'
//     }
//   }
// }

$(function () {
  $('#modalBtn').click(function () {
    $('#modal').css('display', 'block')
  })
  $('.close').click(function () {
    $('#modal').css('display', 'none')
  })
  $(window).click(function (e) {
    if (e.target === $('#modal')) {
      $('#modal').css('display', 'none')
    }
  })
})


