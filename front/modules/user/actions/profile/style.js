$(document).ready(function(){
  $("#last_open").click(function () {
    $(this).addClass("display");
    $("#last_close").removeClass("display");
    $("#last_pass").prop("type","text");
  });
  $("#last_close").click(function () {
    $(this).addClass("display");
    $("#last_open").removeClass("display");
    $("#last_pass").prop("type","password");
  });
  $("#new_open").click(function () {
    $(this).addClass("display");
    $("#new_close").removeClass("display");
    $("#new_pass").prop("type","text");
  });
  $("#new_close").click(function () {
    $(this).addClass("display");
    $("#new_open").removeClass("display");
    $("#new_pass").prop("type","password");
  });
  $("#confirm_open").click(function () {
    $(this).addClass("display");
    $("#confirm_close").removeClass("display");
    $("#confirm_pass").prop("type","text");
  });
  $("#confirm_close").click(function () {
    $(this).addClass("display");
    $("#confirm_open").removeClass("display");
    $("#confirm_pass").prop("type","password");
  });
});