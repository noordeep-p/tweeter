/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  // uses ajax to send post request to server and render the new tweet by prepending onto the tweet containter
  $('#post-tweet').submit(function() {
    const tweetData = $(this).serializeArray()[0];
    
    $.ajax("/tweets", { method: "GET" })
      .then(function(data) {
        if (tweetData.value.length > 0 && tweetData.value.length < 141) {
          const $tweet = createTweetElement(data[data.length - 1]);
          $('.tweet-container').prepend($tweet);
          timeago.render(document.querySelectorAll(".time-stamp"));
        }
      });
  });

  // escape function to prevent any code insertions by users by converting typed code into charactors
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const getTweets = function() {
    $.ajax("/tweets", { method:"GET" })
      .then(function(data) {
        renderTweets(data);
      });
  };

  // goes through tweet objects renders tweets onto the page
  const renderTweets = function(tweets) {
    for (tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
      timeago.render(document.querySelectorAll(".time-stamp"));
    }
  };

  // creates html template and uses literals to insert vars
  const createTweetElement = function(tweetData) {
    const username = tweetData['user'].name;
    const userHandle = tweetData['user'].handle;
    const userAvatar = tweetData['user'].avatars;
    const userTweet = tweetData['content'].text;
    const timeStamp = tweetData["created_at"];

    const $tweet = $(
      `<section class="tweet">
        <article>
          <header>
            <div class="user-info">
              <div class="username"><img src="${escape(userAvatar)}" id="user-avatar" alt="user-name"> ${escape(username)}</div>
              <div class="handle">${escape(userHandle)}</div>
            </div>
            <div class="tweet-msg">${escape(userTweet)}</div>
          </header>
          <footer class="user-actions">
            <div datetime="${escape(timeStamp)}" class="time-stamp"></div>
            <div class="tweet-actions">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
      </section>`);
    return $tweet;
  };

  getTweets();
});