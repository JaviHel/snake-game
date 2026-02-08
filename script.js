const gameContainer = document.getElementById('game-container')
const tailsContainer = document. getElementById('tails-container')
const snake = document.querySelector('.snake')
const food = document.querySelector('.food')
const scoreNum = document.querySelector('.score-num')
const hiScoreNum = document.querySelector('.hi-score-num')

// Show Last Hi-Score
hiScoreNum.innerText = localStorage.getItem('snake-hi-score')

// StartGame Bttn
function startGame(e) {
    if (e.key=='Enter') {frames();stick=2;
    removeEventListener('keydown', startGame)
    }
}; addEventListener('keydown', startGame)

// Food Random Position y
function rndmPstnY() {
    let hgtArr=[]
    for (let i = 0; i < 384; i+=16) {
        hgtArr.push(i)
    };let rndmNmbr = Math.floor(Math.random()*24)
    return hgtArr[rndmNmbr]
}; food.style.top = rndmPstnY() + 'px'

// Food Random Position x
function rndmPstnX() {
    let wthArr=[]
    for (let i = 0; i < 512; i+=16) {
        wthArr.push(i)
    }; let rndmNmbr = Math.floor(Math.random()*32)
    return wthArr[rndmNmbr]
}; food.style.left = rndmPstnX() + 'px'
    
// Frames Variables - 01=vFast 60=vSlow
let fps=0, speed=16, idsArr=[];

// Snake Head Properties
let x=rndmPstnX(), y=rndmPstnY(), w=16, h=16;
let stick=0, range=16, tailLength=2, spdUp=0;
    
// Snake Initial Position
snake.style.top = y + 'px';
snake.style.left = x + 'px';
    
// Snake Controller
addEventListener('keydown', moveU)
function moveU(e) {if (e.key==='w') {stick=1};}
addEventListener('keydown', moveR)
function moveR(e) {if (e.key==='d') {stick=2};}
addEventListener('keydown', moveD)
function moveD(e) {if (e.key==='s') {stick=3};}
addEventListener('keydown', moveL)
function moveL(e) {if (e.key==='a') {stick=4};}

function addUp() {addEventListener('keydown', moveU)}
function addRight() {addEventListener('keydown', moveR)}
function addDown() {addEventListener('keydown', moveD)}
function addLeft() {addEventListener('keydown', moveL)}

function removeUp() {removeEventListener('keydown', moveU)}
function removeRight() {removeEventListener('keydown', moveR)}
function removeDown() {removeEventListener('keydown', moveD)}
function removeLeft() {removeEventListener('keydown', moveL)}

                
function animate() {
    // Tail Creator
    let tail = document.createElement('div')
    tail.classList.add('tail')
    tailsContainer.append(tail)
    // Tail Position
    tail.style.top = y + 'px'; tail.style.left = x + 'px'
    // Change tail length
    const tails = document.querySelectorAll('.tail')
    tails.length>tailLength? tailsContainer.firstChild.remove(): false;
    
    // Snake Head Movement
    if (stick==1) {y-=range; removeDown(); addRight(); addLeft()} 
    if (stick==2) {x+=range; removeLeft(); addUp(); addDown()} 
    if (stick==3) {y+=range; removeUp(); addRight(); addLeft()}
    if (stick==4) {x-=range; removeRight(); addUp(); addDown()}
    snake.style.top = y + 'px'; snake.style.left = x + 'px';
    // Snake trasspass the limits gameOver 
    x < 0? gameOver():  x+w > 512? gameOver():
    y < 0? gameOver():  y+h > 385? gameOver():  false;
    // Snake touches it self gameOver
    tails.forEach(tail=>{
    if (parseInt(snake.style.left)==parseInt(tail.style.left)&&
        parseInt(snake.style.top)==parseInt(tail.style.top)) {
            gameOver();
        }})
    
    // Food Properties Updated
    let theFood = {
        x:parseInt(getComputedStyle(food).left),
        y:parseInt(getComputedStyle(food).top),
        w:parseInt(getComputedStyle(food).width),
        h:parseInt(getComputedStyle(food).height),
    }
    // The snake eats the food
    if (x+w <= theFood.x || x >= theFood.x+theFood.w ||
        y+h <= theFood.y || y >= theFood.y+theFood.h) {// No Collision
    } else { // Redrawing a new food randomly
        food.style.display = 'none'
        food.style.top = rndmPstnY() + 'px'
        food.style.left = rndmPstnX() + 'px'
        food.style.display = 'unset'
        tailLength+=1
        scoreNum.innerText++; saveScore();
        spdUp+=1
        if (spdUp==3) {spdUp=0; speed-=1}
        if (speed<2) {speed=2;};
    }
}
// GameOver
function gameOver() {
    addResetBttn();
    idsArr.forEach(id=>{cancelAnimationFrame(id)});
}
// Save Score
function saveScore() {
    let score = parseInt(scoreNum.innerText)
    if (score > parseInt(hiScoreNum.innerText)) {
    localStorage.setItem('snake-hi-score', score)
    } 
}; hiScoreNum.innerText = parseInt(0+localStorage.getItem('snake-hi-score'))
// Reset Bttn
const addResetBttn=()=>{addEventListener('keydown', resetGame)}
const resetGame=(e)=>{e.key=="Enter"? window.location.reload(): false;}
// Animation Frames
function frames() { id = requestAnimationFrame(frames); idsArr.push(id);
    fps+=1; if (fps/speed==1) {animate();fps=0}
}
