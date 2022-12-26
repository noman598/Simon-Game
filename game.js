let gamePattern = []
let userClickedPattern = []
var start = false
var level = 0
let buttonColors = ["red", "blue", "green", "yellow"];
 

$(document).keypress(function(){
    if(!start){
        $("#level-title").text("level" + level);
        nextSequence()
    }
    start = true;
})

$(".btn").click(function(){
// $('.btn').on('click', function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function playSound(name){
    
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(userChosenColour){
    $('#'+ userChosenColour).addClass('pressed');
    setTimeout(() => {
        $('#'+userChosenColour).removeClass('pressed');
        
    }, 300);
}

  
function nextSequence(){
    let userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random()* 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function startOver(){
    level = 0
    gamePattern = []
    start = false;
}
