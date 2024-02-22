// Get the value of the 'score' query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const u = urlParams.get('u')/33;
const r = urlParams.get('r')/44;
var sound = new Audio("bbsong.mp3"); // buffers automatically when created

function openModal() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

// Function to close modal
function closeModal() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modal").style.display = "none";
    sound.play();
}

// Open the modal initially on page load
window.onload = function() {
    openModal();
};
// Initialize variables
let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;

// Function to start the game
document.getElementById("startreset").addEventListener("click", function() {
    if (!playing) {
        startGame();
    }
});

// Function to handle click events on answer choices
document.querySelectorAll(".box").forEach(function(box) {
    box.addEventListener("click", function() {
        if (playing) {
            if (parseInt(this.innerHTML) === correctAnswer) {
                // Increase score and generate next question if answer is correct
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function() {
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                // End game and display score if answer is wrong
                endGame();
            }
        }
    });
});

// Function to start the game
function startGame() {
    playing = true;
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    show("timeremaining");
    timeremaining = 90;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    hide("gameOver");
    hide("startreset"); // Hide the Start Game button
    startCountdown();
    generateQA();
}

// Function to end the game and display score
function endGame() {
    stopCountdown();
    show("gameOver");
    document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
    hide("timeremaining");
    hide("correct");
    hide("wrong");
    playing = false;

    // Show the Next Round button
    document.getElementById("nextRoundBtn").style.display = "block";
}

// Function to start the countdown timer
function startCountdown() {
    action = setInterval(function() {
        timeremaining--;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining === 0) {
            endGame();
        }
    }, 1000);
}

// Function to stop the countdown timer
function stopCountdown() {
    clearInterval(action);
}

// Function to hide an element if it exists
function hide(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = "none";
    }
}

// Function to show an element if it exists
function show(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = "block";
    }
}

// Function to generate a new question and answer choices
function generateQA() {
    let x, y;
    if (score < 4) {
        // Generate questions of 1 digit x 1 digit for the first 4 questions
        x = 1 + Math.round(8 * Math.random());
        y = 1 + Math.round(8 * Math.random());
    } else if (score < 14) {
        // Generate questions of either 1 digit x 2 digit or 2 digit x 1 digit for the next 10 questions
        const is1DigitFirst = Math.random() < 0.5;
        if (is1DigitFirst) {
            x = 1 + Math.round(8 * Math.random());
            y = 10 + Math.round(19 * Math.random());
        } else {
            x = 10 + Math.round(19 * Math.random());
            y = 1 + Math.round(8 * Math.random());
        }
    } else {
        // Generate questions of 2 digit x 2 digit for all remaining questions
        x = 10 + Math.round(19 * Math.random());
        y = 10 + Math.round(19 * Math.random());
    }
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + " x " + y;
    const correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    const answers = [correctAnswer];
    const unitDigit = correctAnswer % 10;
    let optionsWithSameUnitDigit = 0;
    for (let i = 1; i < 5; i++) {
        if (i !== correctPosition) {
            let wrongAnswer;
            if (x * y >= 10) {
                // For 2 digit questions, ensure all options have the same number of digits as the answer
                do {
                    wrongAnswer = Math.floor(Math.random() * (Math.pow(10, String(correctAnswer).length)));
                } while (answers.indexOf(wrongAnswer) > -1 || (i === 1 && wrongAnswer % 10 !== unitDigit) || (i !== 1 && wrongAnswer % 10 === unitDigit) || String(wrongAnswer).length !== String(correctAnswer).length);
            } else {
                do {
                    wrongAnswer = (1 + Math.round(8 * Math.random())) * (1 + Math.round(8 * Math.random()));
                } while (answers.indexOf(wrongAnswer) > -1);
            }
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        } else {
            optionsWithSameUnitDigit++;
        }
    }
    // Ensure at least two options have the same last digit as the correct answer's last digit
    if (x * y >= 10) {
        while (optionsWithSameUnitDigit < 2) {
            const randomPosition = Math.floor(Math.random() * 4) + 1;
            if (randomPosition !== correctPosition) {
                const lastDigit = correctAnswer % 10;
                let randomWrongAnswer;
                do {
                    randomWrongAnswer = Math.floor(Math.random() * (Math.pow(10, String(correctAnswer).length)));
                } while (answers.indexOf(randomWrongAnswer) > -1 || randomWrongAnswer % 10 !== lastDigit || String(randomWrongAnswer).length !== String(correctAnswer).length);
                document.getElementById("box" + randomPosition).innerHTML = randomWrongAnswer;
                answers.push(randomWrongAnswer);
                optionsWithSameUnitDigit++;
            }
        }
    }
}

// Function to redirect to the next page with score as query parameter
        function redirectToNextPage() {
            window.location.href = "submit/index.html?u=" + u*55 + "+" + "&r=" + r*66 + "&l=" + score*77;
        }