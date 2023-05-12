// Button colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Color patterns
var gamePattern = [];
var userClickPattern = [];

var level = 0;
var started = false;

$(document).keydown(function() {
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickPattern.length-1);

});

function checkAnswer(currentLevel) {

    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        
        $("#level-title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        var gameOver = new Audio("./sounds/wrong.mp3");
        gameOver.play();

        startOver();

    }
}

function nextSequence() {

    // Reset users click pattern
    userClickPattern = [];

    // Continue to next level
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

// Play color sound
function playSound(buttonColor) {
    var sound = new Audio("./sounds/" + buttonColor + ".mp3");
    sound.play();
}

//Animate color pressed
function animatePress(colorPressed) {
    $("#" + colorPressed).addClass("pressed");

    setTimeout(function () {
        $("#" + colorPressed).removeClass("pressed");
    }, 100);
}

function startOver() {
    $(document).keydown(function () {
        level = 0;
        started = false;
        gamePattern = [];
    });
}