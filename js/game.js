//=================================
// VARIABLES
//=================================

const canvas = document.getElementById("gameScreen");

const ctx = canvas.getContext("2d", { alpha: false });

const gameWidth = 800;

const gameHeight = 600;

// characters starting position on canvas
let xCharacter = 0;

let yCharacter = 250;

// pace of moving up and down
let characterSpeed = 4;

let xBg = 0;

let yBg = 0;

// score displaying on canvas
let counter = 0;

let showScore = document.getElementById("score");

let showLevel = document.getElementById("level");

// variable to see if key up/down was pressed
let keydown = 0;

// current state of a game, 0: start, 1: running, 2: pause, 3: game over
let gameState = 0;

// array with obstacles appearing on the screen
let obstacles = [];

// frequency of obstacles appearing on the screen
let obstacleFrequency = 110;

let level = 1;

// gap between upper and lower obstacle
let spacing = 275;

// speed of approaching obstacle
let speed = 6;

let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

//=================================
// IMAGES
//=================================

const imgCharacter = new Image();
imgCharacter.src = "../img/character.png";

const imgObstacle = new Image();
imgObstacle.src = "../img/obstacle.png";

const imgCanvasDay = new Image();
imgCanvasDay.src = "../img/canvas.png";

const imgCanvasNight = new Image();
imgCanvasNight.src = "../img/canvasNight.png";

let imgCanvasDefault = new Image();
imgCanvasDefault.src = "../img/canvas.png";

//=================================
// SOUNDS
//=================================

bgMusic = new sound("../audio/background.mp3");

gameOverSound = new sound("../audio/gameover.mp3");

menuMusic = new sound("../audio/menu.mp3");

//==================================================================
// CREATES LOCAL STORAGE FOR AUDIO IF IT WAS NOT CREATED BEFORE
//==================================================================

if(!localStorage.getItem("audio")) {
    localStorage.setItem("audio", "1")
}

//================================================================================
// CREATES LOCAL STORAGE FOR DIFFICULTY LEVEL AND KEEP HIGHLIGHTED SELECTED CHOICE
//================================================================================

if(!localStorage.getItem("difficultyLevel")) {
    localStorage.setItem("difficultyLevel", "Easy")
}

if(localStorage.difficultyLevel == "Easy") {
    easy.style.backgroundColor = "rgba(150,150, 200,0.75)";
    easy.style.borderRadius = "15px";
}

if(localStorage.difficultyLevel == "Medium") {
    medium.style.backgroundColor = "rgba(150,150, 200,0.75)";
    medium.style.borderRadius = "15px";
}

if(localStorage.difficultyLevel == "Hard") {
    hard.style.backgroundColor = "rgba(150,150, 200,0.75)";
    hard.style.borderRadius = "15px";
}

//=================================
// REFRESHES THE CANVAS
//=================================

function clearCanvas() {
    ctx.clearRect(0, 0, 800, 800)
}

//=================================
// INCREASES THE SCORE
//=================================

function increaseCounter() {
    if (gameState == 0 || gameState == 2 || gameState == 3) return;
    counter += 1;
    showScore.innerHTML = counter;
}

//====================================================
// INCREASES LEVEL && DECREASES GAP BETWEEN OBSTACLES
//====================================================

function increaseLevel() {
    if (gameState == 0 || gameState == 2 || gameState == 3) return;
    showLevel.innerHTML = "LEVEL " + level;
    if (counter % 250 == 0) {
        spacing -= 25;
        showLevel.innerHTML = level++
    }
}

//=================================
// MOVEMENT FUNCTIONS
//=================================

function goingUp() {
    yCharacter -= characterSpeed;
}

function goingDown() {
    yCharacter += characterSpeed;
}

//=================================
// FUNCTION TO CREATE SOUNDS
//=================================

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

//=================================
// SOUND ICON
//=================================

function volumeToggle() {
    
    if (volume.className == "fa fa-volume-off") {
        volume.className = "fa fa-volume-up";
        localStorage.setItem("audio", "1");
        menuMusic.play();
        
    } else {
        volume.className = "fa fa-volume-off"
        localStorage.setItem("audio", "0");
        menuMusic.stop();
        bgMusic.stop();
        gameOverSound.stop();
        }
}

//=================================
// OBSTACLES
//=================================

