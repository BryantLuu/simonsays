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

  let topLeftSound = document.createElement('audio');
  topLeftSound.setAttribute('src', 'public/sounds/tone1.wav');

  let topRightSound = document.createElement('audio');
  topRightSound.setAttribute('src', 'public/sounds/tone2.wav');

  let bottomLeftSound = document.createElement('audio');
  bottomLeftSound.setAttribute('src', 'public/sounds/tone3.wav');

  let bottomRightSound = document.createElement('audio');
  bottomRightSound.setAttribute('src', 'public/sounds/tone4.wav');

  let gameOverSound = document.createElement('audio');
  gameOverSound.setAttribute('src', 'public/sounds/game_over.wav')

  let roundEnd = document.createElement('audio');
  roundEnd.setAttribute('src', 'public/sounds/round_end.wav')

  topLeft.click(function() {
    topLeftSound.play();
  })

  topRight.click(function() {
    topRightSound.play();
  })

  bottomLeft.click(function() {
    bottomLeftSound.play();
  })

  bottomRight.click(function() {
    bottomRightSound.play();
  })

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
      roundEnd.play()
      score += 100
      displayScore.html(score)
      setTimeout(function(){
        addToPattern();
      }, 500)
    }
  }

  function gameOver() {
    gameOverSound.play()
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
