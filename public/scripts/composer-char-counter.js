/* eslint-disable no-undef */

// function used to dynamically update charactor counter on tweet box
$(document).ready(() => {
  $("#tweet-text").on("input", function(e) {
    if (e.target.value.length < 141) {
      $("div.tweet-button-counter").find(".counter")
        .html(e.target.value.length)
        .css("color", "#545149");
    }
    if (e.target.value.length > 140) {
      $("div.tweet-button-counter").find(".counter")
        .html(140 - e.target.value.length)
        .css("color", "red");
    }
  });
});