function Obstacle() {

    this.top = Math.random() * (gameHeight / 6, 3 / 4 * gameHeight);
    this.bottom = gameHeight - (this.top + spacing);
    this.x = gameWidth;
    this.w = 50;

    this.newObstacle = function() {
        if (gameState == 1) {
            ctx.drawImage(imgObstacle, this.x, 0, this.w, this.top);
            ctx.drawImage(imgObstacle, this.x, gameHeight - this.bottom, this.w, this.bottom);
            this.x = this.x - speed;
        }
    }
    
    this.out = function() {
        if (this.x < -50) {
            return true;
        } else {
            return false;
        }
    }

    this.hit = function() {
        if (yCharacter < this.top && localStorage.audio == "1" || yCharacter > gameHeight - (this.bottom + 75) &&  localStorage.audio == "1") {
            if (xCharacter > this.x - 100 && xCharacter < (this.x - 100) + this.w) {
                menuMusic.stop();
                bgMusic.stop();
                gameOverSound.play();
                return true;
            }
        } else if(yCharacter < this.top && localStorage.audio == "0" || yCharacter > gameHeight - (this.bottom + 75) &&  localStorage.audio == "0"){
            if (xCharacter > this.x - 100 && xCharacter < (this.x - 100) + this.w) {
                return true;
            }
        }
    }
}

//=================================
// MOVING CANVAS
//=================================

function movingBackground() {
    if (gameState == 0 || gameState == 2 || gameState == 3) return;
    xBg -= 1;
    if (xBg < -400) {
        xBg = 0
    }
}

//=================================
// FUNCTION DRAWS NEW OBSTACLE
//=================================

function drawNewObstacle(){
    if (counter == 1 || counter % obstacleFrequency == 0) {
        obstacles.push(new Obstacle())
        }
}

//================================================================================
// LOOP REMOVES OBSTACLES OUTSIDE THE CANVAS AND TO CHECK FOR GAME OVER ON HIT
//================================================================================

function rmvObstaclesAndHitCheck(){
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].newObstacle();

    if (obstacles[i].out()) {
        obstacles.splice(i, 1)
        }
            
    if (obstacles[i].hit()) {
        gameState = 3;
        }
    }
}

//=================================
// FUNCTION TO DRAW 
//=================================

function draw() {

    if (gameState == 0) {
        ctx.drawImage(imgCanvasDefault, xBg, yBg);
        return;
    } else if (gameState == 2) {
        pause.style.display = "block";
        return;
    } else if (gameState == 3) {
        over.style.display = "block"; 
        save.style.display = "block";
        mainMenu.style.display = "block";
        return;
    } else if (gameState == 1 && localStorage.audio == "1" || gameState == 1 && localStorage.audio == "1" ) {
        pause.style.display = "none";
        checkDifficultyLevel();
        clearCanvas();
        bgMusic.play();
        menuMusic.stop();
        ctx.drawImage(imgCanvasDefault, xBg, yBg);
        ctx.drawImage(imgCharacter, xCharacter, yCharacter);
        drawNewObstacle();
        rmvObstaclesAndHitCheck();
    } else {
        checkDifficultyLevel();
        clearCanvas();
        ctx.drawImage(imgCanvasDefault, xBg, yBg);
        ctx.drawImage(imgCharacter, xCharacter, yCharacter);
        drawNewObstacle();
        rmvObstaclesAndHitCheck();
    }
}

//=================================
// GAME OVER FUNCTION
//=================================

function gameOver() {
    if (yCharacter > 520 && gameState == 1 && localStorage.audio == "1"|| yCharacter < 0 && gameState == 1 && localStorage.audio == "1") {
        menuMusic.stop();
        bgMusic.stop();
        gameOverSound.play();
        gameState = 3;
    } else if (yCharacter > 520 && gameState == 1 && localStorage.audio == "0"|| yCharacter < 0 && gameState == 1 && localStorage.audio == "0"){
        gameState = 3;
    }
}

//=================================
// SAVES SCORE
//=================================
 
 function saveScore() {
    
    if (localStorage.loggedInUserID != undefined){
        
    let score = {
    userID: localStorage.loggedInUserID,
    score: counter,
    difficulty: localStorage.difficultyLevel,
    }
    
    ranking.push(score);
    ranking.sort(function(a,b){return b.score - a.score});
    ranking.splice(10);
    localStorage.setItem("ranking", JSON.stringify(ranking));
    location.reload();
        
    } else {
        alert("You need to login to have your score saved.");
    }
}

