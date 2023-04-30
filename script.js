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
const biomeInput = document.getElementById('biome-select');

const notificationStatus = document.getElementById('notification-status');
const testVolume = document.getElementById('test-volume');
const biomeToggle = document.getElementById('biome-toggle');
const popupSelect = document.getElementById('popup-select');
const closeToggle = document.getElementById('close-toggle');

// local storage and preferences

let delay; // int
if (!localStorage.getItem('delay')) delay = 12;
else delay = localStorage.getItem('delay');

let soundChoice; // int
if (!localStorage.getItem('soundChoice')) soundChoice = 0;
else soundChoice = localStorage.getItem('soundChoice');

let biomeChoice; // int
if (!localStorage.getItem('biomeChoice')) biomeChoice = 0;
else biomeChoice = localStorage.getItem('biomeChoice');

let soundVolume; // float
if (!localStorage.getItem('soundVolume')) soundVolume = 1;
else soundVolume = localStorage.getItem('soundVolume');

let isNotifyOn; // string
if (!localStorage.getItem('isNotifyOn')) isNotifyOn = 'no';
else isNotifyOn = localStorage.getItem('isNotifyOn');

let popupType; // string
if (!localStorage.getItem('popupType')) popupType = 'tab';
else popupType = localStorage.getItem('popupType');

let closeAutomatically; // string
if (!localStorage.getItem('closeAutomatically')) closeAutomatically = 'no';
else closeAutomatically = localStorage.getItem('closeAutomatically');

// input wiring

delayInput.value = delay;
delayInput.addEventListener('input', e => {
    delay = e.target.value;
    localStorage.setItem('delay', delay);
});

soundSelect.value = soundChoice;
soundSelect.addEventListener('input', e => {
    soundChoice = e.target.value;
    localStorage.setItem('soundChoice', soundChoice);
    if (!sounds[soundChoice]) {
        volumeInput.disabled = true;
        testVolume.disabled = true;
    } 
    else {
        volumeInput.disabled = false;
        testVolume.disabled = false;
    }
})

volumeInput.value = soundVolume * 100;
if (!sounds[soundChoice]) volumeInput.disabled = true;
volumeInput.addEventListener('input', e => {
    soundVolume = e.target.value / 100;
    localStorage.setItem('soundVolume', soundVolume);
});

if (biomes[biomeChoice]) biomeInput.value = biomeChoice;
else biomeInput.value = 1;
biomeInput.addEventListener('input', e => {
    biomeChoice = e.target.value;
    localStorage.setItem('biomeChoice', biomeChoice);
})

if (!sounds[soundChoice]) testVolume.disabled = true;
testVolume.addEventListener('click', () => {
    if (sounds[soundChoice]) {
        sounds[soundChoice].currentTime = 0;
        sounds[soundChoice].play();
    } 
})

if (biomes[biomeChoice]) biomeToggle.checked = true;
else {
    biomeInput.disabled = true;
    popupSelect.disabled = true;
}

biomeToggle.addEventListener('click', () => {
    if (biomes[biomeChoice]) {
        biomeChoice = 0;
        localStorage.setItem('biomeChoice', biomeChoice);
        biomeInput.value = 1;
        biomeInput.disabled = true;
        popupSelect.disabled = true;
    } else {
        biomeChoice = 1;
        localStorage.setItem('biomeChoice', biomeChoice);
        biomeInput.disabled = false;
        popupSelect.disabled = false;
    }
})

popupSelect.addEventListener('input', e => {
    switch (e.target.value) {
        case 'window':
            popupType = 'window';
            localStorage.setItem('popupType', 'window');
            break;
        case 'tab':
            popupType = 'tab';
            localStorage.setItem('popupType', 'tab');
            break;
    }
})

if (closeAutomatically == 'yes') closeToggle.checked = true;
else closeToggle.checked = false;
closeToggle.addEventListener('click', () => {
    if (closeAutomatically == 'yes') {
        closeAutomatically = 'no';
        localStorage.setItem('closeAutomatically', 'no');
    } else {
        closeAutomatically = 'yes';
        localStorage.setItem('closeAutomatically', 'yes');
    }
    console.log(closeAutomatically);
})

