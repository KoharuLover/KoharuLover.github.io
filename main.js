//target all elements to save to constants
const page0btn=document.querySelector("#page0btn");
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");

var allpages=document.querySelectorAll(".page");
var allnavbtn=document.querySelectorAll(".navbtn");

const menuItemsList = document.querySelector("ul");
const hambtn = document.querySelector("#hamIcon");
hambtn.addEventListener("click", toggleMenus);


//select all subtopic pages
function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
        onepage.style.display="none"; //hide it
    }
}
function clearall(){
    for(let onenavbtn of allnavbtn){
        onenavbtn.classList.remove("selected");
    }
}
function show(pgno){ //function to show selected page no
    hideall();
    clearall();

    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
    onepage.style.display="block"; //show the page

    let onenavbtn=document.querySelector("#page"+pgno+"btn");
    onenavbtn.classList.add("selected");
    
    stopGame(false);
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page0btn.addEventListener("click", function () {
    show(0);
});
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
show(0);

function toggleMenus(){ /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if(menuItemsList.classList.contains("menuShow")){
        hambtn.innerHTML="Close Menu"; //change button text to chose menu
    }
    else{ //if menu NOT showing
        hambtn.innerHTML="Open Menu"; //change button text open menu
    }
}



//content 0 buttons
const c01btn = document.querySelector("#c01btn");
const c02btn = document.querySelector("#c02btn");
const c03btn = document.querySelector("#c03btn");

//contents 0-1, 0-2 and 0-3
const c01 = document.querySelector("#c01");
const c02 = document.querySelector("#c02");
const c03 = document.querySelector("#c03");

// Add event listeners to show sections when their buttons are clicked
c01btn.addEventListener("click", function() {
    c01.classList.add("show");
    c01btn.style.display = "none"; // Optionally hide button after click
});

c02btn.addEventListener("click", function() {
    c02.classList.add("show");
    c02btn.style.display = "none";
});

c03btn.addEventListener("click", function() {
    c03.classList.add("show");
    c03btn.style.display = "none";
});


var gameArea = document.getElementById("minigame");

const popAudio = new Audio("Audio/popsound.mp3");
const explodeAudio = new Audio("Audio/explosion.mp3");

var scoreDisplay = document.getElementById("score");
var score = 0;

var startBtn = document.getElementById("startBtn");
var gameUI = document.getElementById("gameUI");
var startOverlay = document.getElementById("startOverlay");

var countdownDisplay = document.getElementById("countdown");
var endScreen = document.getElementById("endScreen");
var finalScore = document.getElementById("finalScore");
var tryAgainBtn = document.getElementById("tryAgainBtn");

var countdown = 60;
var countdownTimer = null;

var bubbleInterval = null;

var gameRunning = false;

var positiveThoughts = [
  "You're strong!",
  "Breathe",
  "You got this!",
  "Take it slow",
  "Be kind to yourself",
  "One step at a time"
];

var distractions = [
  "Too much work!",
  "Why bother?",
  "Stress!!"
];

function createBubble() {
  var bubble = document.createElement("div");
  bubble.className = "bubble";

  var isPositive = Math.random() < 0.6;
  var text = isPositive? 
    positiveThoughts[Math.floor(Math.random() *(positiveThoughts.length))]
    : distractions[Math.floor(Math.random() * (distractions.length))];

  bubble.textContent = text;

  // Random horizontal position
  var startX = Math.random() * (gameArea.clientWidth - 100);
  bubble.style.left = startX + "px";

  // Start at the bottom
  var posY = gameArea.clientHeight;
  bubble.style.top = posY + "px";

  // Click behavior
  bubble.onclick = function () {
    if (isPositive) {
        popAudio.play();
        score += 1;
    } else {
        explodeAudio.play();
        score -= 1;
    }
    scoreDisplay.textContent = "Score: " + score;
    bubble.remove();
  };

  gameArea.appendChild(bubble);

  // Animate upward
  function float() {
    posY -= 1 + Math.random(); // random speed
    if (posY < -100) {
      bubble.remove(); // remove when off-screen
    } else {
      bubble.style.top = posY + "px";
      requestAnimationFrame(float);
    }
  }

  //smoother floating animation
  requestAnimationFrame(float);
}

// Start the game
startBtn.addEventListener("click", function() {
    startGame();
});

tryAgainBtn.addEventListener("click", function () {
    startGame();
});


function updateCountdown() {
    countdown -= 1;
    countdownDisplay.textContent = "Time Left: " + countdown + "s";

    if (countdown <= 0) {
        stopGame(true);
    }
}

function startGame() {
    if(!gameRunning)
    {
        startOverlay.style.display="none";
        gameUI.style.display="block";
        endScreen.style.display = "none";

        score = 0;
        scoreDisplay.textContent = "Score: 0";

        countdown = 60;
        countdownDisplay.textContent = "Time Left: 60s";

        bubbleInterval = setInterval(createBubble, 1000);
        countdownTimer = setInterval(updateCountdown, 1000);

        gameRunning = true;
    }
}


function stopGame(gameEnd = false) {
    if(gameRunning)
    {
        clearInterval(bubbleInterval);
        clearInterval(countdownTimer);
        bubbleInterval = null;
        countdownTimer = null;

        var bubbles = document.querySelectorAll(".bubble");
        bubbles.forEach(function (bubble) {
            bubble.remove();
        });

        gameUI.style.display="none";
        gameRunning = false;

        //check if to return to start screen or end screen
        if (gameEnd) {
            finalScore.textContent = "Your Score: " + score;
            endScreen.style.display = "flex";
        } else {
            startOverlay.style.display = "flex";
            score = 0;
            scoreDisplay.textContent = "Score: 0";
        }
    }
}




