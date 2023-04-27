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

// preferences

let soundChoice = sounds[0];
let biomeChoice = biomes[1];
let soundVolume = 1;
let isNotifyOn = true;

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
            const notif = new Notification('Cave Shuffle Clock', {
                body: `The next cave shuffle will occur in __ seconds.`,
            });
            if (biomeChoice) notif.addEventListener('click', e => {
                window.open(biomeChoice, '_blank');
                e.preventDefault();
            });
        }
        if (soundChoice) soundChoice.play();
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

function changeSound(n) {
    soundChoice = sounds[n];
    if (soundChoice) {
        soundChoice.volume = soundVolume;
        console.warn('Changed choice of sound to choice #' + n);
    } else console.warn('Sound off');
}

function changeVolume(v) {
    soundVolume = v;
    soundChoice.volume = soundVolume;
    console.warn('Changed volume of sound to ' + v);
}

// notification functions

function toggleNotify() {
    isNotifyOn = isNotifyOn ? false : true;
    console.warn(isNotifyOn ? 'Turned notifications on' : 'Turned notifications off');
}

function changeBiome(b) {
    biomeChoice = biomes[b];
    if (biomeChoice) console.warn('Changed choice of biome jump to choice #' + b);
    else console.warn('Turned off biome jump');
    
}

function handle(permission) {
    switch (permission) {
        case 'default': console.warn('Notification access unknown.'); break;
        case 'denied': console.warn('Notification access denied :-('); break;
        case 'granted': console.warn('Notification access granted :-)');
    }
}

// for console

function ask() {
    Notification.requestPermission().then(permission => handle(permission));
}

// init

if (!typeof Notification) {
    console.warn('Notifications are not supported.')
} else {
    handle(Notification.permission);
}