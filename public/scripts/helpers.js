$(document).ready(function() {
  $(".tweet-container").hover(function() {
    $(this).css("box-shadow", "5px 5px 0px #f6bd60");
  }, function() {
    $(this).css("box-shadow", "0px 0px 0px #f6bd60")
  })

  $("i").hover(function() {
    $(this).css("color", "#F28482");
  }, function() {
    $(this).css("color", "#000000")
  })
});