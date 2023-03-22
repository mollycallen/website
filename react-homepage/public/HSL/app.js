
INITIAL_HUE = 100;
INITIAL_SAT = 50;
INITIAL_LIGHT = 50;

let hue;
let sat;
let light;

const hueRange = document.querySelector(".hue-container .range");
const satRange = document.querySelector(".sat-container .range")
const lightRange = document.querySelector(".light-container .range")

const hslColor = document.querySelector(".hsl-color");
const hslValue = document.querySelector(".hsl-value");
const hueLine = document.querySelector(".hue-container .line");
const satLine = document.querySelector(".sat-container .line");
const lightLine = document.querySelector(".light-container .line");

const huePopup = document.querySelector('.hue-container .popup');
const satPopup = document.querySelector('.sat-container .popup');
const lightPopup = document.querySelector('.light-container .popup');



setup();


function setup() {

    hue = INITIAL_HUE;
    sat = INITIAL_SAT;
    light = INITIAL_LIGHT;
    hueLine.style.left = `${hue * getRangeItemWidth(hueLine)}px`;
    satLine.style.left = `${sat * getRangeItemWidth(satLine)}px`;
    lightLine.style.left = `${light * getRangeItemWidth(lightLine)}px`;

    updateHSL();

    // setup hue range
    for (let i = 0; i < 360; i++) {
        const hue = document.createElement("div");
        hue.style.background = `hsl(${i}, ${sat}%, ${light}%)`;
        hue.setAttribute("data-value", i);
        hue.classList.add("hue");
        hue.addEventListener("click", changeHue);
        hueRange.append(hue);
    }
    // setup saturation range
    for (let i = 0; i <= 100; i++) {
        const sat = document.createElement("div");
        sat.style.background = `hsl(${hue},${i}%,${light}%)`;
        sat.setAttribute("data-value", i);
        sat.classList.add("sat");
        sat.addEventListener("click", changeSat);
        satRange.append(sat);
    }
    // setup lightness range
    for (let i = 0; i <= 100; i++) {
        const light = document.createElement("div");
        light.style.background = `hsl(${hue},${sat}%,${i}%)`;
        light.setAttribute("data-value", i);
        light.classList.add("light");
        light.addEventListener("click", changeLight);
        lightRange.append(light);
    }

    // show popups
    showHuePopup();
    showSatPopup();
    showLightPopup();
}

// ----------------------------------------
//
// HUE Functions
//
// ----------------------------------------
function changeHue(e) {
    hue = e.target.getAttribute("data-value");
    const width = getRangeItemWidth(hueLine);
    hueLine.style.left = `${hue * width}px`;
    huePopup.textContent = hue;
    huePopup.style.left = hueLine.style.left;

    updateHSL();
    updateSat();
    updateLight();
}
function showHuePopup() {
    huePopup.textContent = hue;
    huePopup.style.left = hueLine.style.left;
}

// ----------------------------------------
//
// SATUATION Functions
//
// ----------------------------------------
function changeSat(e) {
    sat = e.target.getAttribute("data-value");
    const width = getRangeItemWidth(satLine);
    satLine.style.left = `${sat * width}px`;
    showSatPopup();
    updateHSL();
}
function showSatPopup() {
    satPopup.textContent = `${sat}%`;
    satPopup.style.left = satLine.style.left;
}
function updateSat() {
    // update saturation range
    for (let i = 0; i <= 100; i++) {
        const sat = satRange.querySelector(`[data-value='${i}']`);
        sat.style.background = `hsl(${hue},${i}%,${light}%)`;
    }
}
// ----------------------------------------
//
// LIGHTNESS Functions
//
// ----------------------------------------
function changeLight(e) {
    light = e.target.getAttribute("data-value");
    const width = getRangeItemWidth(lightLine);
    lightLine.style.left = `${light * width}px`;
    showLightPopup();
    updateHSL();
}
function showLightPopup() {
    lightPopup.textContent = `${light}%`;
    lightPopup.style.left = lightLine.style.left;
}
function updateLight() {
    // update lightness range
    for (let i = 0; i <= 100; i++) {
        const light = lightRange.querySelector(`[data-value='${i}']`);
        light.style.background = `hsl(${hue},${sat}%,${i}%)`;
    }
}

// ----------------------------------------
//
// HSL Functions
//
// ----------------------------------------

function updateHSL() {
    const hsl = `hsl(${hue}, ${sat}%, ${light}%)`
    hslColor.style.background = hsl;
    hslValue.textContent = hsl;
}

// ----------------------------------------
//
// Helper Functions
//
// ----------------------------------------
function getRangeItemWidth(el) {
    return getComputedStyle(el).getPropertyValue('--range-item-width');
}

