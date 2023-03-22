/////////////////////////////////////////////////////////////
//
//
//      Color Class
//
//
/////////////////////////////////////////////////////////////
class Color {
    constructor(name) {
        this.name = name;
        this.div = document.querySelector(`.${this.name}`);
        this.sound = document.querySelector(`.${this.name} .sound`);
        //console.log(this.sound);
        this.sound.load();
    }

    // highlight color and play sound for half second
    display() {
        //console.log(this);
        this.div.classList.add('highlight');
        this.sound.play();
        setTimeout(() => {
            this.div.classList.remove('highlight');
            this.sound.currentTime = 0;
            this.sound.pause();

        }, 500);
    }
}

/////////////////////////////////////////////////////////////
//
//
//      Game Class
//
//
/////////////////////////////////////////////////////////////
class Game {
    constructor() {
        this.colors = [
            new Color('green'),
            new Color('red'),
            new Color('yellow'),
            new Color('blue')];
        this.sequence = [];
        this.userInput = [];

        this.colors.forEach(color => {
            color.div.addEventListener('click', () => {
                color.display();
                this.addToColorList(color.name);
                this.userInput.push(color);
                this.checkUserInput();
            });
        });
    }


    start() {

        this.stop();
        // enable color divs 
        this.colors.forEach(color => {
            color.div.classList.remove('disable');
        });
        this.addToSequence();
    }

    stop() {
        // disable color divs 
        this.colors.forEach(color => {
            color.div.classList.add('disable');
        });
        // reset sequence and user input
        this.sequence = [];
        this.userInput = [];
        this.clearColorList();
        this.removeMsg();
    }

    addToColorList(color) {
        const colorList = document.querySelector('.notes .colors');
        colorList.innerHTML += `<div>${color}</div>`;
    }
    clearColorList() {
        document.querySelector('.notes .colors').innerHTML = "";
    }

    checkUserInput() {
        // wait for the user to enter the correct number of
        // colors in the sequence, before checking for accuracy
        if (this.userInput.length === this.sequence.length) {
            let match = true;
            for (let i = 0; i < this.sequence.length; i++) {
                if (this.sequence[i].name != this.userInput[i].name) {
                    match = false;
                }
            }
            if (match) {
                this.displayMsg(true);
                setTimeout(() => {
                    this.userInput = [];
                    this.clearColorList();
                    this.addToSequence();
                }, 1000)
            } else {
                // no match! 
                this.displayMsg(false);
                this.userInput = [];
            }
        }
    }


    displayCorrectMsg(flag) {
        const msgDiv = document.querySelector('.message .correct');
        if (flag) {
            msgDiv.classList.remove('hidden');
            setTimeout(() => {
                msgDiv.classList.add('hidden')
            }, 1000);
        } else {
            msgDiv.classList.add('hidden');
        }
    }

    displayIncorrectMsg(flag) {
        const msgDiv = document.querySelector('.message .incorrect');
        if (flag) {
            msgDiv.classList.remove('hidden')
        } else {
            msgDiv.classList.add('hidden')

        }
    }
    displayMsg(correct) {

        if (correct) {
            this.displayCorrectMsg(true);
        } else {
            this.displayIncorrectMsg(true);
        }

    }

    removeMsg() {
        this.displayCorrectMsg(false);
        this.displayIncorrectMsg(false);
    }

    getRandomColor() {
        // return a random Color object
        let x = Math.floor(Math.random() * 4);
        return this.colors[x];
    }

    // this is a recursive function
    // that displays the color in sequence at indx, then 
    // recursively calls the function to display the next
    // color in the sequence until the end.
    displaySequence(indx) {
        //console.log(indx);
        if (indx < this.sequence.length) {

            const curColor = this.sequence[indx];
            curColor.display();
            setTimeout(() => {
                this.displaySequence(indx + 1);
            }, 500);

        } else {
            return;
        }
    }

    addToSequence() {
        this.sequence.push(this.getRandomColor());
        // display the entire sequence, starting at the beginning
        this.updateSequenceNumber();
        this.displaySequence(0);
    }

    replaySequence() {
        this.removeMsg();
        this.userInput = [];
        this.clearColorList();
        this.displaySequence(0);
    }
    updateSequenceNumber() {
        const num = document.querySelector('.notes .num');
        num.innerText = this.sequence.length;
    }
}
/////////////////////////////////////////////////////////////
//
//
//      Main Code
//
//
/////////////////////////////////////////////////////////////
// declare game
// start and stop button event handles

let game = new Game();
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const replayBtn = document.querySelector('.replay');

startBtn.addEventListener('click', () => {
    game.start();
})

stopBtn.addEventListener('click', () => {
    game.stop();
})

replayBtn.addEventListener('click', () => {
    game.replaySequence();
})