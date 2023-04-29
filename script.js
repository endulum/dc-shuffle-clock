let intervalID;

const sounds = [];
sounds[0] = null;
sounds[1] = new Audio('./assets/sms1.mp3');
sounds[2] = new Audio('./assets/sms2.mp3');
sounds[3] = new Audio('./assets/sms3.mp3');
sounds[4] = new Audio('./assets/sms4.mp3');
sounds[5] = new Audio('./assets/sms5.mp3');

const biomes = [];
biomes[0] = null;
biomes[1] = 'https://dragcave.net/locations/5';
biomes[2] = 'https://dragcave.net/locations/1';
biomes[3] = 'https://dragcave.net/locations/2';
biomes[4] = 'https://dragcave.net/locations/3';
biomes[5] = 'https://dragcave.net/locations/4';
biomes[6] = 'https://dragcave.net/locations/6';

// dom

const pausePlay = document.getElementById('pause-play');
const minuteDisplay = document.getElementById('minutes');
const secondDisplay = document.getElementById('seconds');

const delayInput = document.getElementById('delay-input');
const soundSelect = document.getElementById('sound-select');
const volumeInput = document.getElementById('volume-input');

// local storage and preferences

let delay; // int
if (!localStorage.getItem('delay')) delay = 12;
else delay = localStorage.getItem('delay');

let soundChoice; // int
if (!localStorage.getItem('soundChoice')) soundChoice = 0;
else soundChoice = localStorage.getItem('soundChoice');

let biomeChoice; // int
if (!localStorage.getItem('biomeChoice')) biomeChoice = 6;
else biomeChoice = localStorage.getItem('biomeChoice');

let soundVolume; // float
if (!localStorage.getItem('soundVolume')) soundVolume = 1;
else soundVolume = localStorage.getItem('soundVolume');

let isNotifyOn; // bool
if (!localStorage.getItem('isNotifyOn')) isNotifyOn = true;
else isNotifyOn = localStorage.getItem('isNotifyOn');

// to test localstorage

// let prefs = [delay, soundChoice, biomeChoice, soundVolume, isNotifyOn];
// for (let pref of prefs) console.log(pref);

// input wiring

delayInput.value = delay;
delayInput.addEventListener('input', e => {
    delay = e.target.value;
    localStorage.setItem('delay', delay);
    console.warn(`Delay changed to ${delay} seconds`);
});

soundSelect.value = soundChoice;
soundSelect.addEventListener('input', e => {
    soundChoice = e.target.value;
    localStorage.setItem('soundChoice', soundChoice);
    console.warn(`Sound choice changed to ${soundChoice}`);
    if (!sounds[soundChoice]) volumeInput.disabled = true;
    else volumeInput.disabled = false;
})

volumeInput.value = soundVolume * 100;
if (!sounds[soundChoice]) volumeInput.disabled = true;
volumeInput.addEventListener('input', e => {
    soundVolume = e.target.value / 100;
    localStorage.setItem('soundVolume', soundVolume);
    console.warn(`Sound volume changed to ${soundVolume}`);
});

// clock functions

function countTime() {
    const now = new Date();
    const minute = parseInt(now.getMinutes());
    const second = parseInt(now.getSeconds());
    checkTime(minute, second);
    displayTime(minute, second);
}

function checkTime(minute, second) {
    if ((minute + 1) % 5 === 0 && 60 - delay == second) {
        if (Notification.permission === 'granted' && isNotifyOn) notify(minute);
        if (sounds[soundChoice]) sounds[soundChoice].play();
    }
}

function displayTime(minute, second) {
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    minuteDisplay.textContent = minute;
    secondDisplay.textContent = second;
}

function start() {
    if (!intervalID) {
        countTime();
        intervalID = setInterval(countTime, 999);
    }
}

function stop() {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    }
}

pausePlay.addEventListener('click', () => {
    if (intervalID) {
        stop();
        pausePlay.textContent = 'Play';
    } else if (!intervalID) {
        start();
        pausePlay.textContent = 'Pause';
    }
});

// notification functions

function notify(minute) {
    let notifText;
    if (minute == 59) notifText = `The hourly cave refresh will occur in about ${delay} seconds.`;
    else notifText = `The next cave shuffle will occur in ${delay} seconds.`;
    const notif = new Notification('Cave Shuffle Clock', {body: notifText,});
    if (biomes[biomeChoice]) notif.addEventListener('click', e => {
        e.preventDefault();
        window.open(biomes[biomeChoice], '_blank');
    });
}

function ask() {
    Notification.requestPermission().then(permission => handle(permission));
}

function handle(permission) {
    // switch (permission) {
    //     case 'denied': break;
    //     case 'granted': break;
    //     default:;
    // }
}