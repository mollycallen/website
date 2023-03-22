import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

let gameActive = false;

const levelInput = document.getElementById("level")
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const playerEndZone = document.getElementById("player-endzone");
const computerEndZone = document.getElementById("computer-endzone")
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn")


let lastTime;
function update(time) {
    if (gameActive) {
        if (lastTime != null) {
            const delta = time - lastTime;
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            computerPaddle.update(delta, ball.y)

            if (isLose()) {
                handleLose();
            }
        }
    }
    lastTime = time;
    window.requestAnimationFrame(update);

}
function isLose() {
    const rect = ball.rect();
    return (rect.right >= window.innerWidth || rect.left <= 0)

}
function handleLose() {
    const rect = ball.rect();
    let zone;
    if (rect.right >= window.innerWidth) {
        //player scored
        //console.log('player scored')
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
        zone = computerEndZone
    } else {
        //computer scored
        //console.log('computer scored')

        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
        zone = playerEndZone;
    }

    // pause game and highlight endzone
    zone.style.display = "block"
    gameActive = false;
    setTimeout(() => {
        zone.style.display = "none"
        gameActive = true;

    }, 1000)
    ball.reset();
    playerPaddle.reset();
    computerPaddle.reset();

}

startBtn.addEventListener("click", () => {
    gameActive = true;
    startBtn.style.display = "none"
    stopBtn.style.display = "block"
    // console.log("start game")
})
stopBtn.addEventListener('click', () => {
    gameActive = false;
    stopBtn.style.display = "none";
    startBtn.style.display = "block"
    // console.log("stop game")


})
levelInput.addEventListener("change", e => {
    // this function changes the accuracy (or level) of the computer
    // and the height of the player's paddle
    playerPaddle.updateLevel(levelInput.value);
    computerPaddle.updateLevel(levelInput.value);
})
document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})
window.requestAnimationFrame(update);

