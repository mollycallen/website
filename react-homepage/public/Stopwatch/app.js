class Stopwatch {
    constructor(digital) {
        this.timer;
        this.elapsedTime = 0;
        this.running = false;
        this.digital = digital;
        this.laps = [0];
    }

    stop() {
        this.running = false;
        clearInterval(this.timer);
    }
    start() {
        if (!this.running) {
            //console.log("start btn pressed", this);
            this.running = true;
            displayTime(this.digital, this.elapsedTime);

            if (this.digital) {
                // set interval for every .1 second
                this.timer = setInterval(() => {
                    this.elapsedTime = this.elapsedTime + .1;
                    displayTime(this.digital, this.elapsedTime);
                }, 100);
            } else {
                // set interval for every 1 second
                this.timer = setInterval(() => {
                    this.elapsedTime = this.elapsedTime + 1
                    displayTime(this.digital, this.elapsedTime);
                }, 1000);
            }

        }
    }

    stopStart() {
        // this is a toggle button
        // if watch is not running, start it
        if (!this.running) {
            this.start();
        } else {
            this.stop();
        }
    }

    reset() {
        //console.log("reset btn pressed", this);
        clearInterval(this.timer);
        this.elapsedTime = 0;
        this.running = false;
        this.laps = [0];
        displayTime(this.digital, this.elapsedTime);
    }
    lap(lapDiv) {
        this.laps.push(this.elapsedTime);
        displayLap(lapDiv, this.laps);
    }
}

function displayLap(lapDiv, lapArray) {
    const lastIndex = lapArray.length - 1;
    const diff = lapArray[lastIndex] - lapArray[lastIndex - 1];
    const lapSubDiv = document.createElement('div');
    lapSubDiv.classList.add('sub-lap');
    const lapTxt = document.createElement('p');
    const lapVal = document.createElement('p');
    lapTxt.innerHTML = `Lap ${lastIndex}: `;
    lapVal.innerHTML = formatTime(diff);
    lapSubDiv.appendChild(lapTxt);
    lapSubDiv.appendChild(lapVal);
    lapDiv.appendChild(lapSubDiv);


    //console.log(lapArray);
}
function formatTime(totalSec) {
    const dt = new Date(totalSec * 1000);
    const min = dt.getUTCMinutes().toString();
    const sec = dt.getSeconds().toString();
    const milli = dt.getMilliseconds().toString();

    return (`${min.padStart(2, "0")}:${sec.padStart(
        2,
        "0"
    )}:${milli.substring(0, 1)}`);

}
function displayTime(digital, totalSec) {

    if (digital) {

        digitalTime.value = formatTime(totalSec);

    } else {

        let secDeg = (totalSec * 6);

        // increment the minute hand every 60 secs
        if ((totalSec % 60) === 0) {
            const minDeg = ((totalSec / 60) * 6);
            minuteHand.style.transform = `rotate(${minDeg}deg)`;
        }
        secondHand.style.transform = `rotate(${secDeg}deg)`;
    }
}


// get dom elements
const digitalTab = document.querySelector('.digital-tab');
const analogTab = document.querySelector('.analog-tab');
const digitalSect = document.querySelector('.digital');

// dom elements for analog watch
const analogSect = document.querySelector('.analog');
const analogStart = document.getElementById('analog-start-btn');
const analogStop = document.getElementById('analog-stop-btn');
const analogReset = document.getElementById('analog-reset-btn');
const analogLap = document.getElementById('analog-lap-btn');
const secondHand = document.getElementById('second-hand');
const minuteHand = document.getElementById('minute-hand');
const analogLapDiv = document.querySelector('.analog .laps');

// dom elements for digital watch
const digitalStart = document.querySelector(".digital .start-btn");
const digitalLap = document.querySelector(".digital .lap-btn");
const digitalReset = document.querySelector(".digital .reset-btn");
const digitalTime = document.querySelector(".digital .elapsed-time");
const digitalLapDiv = document.querySelector('.digital .laps');

// create new stopwatch
const digitalWatch = new Stopwatch(true);
const analogWatch = new Stopwatch(false);

// add event listeners
digitalTab.addEventListener('click', () => {
    // show digital section
    // hide analog section
    // toggle tabs
    digitalSect.style.display = "flex";
    analogSect.style.display = "none";
    digitalTab.classList.add('active');
    analogTab.classList.remove('active');

});
analogTab.addEventListener('click', () => {
    // hide digital section
    // show analog section
    // toggle tabs
    digitalSect.style.display = "none";
    analogSect.style.display = "flex";
    analogTab.classList.add('active');
    digitalTab.classList.remove('active');
});
analogStart.addEventListener('click', () => {
    analogWatch.stopStart();
    analogStop.style.display = "block";
    analogStart.style.display = "none";
});
analogStop.addEventListener('click', () => {
    analogWatch.stopStart();
    analogStop.style.display = "none";
    analogStart.style.display = "block";
});
analogReset.addEventListener('click', () => {
    analogWatch.reset();
    analogLapDiv.innerHTML = "";
    analogLapDiv.style.display = "none";
    analogStop.style.display = "none";
    analogStart.style.display = "block";
});

analogLap.addEventListener('click', () => {
    analogLapDiv.style.display = "flex";
    analogWatch.lap(analogLapDiv);
})

digitalStart.addEventListener('click', () => {
    digitalWatch.stopStart();
    // change button
    if (digitalWatch.running) {
        digitalStart.innerHTML = 'Stop';
        digitalStart.classList.add('stop');
    } else {
        digitalStart.innerHTML = 'Start';
        digitalStart.classList.remove('stop');
    }

});

digitalLap.addEventListener('click', () => {
    digitalLapDiv.style.display = "flex";
    digitalWatch.lap(digitalLapDiv);
})

digitalReset.addEventListener('click', () => {
    digitalWatch.reset();
    digitalStart.innerHTML = 'Start';
    digitalStart.classList.remove('stop');
    digitalLapDiv.innerHTML = "";
    digitalLapDiv.style.display = "none";
})


