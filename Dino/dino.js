import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const dinoElem = document.querySelector('[data-dino]');
const JUMP_SPEED = .3;
const JUMP_INC = .0005;
const GRAVITY = .001;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
let prevJumpTime;

export function setupDino() {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    prevJumpTime = 0;
    dinoElem.classList.remove('crash')
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}
export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect();
}
export function setDinoLose() {
    dinoElem.src = "imgs/dino-lose.png";
    dinoElem.classList.add("crash")
}
function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = 'imgs/dino-stationary.png';
        return;
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
        dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
    if (!isJumping) return;

    incrementCustomProperty(dinoElem, "--bottom", (yVelocity * delta));



    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0);
        isJumping = false;
    }
    yVelocity -= GRAVITY * delta;
}

function onJump(e) {


    if (e.code !== "Space") return;
    // if we're already jumping
    if (isJumping) {
        //jump a little higher
        const diff = e.timeStamp - prevJumpTime;
        //console.log(diff);
        yVelocity += JUMP_INC * diff;
    } else {
        yVelocity = JUMP_SPEED;
        isJumping = true;
    }
    prevJumpTime = e.timeStamp;
}

