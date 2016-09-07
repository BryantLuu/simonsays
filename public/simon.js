$(function(){

  let topLeft     = $('.button--topleft');
  let topRight    = $('.button--topright');
  let bottomLeft  = $('.button--bottomleft');
  let bottomRight = $('.button--bottomright')
  let allButtons  = $('.button')

  let currentPattern   = [];
  let playerGuessQueue = [];
  let guesses          = 0;

  let displayScore = $('.score');
  let score        = 0
  let gameOverDisplay     = $('.game-over');

  allButtons.click(function() {
    playerMove($(this).data('value'))
  })

  allButtons.on('mousedown', function() {
    $(this).addClass('glow');
  })

  allButtons.on('mouseup', function() {
    $(this).removeClass('glow');
  })

  function displayPattern() {
    if(currentPattern[guesses] === topLeft.data('value'))
      topLeft.addClass('glow');
    if(currentPattern[guesses] === topRight.data('value'))
      topRight.addClass('glow');
    if(currentPattern[guesses] === bottomLeft.data('value'))
      bottomLeft.addClass('glow');
    if(currentPattern[guesses] === bottomRight.data('value'))
      bottomRight.addClass('glow');

    setTimeout(function () {
      allButtons.removeClass('glow')
      guesses++
      if (guesses < currentPattern.length) {
        setTimeout(function() {
          displayPattern()
        }, 500)
      }
    }, 500)
  }

  function addToPattern() {
    guesses = 0;
    let color = Math.floor(Math.random() * 4)
    currentPattern.push(color);
    playerGuessQueue = currentPattern.slice()
    displayPattern()
  }

  function playerMove(selection) {
    if (selection !== playerGuessQueue.shift()){
      return gameOver()
    }

    if (playerGuessQueue.length === 0) {
      score += 100
      displayScore.html(score)
      addToPattern()
    }
  }

  function gameOver() {
    reset()
    countDown(3)
    gameOverDisplay.removeClass('hide');
    setTimeout(function() {
      gameOverDisplay.addClass('hide');
    }, 3000)
  }

  function reset() {
    currentPattern   = [];
    playerGuessQueue = [];
    guesses          = 0;
    score            = 0
    displayScore.html(score)
  }

  function countDown(times) {
    if (times > 0) {
      $('.timer').html(times);
      let newTime = times-1
      setTimeout(function() {
        countDown(newTime)
      }, 1000)
    } else {
      $('.timer').html('');
      addToPattern()
    }
  }

  countDown(3)

})
