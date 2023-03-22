import { setCustomProperty, incrementCustomProperty, getCustomProperty } from "./updateCustomProperty.js";

const SPEED = .05;
const CACTUS_INTERVAL_MIN = 800;
const CACTUS_INTERVAL_MAX = 1600;
const CACTUS_SCALE_MIN = .3;
const CACTUS_SCALE_MAX = 1.2;

const worldElem = document.querySelector('[data-world]');

let nextCactusTime;
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN;
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove();
    })
}

export function updateCactus(delta, speedScale) {

    document.querySelectorAll("[data-cactus").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);

        if (getCustomProperty(cactus, "--left") <= -100) {
            cactus.remove();
        }
    })
    if (nextCactusTime <= 0) {
        createCactus();
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
    }
    nextCactusTime -= delta;
}
export function getCactus() {
    return document.querySelectorAll('[data-cactus');
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

export function setCactusLose(cactus) {

    const val = cactus.style.getPropertyValue("transform") + " rotate(30deg)";
    //console.log(val);
    cactus.style.setProperty("transform", val);
}
function createCactus() {
    const cactus = document.createElement("img");
    cactus.dataset.cactus = true;
    cactus.src = "imgs/cactus.png";
    cactus.classList.add("cactus");
    cactus.style.setProperty("transform", `scale(${randomNumberBetween(CACTUS_SCALE_MIN, CACTUS_SCALE_MAX)})`);
    setCustomProperty(cactus, "--left", 100);
    worldElem.append(cactus);

}

function randomNumberBetween(min, max) {
    return (Math.random() * (max - min) + min)
}