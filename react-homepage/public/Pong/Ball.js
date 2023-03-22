
const INITIAL_VELOCITY = 0.05;
const VELOCITY_INCREASE = .005;
export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }
    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }
    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }
    rect() {
        return this.ballElem.getBoundingClientRect();
    }
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 }
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITIAL_VELOCITY;

    }
    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;

        const rect = this.rect();
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }

        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1;

            // increase velocity with each paddle collison
            this.velocity += VELOCITY_INCREASE;

            // change hue slightly with each paddle collison
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));

            document.documentElement.style.setProperty("--hue", hue + delta * .25)
        }
    }
}
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}
function isCollision(rect1, rect2) {
    return (rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top)
}