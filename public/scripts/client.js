/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


//below is the same as document.ready
$(() => {
  
  const loadTweets = () => {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
  
        renderTweets(tweets);
  
      },
      error: (err) => {
        console.log(`error: ${err}`)
      }
    })
  }

  loadTweets();

  //create a single post/node
  const createTweetElement = (tweet) => {
    //jquery take this stringified HTML and is read as HTML by the browser?
    const $tweetHTML = 
    `<header class="icon-name-handle">
      <div class="icon-with-name">
        <img class="avatar" src="${tweet.user.avatars}">
        <h2 class="username">${tweet.user.name}</h2>
      </div>
      <h2 class="handle">${tweet.user.handle}</h2>
    </header>
    <p class="post">
      ${escape(tweet.content.text)}
    </p>
    <footer class="time-with-icons">
      <h5 class="time-since-posted">${timeago.format(tweet.created_at)}</h5>
      <section class="interact-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </section>
    </footer>`;
  
    
    const $tweetContainer = $('<article>').addClass('tweet-container');

    let $tweet = $tweetContainer.append($tweetHTML);
    console.log("After createTweetElement")
    return $tweet;
  }

  const renderTweets = function(tweets) {
    $mainContainer = $('.all-posts-container');
    $mainContainer.empty();

    console.log("during renderTweets")

    for (const aTweet of tweets) {
      console.log("aTweet",aTweet)
      const $aTweet = createTweetElement(aTweet);

      $mainContainer.prepend($aTweet);
    }
  }

  const $form = $('.new-tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    console.log('the form has been submitted');

    const serializedData = $(this).serialize();
    console.log(serializedData);

    //if input is empty -->
    if (!$('.tweet-text-area').val()) {
      $('#error-message-container').html('&#9888; Uh Oh! You submitted an empty tweet! Try again. :( &#9888;').slideDown().delay(5000).fadeOut();
      return;
    } else if ($('.tweet-text-area').val().length > 140) {
      $('#error-message-container').html('&#9888; Uh Oh! Your tweet was too long. Try again :( &#9888;').slideDown().delay(5000).fadeOut();
    } else {
      //if input is good.
      $.post('/tweets', serializedData, (response) => {
        console.log(response);
        loadTweets();
      })
      $('.tweet-text-area').val("");
    }
  })
});