// clock functions

function countTime() {
    const now = new Date();
    const minute = parseInt(now.getMinutes());
    const second = parseInt(now.getSeconds());
    checkTime(minute, second);
    displayTime(minute, second);
}

function checkTime(minute, second) {
    // if (second % 10 == 0) { // for quick debugging
    if ((minute + 1) % 5 === 0 && 60 - delay == second) {
        if (Notification.permission === 'granted' && isNotifyOn == 'yes') notify(minute);
        if (sounds[soundChoice]) {
            sounds[soundChoice].currentTime = 0;
            sounds[soundChoice].play();
        }
        pausePlay.classList.add('shuffling');
        pausePlay.innerHTML = '<img src="./assets/shuffle.svg" class="icon_play spin">';
        setTimeout(() => {
            pausePlay.classList.remove('shuffling');
            pausePlay.innerHTML = '<img src="./assets/pause.svg" class="icon_play">';
        }, 2000);
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

pausePlay.classList.add('pausing');
pausePlay.innerHTML = '<img src="./assets/play.svg" class="icon_play">';

pausePlay.addEventListener('click', () => {
    if (intervalID) {
        stop();
        pausePlay.classList.replace('playing', 'pausing');
        pausePlay.innerHTML = '<img src="./assets/play.svg" class="icon_play">';
    } else if (!intervalID) {
        start();
        pausePlay.classList.replace('pausing', 'playing');
        pausePlay.innerHTML = '<img src="./assets/pause.svg" class="icon_play">';
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
        if (popupType === 'tab') {
            window.open(biomes[biomeChoice], '_blank');
        }
        else if (popupType === 'window') {
            window.open(biomes[biomeChoice], '', 'width=900,height=500');
        }
    });
    console.log(`Notification should be sent at minute :${minute}`);
    if (closeAutomatically == 'yes') setTimeout(() => {
        notif.close()
    }, delay*1000);
}

function ask() {
    Notification.requestPermission().then(permission => handle(permission));
}

function handle(permission) {
    switch (permission) {
        case 'denied': 
            notificationStatus.textContent = 'Notifications blocked';
            notificationStatus.removeEventListener('click', ask);
            notificationStatus.disabled = 'true';
            biomeToggle.disabled = true;
            biomeInput.disabled = true;
            closeToggle.disabled = true;
            break;
        case 'granted':
            biomeToggle.disabled = false;
            closeToggle.disabled = false;
            notificationStatus.removeEventListener('click', ask);
            if (isNotifyOn == 'yes') {
                notificationStatus.classList.add('notify-on')
                notificationStatus.textContent = 'Notifying is ON, click to turn OFF';
            } else {
                notificationStatus.classList.add('notify-off');
                notificationStatus.textContent = 'Notifying is OFF, click to turn ON';
            }
            notificationStatus.addEventListener('click', () => {
                if (isNotifyOn == 'yes') {
                    isNotifyOn = 'no';
                    localStorage.setItem('isNotifyOn', 'no');
                    notificationStatus.classList.replace('notify-on', 'notify-off');
                    notificationStatus.textContent = 'Notifying is OFF, click to turn ON';
                } else {
                    isNotifyOn = 'yes';
                    localStorage.setItem('isNotifyOn', 'yes');
                    notificationStatus.classList.replace('notify-off', 'notify-on');
                    notificationStatus.textContent = 'Notifying is ON, click to turn OFF';
                }
            });
            break;
        default:
            notificationStatus.textContent = 'Request notification permission';
            notificationStatus.addEventListener('click', ask);
            biomeToggle.disabled = true;
            biomeInput.disabled = true;
            closeToggle.disabled = true;
    }
}

if (!typeof Notification) {
    notificationStatus.textContent = 'Notifications not supported';
    notificationStatus.disabled = true;
    biomeToggle.disabled = true;
    biomeInput.disabled = true;
    closeToggle.disabled = true;
} else handle(Notification.permission);