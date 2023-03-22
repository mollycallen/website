import { setupGround, updateGround } from './ground.js';
import { setupDino, updateDino, getDinoRect, setDinoLose } from './dino.js';
import { setupCactus, updateCactus, getCactusRects, setCactusLose, getCactus } from './cactus.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = .000005;
const ALLOWANCE = 5;

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score');
const startBtn = document.querySelector('[data-start-btn]');
setPixelToWorldScale();

window.addEventListener("resize", setPixelToWorldScale);
startBtn.addEventListener("click", handleStart);


let lastTime;
let speedScale;
let score;
function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);

    const cactus = checkForCollison();
    if (cactus) {
        handleLose(cactus);
        return;
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

function checkForCollison() {
    const dinoRect = getDinoRect();
    let crashCactus;
    getCactus().forEach(cactus => {
        if (isCollison(dinoRect, cactus.getBoundingClientRect())) {
            crashCactus = cactus;
        }
    });
    return crashCactus;
}

function isCollison(dino, cactus) {
    // console.log(`dino: left${dino.left}, right${dino.right} top${dino.top}, bottom${dino.bottom}`);

    // console.log(`cactus: left${cactus.left}, right${cactus.right} top${cactus.top}, bottom${cactus.bottom}`);

    return (
        dino.right - ALLOWANCE > cactus.left &&
        dino.left + ALLOWANCE < cactus.right &&
        dino.bottom - ALLOWANCE > cactus.top);

}
function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE;

}
function updateScore(delta) {
    score += delta * .01;
    scoreElem.textContent = Math.floor(score);
}
function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    startBtn.classList.add("hide");
    setupGround();
    setupDino();
    setupCactus();
    window.requestAnimationFrame(update);
}

function handleLose(cactus) {
    setDinoLose();
    setCactusLose(cactus);
    startBtn.classList.remove("hide");

}
function setPixelToWorldScale() {
    let worldToPixelScale;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }
    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}