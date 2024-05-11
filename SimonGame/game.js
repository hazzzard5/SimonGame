buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
var gameStart = false;

userClickedPattern = [];

var level = 0;

$(document).keypress(function() {
    if(!gameStart){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
})


//Its like this because we want to just trigger it right away of the button clicks instead of assigning them to each ID or creating functions
$(".btn").on("click", function () {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("level " + level);
    var randomNumer = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumer];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    var delayInMilliSeconds = 100;
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, delayInMilliSeconds)
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}