let counter = 140;

$(document).ready(function() {
  $(".tweet-text-area").on("input", function() {

    // //check the value of the tweet text area
    const tweetLength = $(".tweet-text-area").val().length;
    
    $(".counter").text(counter - tweetLength);
  
    if (tweetLength > 140) {
      $(".counter").css("color", "red")
    } else {
      $(".counter").css("color", "black")
    }

  });

});
