// dom elements
const newGameBtn = document.querySelector('.new-game');
const scoreSpan = document.querySelector('.score .tries');
const levelInput = document.getElementById('level-input');
const kudosDiv = document.querySelector('.kudos');

// kudos array
const kudos = ["Well Done", "Excellent", "Good Job",
    "Nice", "Way to Go", "Great", "Outstanding", "Bravo", "Keep it up", "You got it"];

// available images
const images = [
    { name: "tiger", file: "./imgs/tiger.jpg" },
    { name: "cat", file: "./imgs/cat.jpg" },
    { name: "koala", file: "./imgs/koala.jpg" },
    { name: "penquin", file: "./imgs/penquin.jpg" },
    { name: "giraffe", file: "./imgs/giraffe.jpg" },
    { name: "elephant", file: "./imgs/elephant.jpg" },
    { name: "bull", file: "./imgs/bull.jpg" },
    { name: "deer", file: "./imgs/deer.jpg" },
    { name: "zebra", file: "./imgs/zebra.jpg" },
    { name: "dog", file: "./imgs/dog.jpg" },
    { name: "rabbit", file: "./imgs/rabbit.jpg" },
    { name: "panda", file: "./imgs/panda.jpg" }];



class MemoryGame {

    constructor(numImages) {
        this.deck = [];
        this.score = 0;
        this.imgArray = [];
        this.score = 0;
        this.selected = [];
        this.numImages = numImages;
        this.getRandomImages();
        this.shuffle();
    }

    reset(numImages) {
        this.deck = [];
        this.score = 0;
        this.imgArray = [];
        this.score = 0;
        this.selected = [];
        this.numImages = numImages;
        this.getRandomImages();
        this.shuffle();
    }

    getRandomImages() {
        let temp = [];
        images.forEach(img => {
            temp.push(img);
        });

        for (let i = 0; i < this.numImages; i++) {
            let x = Math.floor(Math.random() * temp.length);
            this.imgArray.push(temp[x]);
            temp.splice(x, 1);
        }
        //console.log(this.imgArray);
    }


    shuffle() {
        // The goal of this function is to randomly 
        // populate 'deck' with two of each image 
        // in the images array.

        let temp = [];
        this.imgArray.forEach(element => {
            temp.push(element);
            temp.push(element);

        });

        while (temp.length > 0) {
            // get a random index, push into onto deck,
            // remove index from temp
            const x = Math.floor(Math.random() * temp.length);
            this.deck.push(temp[x]);
            temp.splice(x, 1);
        }
        //console.log(this.deck);
    }

}


function displayKudos() {
    const x = Math.floor(Math.random() * kudos.length);
    kudosDiv.innerHTML = kudos[x] + "!";

    kudosDiv.style.left = mousePos[0] + "px";
    kudosDiv.style.top = mousePos[1] + "px";
    setTimeout(() => {
        kudosDiv.style.display = "flex";
        setTimeout(() => {
            kudosDiv.style.display = "none";
        }, 1000);
    }, 500);
}
function checkForMatch() {
    const card1 = game.selected[0].classList[1];
    const card2 = game.selected[1].classList[1];

    // if cards match, reset 'selected' array,
    // display kudos window
    if (card1 === card2) {
        game.selected = [];
        // display kudos!!
        displayKudos();

    } else {
        // if no match, flip cards over,
        //reset 'selected' array after short delay
        setTimeout(() => {
            game.selected.forEach(item => {
                item.parentNode.classList.remove('flipped');
            });
            game.selected = [];
        }, 1000);
    }
}
function getGridDimensions(numCards) {
    switch (numCards) {
        case 8: return { cols: 4, rows: 2 };
        case 10: return { cols: 5, rows: 2 };
        case 12: return { cols: 4, rows: 3 };
        case 14: return { cols: 4, rows: 4 };
        case 16: return { cols: 4, rows: 4 };
        case 18: return { cols: 5, rows: 4 };
        case 20: return { cols: 5, rows: 4 };
        default: return { cols: 4, rows: 3 };
    }
}

function buildBoard(numImages) {
    const numCards = numImages * 2;
    let { cols, rows } = getGridDimensions(numCards);
    // clear old board
    const gridDiv = document.querySelector('.card-grid');
    gridDiv.innerHTML = "";
    gridDiv.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
    gridDiv.style.gridTemplateRows = `repeat(${rows}, 100px)`;

    // clear and update score
    const minSpan = document.querySelector('.score .minimum');
    minSpan.innerHTML = numImages;
    scoreSpan.innerHTML = "";

    // build new board, according to the level of difficulty
    for (let i = 0; i < numCards; i++) {
        // <div class="card-container">
        //     <div class="card">
        //         <div class="back image-name"></div>
        //         <div class="front"></div>
        //     </div>
        // </div>


        const parentDiv = document.createElement('div');
        parentDiv.classList.add("card-container");
        const childDiv = document.createElement("div");
        childDiv.classList.add('card');
        const backDiv = document.createElement('div');
        backDiv.classList.add("back", game.deck[i].name);
        backDiv.style.backgroundImage = `url(${game.deck[i].file})`


        const frontDiv = document.createElement('div');
        frontDiv.classList.add("front");
        childDiv.appendChild(backDiv);
        childDiv.appendChild(frontDiv);
        parentDiv.appendChild(childDiv);
        gridDiv.appendChild(parentDiv);
    }
}

function addCardListeners() {
    const cardFronts = document.querySelectorAll('.card .front');
    cardFronts.forEach(front => {

        front.addEventListener('click', function (ev) {

            // save mouse position for kudos 
            mousePos = [ev.clientX, ev.clientY];
            // flip the card over
            this.parentNode.classList.add('flipped');
            // get back of card
            const back = this.parentNode.querySelector('.back');
            game.selected.push(back);

            // if this is the second card 'selected'
            // update score and check for match
            if (game.selected.length === 2) {
                game.score++;
                scoreSpan.innerHTML = game.score;
                checkForMatch(game.selected);
            }
        });
    });
}

function startGame() {
    buildBoard(levelInput.value);
    addCardListeners();
}

let game = new MemoryGame(levelInput.value);
let mousePos;
startGame();

newGameBtn.addEventListener('click', () => {
    game.reset(levelInput.value);
    startGame();
});