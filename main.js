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
    
}
// function clearSelected() {
//     page0btn.classList.remove("selected");
//     page1btn.classList.remove("selected");
//     page2btn.classList.remove("selected");
//     page3btn.classList.remove("selected");
// }

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page0btn.addEventListener("click", function () {
    show(0);
})
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



// const content0btn = document.querySelector("#content0btn");
// const allsub = document.querySelectorAll(".sub");
//
// // Make sure all .sub elements are hidden initially
// allsub.forEach(function(sub) {
//   sub.classList.remove("show");
// });
//
// content0btn.addEventListener("click", function() {
//   // Add the 'show' class to each .sub to trigger animation
//   allsub.forEach(function(sub, index) {
//     setTimeout(function() {sub.classList.add("show");}, index * 1000); // Delay each one slightly for a staggered effect
//   });
//
//   content0btn.style.display = "none";
// });


// function hideAllSub() {
//     for (let onesub of allsub) {
//         onesub.style.display = "none";
//     }
// }
// function showAllSub() {
//     for (let onesub of allsub) {
//         onesub.style.display = "block";
//     }
// }
// // Hide all subcontent
// hideAllSub();
// // Show all subcontent
// content0btn.addEventListener("click", function () {
//     showAllSub();
//     content0btn.style.display = "none"; // Optional: hide the button
// });


// Ball

/*find references to all the buttons and ball */
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#ball");
var ballX = ballY = 0; //assign initial position of ball

function ResetPos() {
    ballX=ballY=0; //reset to zero
    ball.style.left = ballX+"px"; //set left property to ball x variable
    ball.style.top = ballY+"px"; //set top property to ball x variable
    ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}
function MovePos(leftInc, topInc) {
    ballX =ballX+ leftInc;
    ballY =ballY+ topInc;
    ball.style.left = ballX+"px"; //set left css property to ball x variable
    ball.style.top = ballY+"px"; //set top css property to ball y variable
    ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}

function MoveLeft(){
    ballX =ballX-10; //decrement by 10
    ballY =ballY+0; //no change
    ball.style.left = ballX+"px"; //set left css property to ball x variable
    ball.style.top = ballY+"px"; //set top css property to ball y variable
    ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}

//eventlistener to activate MoveLeft (named callback function)
leftBtn.addEventListener("click", MoveLeft); //no brackets after MoveLeft
//eventListener to anonymous callback function (other way)
rightBtn.addEventListener("click", function () {
    MovePos(10, 0);
});
upBtn.addEventListener("click", function () {
    MovePos(0, -10);
});
downBtn.addEventListener("click", function () {
    MovePos(0, 10);
});
resetBtn.addEventListener("click", ResetPos);

document.addEventListener('keydown', function (kbEvt) {
//kbEvt: an event object passed to callback function
console.log(kbEvt); //see what is returned
if (kbEvt.code === "ArrowRight"){
    MovePos(10,0);
}
if (kbEvt.code === "ArrowLeft"){
    MoveLeft();
}
if (kbEvt.code === "ArrowDown"){
    MovePos(0, 10);
}
if (kbEvt.code === "ArrowUp"){
    MovePos(0, -10);
}
//Better option: use switch case instead
});



//define more variables and constants
var velX,velY;
const minLeft=10, minTop=0;
const maxTop=480, maxLeft=1270;
//function to pick random number from a min-max range
function RandomRange(min,max){
    return Math.round(Math.random()*(max-min)+min);
}

//callback function for setInterval
function MoveIt(){
MovePos(velX,velY); //move at random velocity picked earlier
}

//Modify StartAutoMove function
function StartAutoMove(){
    velX=RandomRange(1,2);
    velY=RandomRange(1,2);
    //setInterval(MoveIt,100); don't use this anymore
    setInterval(MovePosWifCollision,10); //use this instead
}



/* Move Pos function with collision check and reaction*/
function MovePosWifCollision(){
    ballX += velX;
    ballY += velY;
    MovePos(velX,velY);
    /*check if reach min/max left/top and flip velocity*/
    if(ballX>maxLeft){
        velX=-velX; //reverse the X velocity
        ballX=maxLeft; //snap ballX to maxLeft
    }
    if(ballY>maxTop){
        velY=-velY;
        ballY=maxTop; //snap ballY to maxTop
    }
    if(ballX<minLeft){
        velX=-velX;
        ballX=minLeft;
    }
    if(ballY<minTop){
        velY=-velY;
        ballY=minTop;
    }
    UpdateBallStyle();
}

StartAutoMove(); //invoke the function to activate automove



