const SPEED = [.005, .0075, .01, .015, .02];
const PADDLE_HEIGHT = [30, 25, 20, 15, 10];
const INITIAL_LEVEL = 3;

export default class Paddle {

    constructor(paddleElem) {
        this.paddleElem = paddleElem;
        this.level = INITIAL_LEVEL;
        this.reset();
    }
    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }
    set position(value) {
        this.paddleElem.style.setProperty("--position", value)

    }
    set height(value) {
        this.paddleElem.style.setProperty("--height", value);
    }
    rect() {
        return this.paddleElem.getBoundingClientRect();
    }
    reset() {
        this.height = PADDLE_HEIGHT[this.level - 1];
        this.position = 50;
    }
    updateLevel(level) {
        this.level = level;
        this.height = PADDLE_HEIGHT[level - 1];
    }
    update(delta, ballHeight) {
        // this is only called to update the computer's paddle;
        // the player controls their paddle with their mouse
        // the computer needs to be able to lose...
        // the smaller the SPEED variable, the more likely the 
        // the computer will lose 

        this.position += SPEED[this.level - 1] * delta * (ballHeight - this.position)
    }

}