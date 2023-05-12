
var buttonColors = ["red", "blue", "green", "yellow"];

// Button patterns
var gamePattern = [];
var userClickPattern = [];

var started = false;
var level = 0;

// Listen for keypress to start game
$(document).keydown(function() {
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

// Add clicked color to users click pattern
$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    // Clicked color sound and animation
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickPattern.length-1);

});

// Compare clicked pattern with game pattern
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // Game Over sound and animation
        $("h1").text("Game Over, Press any key to restart");

        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Start game over
        startOver();
    }

}

function nextSequence() {

    // Reset user clicked pattern
    userClickPattern = [];

    // Display next level
    level++;
    $("#level-title").text("Level " + level);

    // Add random color to game pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Random color sound and animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);

}

// Play button color sound
function playSound(buttonColor) {
    var sound = new Audio("./sounds/" + buttonColor + ".mp3");
    sound.play();
}

// Animate button color clicked
function animatePress(colorPressed) {
    $("#" + colorPressed).addClass("pressed");

    setTimeout(function () {
        $("#" + colorPressed).removeClass("pressed");
    }, 100);
}

// Start game over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



