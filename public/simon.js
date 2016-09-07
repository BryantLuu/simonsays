$(function() {

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

  function gameInitialize() {
    console.log('GAME START')
    addToPattern()

    allButtons.click(function(el) {
      playerMove($(this).data('value'))
    })
  }

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
      if (guesses < currentPattern.length) {
        allButtons.removeClass('glow')
        guesses++
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
    console.log('addcolortopattern')
    displayPattern()
  }

  function playerMove(selection) {
    if (selection !== playerGuessQueue.shift()){
      alert("game over!")
    }

    if (playerGuessQueue.length === 0) {
      score += 100
      displayScore.html(score)
      addToPattern()
    }
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
      gameInitialize()
    }
  }

  countDown(3)
})
