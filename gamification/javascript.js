function openModal() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

// Function to close modal
function closeModal() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modal").style.display = "none";
    var snd = new Audio("bbsong.mp3"); // buffers automatically when created
    snd.play();
}

// Open the modal initially on page load
window.onload = function() {
    openModal();
};
const cards = document.querySelectorAll(".card");
const countdownDisplay = document.getElementById('countdown');
const flipsDisplay = document.getElementById('flips');
const pairsDisplay = document.getElementById('pairs');
const messageDisplay = document.getElementById('message');
const startGameBtn = document.getElementById('startGameBtn'); // Start Game Button

let matched = 0;
let flips = 0;
let cardOne, cardTwo;
let disableDeck = true; // Disable card flipping initially

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        flips++;
        flipsDisplay.textContent = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        pairsDisplay.textContent = matched + "/" + (cards.length / 2);
        if(matched == 8) {
            clearInterval(countdownInterval); // Stop the timer
        
            // Calculate score as the sum of time remaining and matched pairs
            matched = (timeLeft/2).toFixed(1) + 8;
        
            // Show the Next Round button
            document.getElementById("nextRoundBtn").style.display = "block";
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    flips = 0;
    flipsDisplay.textContent = flips;
    pairsDisplay.textContent = "0/" + (cards.length / 2);
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

startGameBtn.addEventListener('click', () => {
    shuffleCard();
    startTimer();
    startGameBtn.style.display = 'none'; // Hide the button after clicking
});

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

// Countdown Timer
const totalTime = 65; // 65 seconds
let timeLeft = totalTime;
let countdownInterval;

function startTimer() {
    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            countdownDisplay.style.color = "color: rgb(255, 42, 42);";
        } else {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "0:00";
            messageDisplay.textContent = "Time's up! Game over.";
            // Show the Next Round button
            document.getElementById("nextRoundBtn").style.display = "block";
        }
    }, 1000);
}

function redirectToNextPage() {
    window.location.href = "round_2/index.html?u=" + matched*22;
}