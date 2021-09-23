/* eslint-disable no-undef */

// contains all JS required to handle user events
$(document).ready(function() {
// intially hide error messages and up scroll button
  $("#empty-error").hide();
  $("#too-long-error").hide();
  $(".fa-stack").hide();

  // scroll bttn code, scrolls to top of the page and focuses textarea
  $(".fa-stack").on("click", function() {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();
  });
  // dynamically show and hide scroll button
  $(window).scroll(function() {
    if ($(window).scrollTop() - $("header").height() > 0) {
      $(".nav-tweet-msg-container").hide();
      $(".fa-stack").show();
    } else {
      $(".fa-stack").hide();
      $(".nav-tweet-msg-container").show();
    }
  });
  // function to show and hide new tweet textarea
  $(".nav-tweet-msg-container").on("click", function() {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown();
      $("#tweet-text").focus();
      return;
    }
    $(".new-tweet").slideUp();
  });
  // function to check for correct length of tweets and display respective error messages
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