//=============================================
// FUNCTION TO START CORRECT DIFFICULTY LEVEL   
//=============================================

function checkDifficultyLevel() {
    if(localStorage.difficultyLevel == "Easy"){
        obstacleFrequency = 110;
    } else if(localStorage.difficultyLevel == "Medium"){
        obstacleFrequency = 80;
    } else {
        obstacleFrequency = 60;
    }
}

//=================================
// FUNCTION TO CHANGE CANVAS    
//=================================

function changeCanvas(){
    if (counter > 250 && counter < 500 || counter > 750 && counter < 1000 || counter > 1250 && counter < 1500) {
        imgCanvasDefault = imgCanvasNight;
    } else {
        imgCanvasDefault = imgCanvasDay;
    }
}

//=================================
// KEY EVENTS
//=================================

document.addEventListener('keydown', (event) => {
    
    if (event.key === 'ArrowDown') {
        down = true;
        up = false;
    } else if (event.key === 'ArrowUp') {
        up = true;
        down = false;
    }else if (event.key === 'Escape' && gameState == 1) {
        gameState = 2;
        bgMusic.stop();
    } else if (event.key === 'Escape' && gameState == 2) 
        gameState = 1;
        pause.style.display = "none";
    }
)

//=================================
// MENU OPTIONS
//=================================

function startClick(){
    gameState = 1;
    menu.style.display = "none";
    start.style.display = "none";
    instructions.style.display = "none";
    difficulty.style.display = "none";
    difficultyChoice.style.display = "none";
}

function instructionsClick(){
    menu.style.display = "none";
    start.style.display = "none";
    instructions.style.display = "none";
    difficulty.style.display = "none";
    instructionsContent.style.display = "block";
    back.style.display = "block";
    difficultyChoice.style.display = "none";
}

function backClick(){
    menu.style.display = "block";
    start.style.display = "block";
    instructions.style.display = "block";
    difficulty.style.display = "block";
    difficultyChoice.style.display = "block";
    instructionsContent.style.display = "none";
    back.style.display = "none";
}

function easyClick(){
    localStorage.setItem("difficultyLevel", "Easy")
    easy.style.backgroundColor = "rgba(150,150, 200,0.75)";
    hard.style.backgroundColor = "rgba(0, 0, 0, 0)";
    medium.style.backgroundColor = "rgba(0, 0, 0, 0)";
    easy.style.borderRadius = "15px";
}

function mediumClick(){
    localStorage.setItem("difficultyLevel", "Medium")
    medium.style.backgroundColor = "rgba(150,150, 200,0.75)";
    easy.style.backgroundColor = "rgba(0, 0, 0, 0)";
    hard.style.backgroundColor = "rgba(0, 0, 0, 0)";
    medium.style.borderRadius = "15px";
}

function hardClick(){
    localStorage.setItem("difficultyLevel", "Hard")
    hard.style.backgroundColor = "rgba(150,150, 200,0.75)";
    easy.style.backgroundColor = "rgba(0, 0, 0, 0)";
    medium.style.backgroundColor = "rgba(0, 0, 0, 0)";
    hard.style.borderRadius = "15px";
}

//=================================
// PREVENTS PAGE FROM SCROLLING
//=================================
    
window.addEventListener("keydown", function(e) {
    if([32, 38, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault(); 
    }
}, false)

//===============================================
//  CHECKS FOR AUDIO WHETHER IT WAS MUTED OR NOT
//===============================================

if(localStorage.audio == "1"){
    menuMusic.play();
}

if(localStorage.audio == "0"){
    volume.className = "fa fa-volume-off";
}

//=================================
// FUNCTION STARTS THE GAME
//=================================

let lastFrameTimeMs = 0;
let maxFPS = 60;

let up = false;
let down = false;

function startGame(timestamp) {
    
    if (timestamp < lastFrameTimeMs + (500 / maxFPS)) {
        requestAnimationFrame(startGame);
        return;
        }
    
    if (up && gameState == 1){
        yCharacter -= characterSpeed
        }
    
    if (down && gameState == 1){
        yCharacter += characterSpeed
        }
    
    lastFrameTimeMs = timestamp;
    increaseCounter();
    increaseLevel();
    draw();
    gameOver();
    movingBackground();
    changeCanvas();
    requestAnimationFrame(startGame);
}
 
requestAnimationFrame(startGame);