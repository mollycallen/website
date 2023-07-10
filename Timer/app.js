class Timer {
    constructor(alarm) {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.alarm = alarm;
        this.timer;

    }
    getTotalSec() {
        return (parseInt(this.hour) * 3600) +
            (parseInt(this.minute) * 60) + parseInt(this.second);
    }
    start(hr, min, sec) {
        this.hour = hr;
        this.minute = min;
        this.second = sec;

        let totalMilli = this.getTotalSec() * 1000;
        //console.log(totalMilli);
        this.timer = setTimeout(() => {

            this.alarm.src = getSelectedSound();
            this.alarm.loop = true;
            this.alarm.play()
            setTimeout(() => {
                stopBtn.click();
            }, 10000); // stop the alarm after 10 seconds


        }, parseInt(totalMilli));

    }

    stop() {
        clearTimeout(this.timer);
        this.stopAlarm = true;
        this.alarm.pause();
        this.alarm.currentTime = 0;

    }
    reset() {
        this.stop();
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
    }
}
function getSelectedSound() {
    let selected;
    //console.log(soundArray);
    soundArray.forEach(ele => {
        if (ele.checked) {
            selected = ele.value;
        }
    })
    return selected;
}
// dom elements
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const soundArray = document.getElementsByName('sound');
const alarm = document.querySelector('.alarm')

const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const stopBtn = document.querySelector('.stop');

// Timer object
let myTimer = new Timer(alarm);
let countDown;

function endCountDown() {
    clearInterval(countDown);
}

function startCountDown() {
    //console.log("counting", seconds.value);
    countDown = setInterval(() => {
        if (seconds.value > 0) {
            seconds.value = (seconds.value - 1).toString().padStart(2, 0);
        } else {
            if (minutes.value > 0) {
                minutes.value = (minutes.value - 1).toString().padStart(2, 0);
                seconds.value = 59;
            } else {
                if (hours.value > 0) {
                    hours.value = (hours.value - 1).toString().padStart(2, 0);
                    minutes.value = 59;
                } else {
                    endCountDown();
                }
            }
        }

    }, 1000)

}
function readOnlyInputs(flag) {
    if (flag) {
        hours.classList.add('readonly');
        minutes.classList.add('readonly');
        seconds.classList.add('readonly');
    } else {
        hours.classList.remove('readonly');
        minutes.classList.remove('readonly');
        seconds.classList.remove('readonly');
    }

}

// event listeners
startBtn.addEventListener('click', () => {
    //console.log("start", this);

    myTimer.start(hours.value, minutes.value, seconds.value);
    readOnlyInputs(true);
    startCountDown();
})

stopBtn.addEventListener('click', () => {
    //console.log("stop", this);
    myTimer.stop();
    endCountDown();
    readOnlyInputs(false);
})
resetBtn.addEventListener('click', () => {
    //console.log("reset", this);
    hours.value = "00";
    minutes.value = "00"
    seconds.value = "00";
    myTimer.reset();
    readOnlyInputs(false);
})