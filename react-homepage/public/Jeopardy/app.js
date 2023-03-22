class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.clues100 = [];
        this.clues200 = [];
        this.clues300 = [];
        this.clues400 = [];
        this.clues500 = [];
    }

    addClue(clue) {
        switch (clue.value) {
            case 100:
                this.clues100.push(clue);

                break;
            case 200:
                this.clues200.push(clue);
                break;
            case 300:
                this.clues300.push(clue);
                break;
            case 400:
                this.clues400.push(clue);
                break;
            case 500:
                this.clues500.push(clue);
                break;
        }
    }

    getRandomIndex(clueArray) {
        return (Math.floor(Math.random() * clueArray.length));
    }

    getClue(index) {
        let clue;
        let randomIndex;
        switch (index) {
            case 1:
                randomIndex = this.getRandomIndex(this.clues100);
                clue = this.clues100[randomIndex];
                break;
            case 2:
                randomIndex = this.getRandomIndex(this.clues200);
                clue = this.clues200[randomIndex];
                break;
            case 3:
                randomIndex = this.getRandomIndex(this.clues300);
                clue = this.clues300[randomIndex];
                break;
            case 4:
                randomIndex = this.getRandomIndex(this.clues400);
                clue = this.clues400[randomIndex];
                break;
            case 5:
                randomIndex = this.getRandomIndex(this.clues500);
                clue = this.clues500[randomIndex];
                break;
        }
        //console.log(index, clue);
        return clue;
    }

    storeClues(data) {
        for (let i = 0; i < data.clues.length; i++) {
            const question = data.clues[i].question;
            const answer = data.clues[i].answer;
            const value = data.clues[i].value;

            if (question !== "=" && question !== "" && answer !== "") {
                const clue = new Clue(i, question, answer, value);
                this.addClue(clue);
            }
        }
    }
}
class Clue {

    constructor(id, question, answer, value) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.value = value;
    }
    display(div) {

        div.classList.add('flipped');
        const questionDiv = div.querySelector('.question');
        const ansBtn = div.querySelector('.ans-btn');
        const answerDiv = div.querySelector('.answer');

        questionDiv.innerHTML = `${this.question}`;
        answerDiv.innerHTML = "";

        ansBtn.addEventListener('click', () => {
            answerDiv.innerHTML = `${this.answer}`;
        });
    }
}

let activeCategories = [];

async function getActiveCategories() {
    let success = true;
    const catDivs = document.querySelectorAll(".cat-header");
    activeCategories = [];
    let offset = Math.floor(Math.random() * 2000);

    let loadingDiv = document.getElementById('loading-div');
    loadingDiv.style.display = 'block';

    try {
        await fetch(`http://jservice.io/api/categories?offset=${offset}&count=5`)
            .then(result => result.json())
            .then(data => {
                data.forEach((cat, index) => {
                    fetch(`http://jservice.io/api/category?id=${cat.id}`)
                        .then(result => result.json())
                        .then(data => {
                            let newCat = new Category(cat.id, cat.title);
                            newCat.storeClues(data);
                            activeCategories.push(newCat);
                            catDivs[index].innerHTML = cat.title;
                        })
                })
            })
    } catch (error) {
        alert("Jeopardy API is not available right now.  Please check back later.");
        success = false;
    } finally {
        loadingDiv.style.display = 'none';

    }
    return success;

}

async function buildBoard() {

    let success = await getActiveCategories();
    if (!success) return;

    const clueDivs = document.querySelectorAll(".clue");
    clueDivs.forEach(div => {
        div.classList.remove('flipped');
    })
}

function getIndex(div, name) {

    let index = 0;
    if (div.classList.contains(`${name}1`)) {
        index = 1;
    } else if (div.classList.contains(`${name}2`)) {
        index = 2;
    } else if (div.classList.contains(`${name}3`)) {
        index = 3;
    } else if (div.classList.contains(`${name}4`)) {
        index = 4;
    } else if (div.classList.contains(`${name}5`)) {
        index = 5;
    }
    return index;
}


function displayClue(ev) {

    const clueDiv = ev.target.parentNode;
    const catDiv = clueDiv.parentNode.parentNode;

    const clueIndex = getIndex(clueDiv, "clue");
    const catIndex = getIndex(catDiv, "cat");
    //console.log(catIndex, clueIndex);
    const clue = activeCategories[catIndex - 1].getClue(clueIndex);
    clue.display(clueDiv);
}

const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
    buildBoard();
    const boardDiv = document.querySelector('.board');
    boardDiv.classList.add('active');
})


const clueDivs = document.querySelectorAll('.clue-front');
clueDivs.forEach(div => {
    div.addEventListener('click', displayClue);
});
