/* eslint-disable no-undef */

$(document).ready(function() {
  $("#empty-error").hide();
  $("#too-long-error").hide();
  $(".fa-stack").hide();
  
  $(".fa-stack").on("click", function() {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() - $("header").height() > 0) {
      $(".nav-tweet-msg-container").hide();
      $(".fa-stack").show();
    } else {
      $(".fa-stack").hide();
      $(".nav-tweet-msg-container").show();
    }
  });

  $(".nav-tweet-msg-container").on("click", function() {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown();
      $("#tweet-text").focus();
      return;
    }
    $(".new-tweet").slideUp();
  });

  $(function() {
    $('#post-tweet').submit(function(event) {
      const tweetValue = $(this).serializeArray()[0]['value'];
      event.preventDefault();
      if (!tweetValue) {
        $("#empty-error").slideDown();
        return;
      } else if (tweetValue.length > 140) {
        $("#too-long-error").slideDown();
        return;
      }
      $.post("/tweets", $(this).serialize(), function() {
        $("#empty-error").slideUp();
        $("#too-long-error").slideUp();
      });
    });
  });
});