let time = 30;
let answer;
let gameLevel = 1;
let gameScore = 0;
let clicked = false;
let choiceA, choiceB, choiceC, choiceD;
const choices = [1, 2, 3, 4];

$('#start-button').click(function(){
    if (!clicked){
        clicked = true;
        startGame();
    }
});

$('.answer').click(function(){
    answerProgress(this);
});

function reload(){
    location.reload();
}

function gameOver(){
    time = 0;
    $('.loader-container').css('display', 'flex');
    $('.loader-info').html('<span style="color: red">GAME OVER.</span><br><div class="menu-button" onclick="reload()">RETRY</div>');
}

function answerProgress(element) {
    var theElement = $(element).attr('id');

    if (theElement === "answer1"){
        playersAnswer = choiceA;
    } else if (theElement === "answer2"){
        playersAnswer = choiceB;
    } else if (theElement === "answer3"){
        playersAnswer = choiceC;
    } else if (theElement === "answer4"){
        playersAnswer = choiceD;
    }

    if (String(playersAnswer) === String(answer)) {
        calculateScore();
        gameLevel += 1;
        generateLevel();
        time = time + 3;
        $('#level').html(gameLevel);
        $('#time').html(time);
    } else {
        $(`#${theElement}`).css('background-color', 'red');
        gameOver();
        if (String(choiceA) === String(answer)) {
            $('#answer1').css('background-color', 'lightgreen');
        } else if (String(choiceB) === String(answer)) {
            $('#answer2').css('background-color', 'lightgreen');
        } else if (String(choiceC) === String(answer)) {
            $('#answer3').css('background-color', 'lightgreen');
        } else if (String(choiceD) === String(answer)) {
            $('#answer4').css('background-color', 'lightgreen');
        }
    }
}

function calculateScore() {
    gameScore = (gameScore + ((time * gameLevel) / 2));
    $('#score').html(parseInt(gameScore));
}

function startGame(){
    $('.start').css('animation', 'exit 1s ease 0s 1 normal forwards');
    setTimeout(() => {
        $('.loader-info').html('Starting in: 3')
        $('.start').css('display', 'none');
        $('.navbar').css('display', 'block')
        $('.game-container').css('display', 'block').css('animation', 'entrance 1s ease-out 0s 1 normal forwards')
        $('.loader-container').css('display', 'flex');
    } ,1000);
    setTimeout(() => {
        $('.loader-info').html('Starting in: 2')
    }, 2000);
    setTimeout(() => {
        $('.loader-info').html('Starting in: 1')
    }, 3000);
    setTimeout(() => {
        $('.loader-container').css('display', 'none');
        $('#level').html(gameLevel);
        $('#score').html(gameScore);
        generateLevel();
        startTimer();
    }, 4000);
}

// Generating Random Integer
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomLowerSymbol(){
    var number = Math.floor(Math.random() * 2);
    if (number === 0) {
        return '+'
    } else {
        return '-'
    }
}

function randomHigherSymbol(){
    var number = Math.floor(Math.random() * 4);
    if (number === 0) {
        return '+'
    } else if (number === 1){
        return '-'
    } else if (number === 2){
        return '*'
    } else if (number === 3){
        return '/'
    }
}

function startTimer() {

    // Updating the timer
    $("#time").html(time);

    // Timer's limit
    if (time === 0) {
        gameOver();
        return;
    }

    // Changing the color background of timer to orange when the timer is below 20 and above 10
    if (time < 20 && time > 10) {
        $("#time").css("background-color", "orange")
    }

    // Changing the color of timer to red when the timer is below 10
    if (time < 10) {
        $("#time").css("background-color", "red")
    }

    // Timer Reduction
    time -= 1;

    // Timer's Interval
    setTimeout(startTimer, 1000);
}

function generateLevel() {

    let int1;
    let int2;
    var generatedNumbers = [];

    // If level is below 10
    if (gameLevel <= 10) {
        var symbol = randomLowerSymbol();
        if (symbol === "+") {
            int1 = randomInt(5, 20);
            int2 = randomInt(5, 20);
        } else {
            int1 = randomInt(5, 20);
            int2 = randomInt(5, 15);
        }
    }
    // Else if level is above 10 and below 20
    else if (gameLevel > 10 && gameLevel <= 20) {
        var symbol = randomLowerSymbol();
        if (symbol === "+") {
            int1 = randomInt(20, 50);
            int2 = randomInt(20, 50);
        } else {
            int1 = randomInt(20, 50);
            int2 = randomInt(20, 45);
        }
    }
    // Else if level is above 20
    else if (gameLevel > 20) {
        var symbol = randomHigherSymbol();
        if (symbol === "+") {
            int1 = randomInt(50, 100);
            int2 = randomInt(50, 100);
        }
        else if (symbol === "-") {
            int1 = randomInt(50, 100);
            int2 = randomInt(50, 95);
        }
        else if (symbol === "*") {
            int1 = randomInt(10, 20);
            int2 = randomInt(5, 15);
        }
        else if (symbol === "/") {
            divisor = randomInt(10, 20);
            dividend = divisor * randomInt(10, 20);
            int1 = dividend;
            int2 = divisor;
        }
    } // You can add more if else statements for levels here

    var equation = (`${int1} ${symbol} ${int2}`)
    answer = math.evaluate(equation);

    arrayShuffler(choices);

    $('#equation').html(equation);
    $('#answer' + choices[0]).html(answer);
    for (var i = 1; i < 4; i++){
        var randomNumber = numberGenerator(answer);
        while (generatedNumbers.indexOf(randomNumber) !== -1 || randomNumber === answer){
            randomNumber = numberGenerator(answer);
        }
        generatedNumbers.push(randomNumber);
        $('#answer' + choices[i]).html(randomNumber);

    }
    choiceA = $('#answer1').html();
    choiceB = $('#answer2').html();
    choiceC = $('#answer3').html();
    choiceD = $('#answer4').html();

    generatedNumbers = [];
}

function arrayShuffler(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function numberGenerator(specificInt) {
    var min = specificInt - 10;
    var max = specificInt + 10;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}