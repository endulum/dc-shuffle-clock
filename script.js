let intervalID;

const sounds = [];
sounds[1] = new Audio('./assets/sms1.mp3');
sounds[2] = new Audio('./assets/sms2.mp3');
sounds[3] = new Audio('./assets/sms3.mp3');
sounds[4] = new Audio('./assets/sms4.mp3');
sounds[5] = new Audio('./assets/sms5.mp3');

// preferences

let isSoundOn = true;
let soundChoice = sounds[1];
let soundVolume = 1;

let isNotifyOn = false;

// clock functions

function countTime() {
    const now = new Date();
    const minute = parseInt(now.getMinutes());
    const second = parseInt(now.getSeconds());
    checkTime(minute, second);
    printTime(minute, second);
}

function checkTime(minute, second) {
    if (second % 10 == 0) {
        if (Notification.permission === 'granted' && isNotifyOn) {
            const notif = new Notification('beep boop');
        }
        if (isSoundOn) soundChoice.play();
    }
}

function printTime(minute, second) {
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    console.log(minute + ":" + second);
}

function start() {
    if (!intervalID) {
        countTime();
        intervalID = setInterval(countTime, 999);
    } else console.warn('clock is already started');
}

function stop() {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    } else console.warn('clock is already stopped');
}

// sound functions

function toggleSound() {
    isSoundOn = isSoundOn ? false : true;
}

function changeSound(n) {
    soundChoice = sounds[n];
    soundChoice.volume = soundVolume;
    console.warn('Changed choice of sound to choice #' + n);
}

function changeVolume(v) {
    soundVolume = v;
    soundChoice.volume = soundVolume;
    console.warn('Changed volume of sound to ' + v);
}

// notifications

function toggleNotify() {
    isNotifyOn = isNotifyOn ? false : true;
}

function ask() {
    Notification.requestPermission().then(permission => handle(permission));
}

function handle(permission) {
    switch (permission) {
        case 'default': console.warn('Request notification access?'); break;
        case 'denied': console.warn('Notification access denied :-('); break;
        case 'granted': console.warn('Notification access granted :-)');
    }
}

if (!typeof Notification) {
    console.warn('Notifications are not supported')
} else {
    handle(Notification.permission);
}