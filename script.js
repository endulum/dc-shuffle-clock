let intervalID;

const sounds = new Array(5)
               .fill(0)
               .map((dummy, index) => `SMS Alert ${index + 1}`);

const muted = (sounds.push('No sound, please')) - 1;

const biomes = ['Alpine', 'Coast', 'Desert', 'Forest', 'Jungle', 'Volcano']
               .map((name, index) => ({
                id: index,
                name: name
               }));
biomes[0].id = 5;
biomes[5].id = 6;

console.log(sounds);
console.log(biomes);

// preferences object

/*
 * There was one partiularly annoying problem in this area. The "popup" variable of the prefs object is 
 * meant to be one of two strings, "tab" and "window". Storing a string in localStorage and retireving it
 * with JSON.parse() gives an error, "unexpected token... invalid JSON". But, I need JSON.parse() in the 
 * getPref() function to ensure that the other variables keep their types. I came up with two options:
 * - Use a try/catch in the getPref() function to default to just grabbing the value straight from
 *   localStorage without parsing if parsing was not possible
 * - Let getPref() return the raw localStorage strings, and do type conversions directly on the individual
 *   variables of the prefs object
 * Opted for the first option because it was easier, but I'm unsure of the elegance of this solution.
 */

const getPref = (prefName, defaultValue) => {
    try {return JSON.parse(localStorage.getItem(prefName)) ?? defaultValue;}
    catch {return localStorage.getItem(prefName) ?? defaultValue;}
}

const setPref = (prefName, newValue) => {
    localStorage.setItem(prefName, newValue);
    console.log(`Set preference "${prefName}" to value "${newValue}"`);
    return getPref(prefName);
};

const prefs = {
    delay: getPref('delay', 12), // int = seconds
    sound: getPref('sound', 5), // int = index of sounds array
    volume: getPref('volume', 1), // float = fraction of 100% volume
    notif: getPref('notif', false), // bool = send notif?
    jump: getPref('jump', false), // bool = jump to biome?
    biome: getPref('biome', 0), // int = index of biomes array
    popup: getPref('popup', 'tab'), // string = type of popup
    dismiss: getPref('dismiss', false), // bool = close notif automatically?
};

console.log(prefs);

// DOM wiring and setup

const soundSelect = document.getElementById('sound-select'); // dropdown for sound
const volumeInput = document.getElementById('volume-input'); // slider for volume
const biomeSelect = document.getElementById('biome-select'); // dropdown for biome
const popupSelect = document.getElementById('popup-select'); // dropdown for popup type

const testSound = document.getElementById('test-sound'); // button for testing volume
testSound.addEventListener('click', playSound);

const biomeJump = document.getElementById('jump-toggle'); // checkbox for biome
biomeJump.addEventListener('change', function() {
    if (this.checked) prefs.jump = setPref('jump', true);
    else prefs.jump = setPref('jump', false);
    checkIfBiome();
});

//// sound select
soundSelect.addEventListener('change', checkIfMuted);
sounds.forEach((sound, index) => {
    const option = soundSelect.appendChild(document.createElement('option'));
    option.innerHTML = sound;
    option.value = index;
});

//// biome select
biomes.forEach((name, index) => {
    const option = biomeSelect.appendChild(document.createElement('option'));
    option.innerHTML = biomes[index].name;
    option.value = index;
});


//// loop through to add change listeners
document.querySelectorAll('.input').forEach(inp => {
    // get the needed preference name from the id of the element
    const pref = inp.id.substring(0, inp.id.indexOf('-'));
    // unique cases of setting the element's value on load
    if (pref === 'volume') {
        inp.value = prefs[pref] * 100;
        checkIfMuted();
    } else if (pref === 'dismiss') {
        inp.checked = prefs[pref];
    } else {
        inp.value = prefs[pref];
    } 
    inp.addEventListener('change', function() {
        // unique cases of storing the element's value on change
        if (pref === 'volume') prefs[pref] = setPref(pref, inp.value / 100);
        else if (pref === 'dismiss') prefs[pref] = setPref(pref, inp.checked);
        else {
            console.log(pref);
            console.log(inp.value);
            prefs[pref] = setPref(pref, inp.value);
            checkIfMuted();
        }
    })
});

//// input disablers
function checkIfMuted() {
    if (prefs.sound == muted) {
        testSound.disabled = true;
        volumeInput.disabled = true;
    } else {
        testSound.disabled = false;
        volumeInput.disabled = false;
    }
};
function checkIfBiome() {
    if (prefs.jump) {
        biomeJump.checked = true;
        biomeSelect.disabled = false;
        popupSelect.disabled = false;
    } else {
        biomeSelect.disabled = true;
        popupSelect.disabled = true;
    }
}; checkIfBiome();

// the clock

function playSound() {
    const sound = new Audio(`./assets/sms${prefs.sound + 1}.mp3`);
    sound.volume = prefs.volume;
    sound.play();
}

// let intervalID;

// const sounds = [];
// sounds[0] = null;
// sounds[1] = new Audio('./assets/sms1.mp3');
// sounds[2] = new Audio('./assets/sms2.mp3');
// sounds[3] = new Audio('./assets/sms3.mp3');
// sounds[4] = new Audio('./assets/sms4.mp3');
// sounds[5] = new Audio('./assets/sms5.mp3');

// const biomes = [];
// biomes[0] = null;
// biomes[1] = 'https://dragcave.net/locations/5';
// biomes[2] = 'https://dragcave.net/locations/1';
// biomes[3] = 'https://dragcave.net/locations/2';
// biomes[4] = 'https://dragcave.net/locations/3';
// biomes[5] = 'https://dragcave.net/locations/4';
// biomes[6] = 'https://dragcave.net/locations/6';

// // dom

// const pausePlay = document.getElementById('pause-play');
// const minuteDisplay = document.getElementById('minutes');
// const secondDisplay = document.getElementById('seconds');

// const delayInput = document.getElementById('delay-input');
// const soundSelect = document.getElementById('sound-select');
// const volumeInput = document.getElementById('volume-input');
// const biomeInput = document.getElementById('biome-select');

// const notificationStatus = document.getElementById('notification-status');
// const testVolume = document.getElementById('test-volume');
// const biomeToggle = document.getElementById('biome-toggle');
// const popupSelect = document.getElementById('popup-select');
// const closeToggle = document.getElementById('close-toggle');

// // local storage and preferences

// let delay; // int
// if (!localStorage.getItem('delay')) delay = 12;
// else delay = localStorage.getItem('delay');

// let soundChoice; // int
// if (!localStorage.getItem('soundChoice')) soundChoice = 0;
// else soundChoice = localStorage.getItem('soundChoice');

// let biomeChoice; // int
// if (!localStorage.getItem('biomeChoice')) biomeChoice = 0;
// else biomeChoice = localStorage.getItem('biomeChoice');

// let soundVolume; // float
// if (!localStorage.getItem('soundVolume')) soundVolume = 1;
// else soundVolume = localStorage.getItem('soundVolume');

// let isNotifyOn; // string
// if (!localStorage.getItem('isNotifyOn')) isNotifyOn = 'no';
// else isNotifyOn = localStorage.getItem('isNotifyOn');

// let popupType; // string
// if (!localStorage.getItem('popupType')) popupType = 'tab';
// else popupType = localStorage.getItem('popupType');

// let closeAutomatically; // string
// if (!localStorage.getItem('closeAutomatically')) closeAutomatically = 'no';
// else closeAutomatically = localStorage.getItem('closeAutomatically');

// // input wiring

// delayInput.value = delay;
// delayInput.addEventListener('input', e => {
//     delay = e.target.value;
//     localStorage.setItem('delay', delay);
// });

// soundSelect.value = soundChoice;
// soundSelect.addEventListener('input', e => {
//     soundChoice = e.target.value;
//     localStorage.setItem('soundChoice', soundChoice);
//     if (!sounds[soundChoice]) {
//         volumeInput.disabled = true;
//         testVolume.disabled = true;
//     } 
//     else {
//         volumeInput.disabled = false;
//         testVolume.disabled = false;
//     }
// })

// volumeInput.value = soundVolume * 100;
// if (!sounds[soundChoice]) volumeInput.disabled = true;
// volumeInput.addEventListener('input', e => {
//     soundVolume = e.target.value / 100;
//     localStorage.setItem('soundVolume', soundVolume);
// });

// if (biomes[biomeChoice]) biomeInput.value = biomeChoice;
// else biomeInput.value = 1;
// biomeInput.addEventListener('input', e => {
//     biomeChoice = e.target.value;
//     localStorage.setItem('biomeChoice', biomeChoice);
// })

// if (!sounds[soundChoice]) testVolume.disabled = true;
// testVolume.addEventListener('click', () => {
//     if (sounds[soundChoice]) {
//         sounds[soundChoice].currentTime = 0;
//         sounds[soundChoice].play();
//     } 
// })

// if (biomes[biomeChoice]) biomeToggle.checked = true;
// else {
//     biomeInput.disabled = true;
//     popupSelect.disabled = true;
// }

// biomeToggle.addEventListener('click', () => {
//     if (biomes[biomeChoice]) {
//         biomeChoice = 0;
//         localStorage.setItem('biomeChoice', biomeChoice);
//         biomeInput.value = 1;
//         biomeInput.disabled = true;
//         popupSelect.disabled = true;
//     } else {
//         biomeChoice = 1;
//         localStorage.setItem('biomeChoice', biomeChoice);
//         biomeInput.disabled = false;
//         popupSelect.disabled = false;
//     }
// })

// popupSelect.addEventListener('input', e => {
//     switch (e.target.value) {
//         case 'window':
//             popupType = 'window';
//             localStorage.setItem('popupType', 'window');
//             break;
//         case 'tab':
//             popupType = 'tab';
//             localStorage.setItem('popupType', 'tab');
//             break;
//     }
// })

// if (closeAutomatically == 'yes') closeToggle.checked = true;
// else closeToggle.checked = false;
// closeToggle.addEventListener('click', () => {
//     if (closeAutomatically == 'yes') {
//         closeAutomatically = 'no';
//         localStorage.setItem('closeAutomatically', 'no');
//     } else {
//         closeAutomatically = 'yes';
//         localStorage.setItem('closeAutomatically', 'yes');
//     }
//     console.log(closeAutomatically);
// })

// // clock functions

// function countTime() {
//     const now = new Date();
//     const minute = parseInt(now.getMinutes());
//     const second = parseInt(now.getSeconds());
//     checkTime(minute, second);
//     displayTime(minute, second);
// }

// function checkTime(minute, second) {
//     // if (second % 10 == 0) { // for quick debugging
//     if ((minute + 1) % 5 === 0 && 60 - delay == second) {
//         if (Notification.permission === 'granted' && isNotifyOn == 'yes') notify(minute);
//         if (sounds[soundChoice]) {
//             sounds[soundChoice].currentTime = 0;
//             sounds[soundChoice].play();
//         }
//         pausePlay.classList.add('shuffling');
//         pausePlay.innerHTML = '<img src="./assets/shuffle.svg" class="icon_play spin">';
//         setTimeout(() => {
//             pausePlay.classList.remove('shuffling');
//             pausePlay.innerHTML = '<img src="./assets/pause.svg" class="icon_play">';
//         }, 2000);
//     }
// }

// function displayTime(minute, second) {
//     if (minute < 10) minute = "0" + minute;
//     if (second < 10) second = "0" + second;
//     minuteDisplay.textContent = minute;
//     secondDisplay.textContent = second;
// }

// function start() {
//     if (!intervalID) {
//         countTime();
//         intervalID = setInterval(countTime, 999);
//     }
// }

// function stop() {
//     if (intervalID) {
//         clearInterval(intervalID);
//         intervalID = null;
//     }
// }

// pausePlay.classList.add('pausing');
// pausePlay.innerHTML = '<img src="./assets/play.svg" class="icon_play">';

// pausePlay.addEventListener('click', () => {
//     if (intervalID) {
//         stop();
//         pausePlay.classList.replace('playing', 'pausing');
//         pausePlay.innerHTML = '<img src="./assets/play.svg" class="icon_play">';
//     } else if (!intervalID) {
//         start();
//         pausePlay.classList.replace('pausing', 'playing');
//         pausePlay.innerHTML = '<img src="./assets/pause.svg" class="icon_play">';
//     }
// });

// // notification functions

// function notify(minute) {
//     let notifText;
//     if (minute == 59) notifText = `The hourly cave refresh will occur in about ${delay} seconds.`;
//     else notifText = `The next cave shuffle will occur in ${delay} seconds.`;
//     const notif = new Notification('Cave Shuffle Clock', {body: notifText,});
//     if (biomes[biomeChoice]) notif.addEventListener('click', e => {
//         e.preventDefault();
//         if (popupType === 'tab') {
//             window.open(biomes[biomeChoice], '_blank');
//         }
//         else if (popupType === 'window') {
//             window.open(biomes[biomeChoice], '', 'width=900,height=500');
//         }
//     });
//     console.log(`Notification should be sent at minute :${minute}`);
//     if (closeAutomatically == 'yes') setTimeout(() => {
//         notif.close()
//     }, delay*1000);
// }

// function ask() {
//     Notification.requestPermission().then(permission => handle(permission));
// }

// function handle(permission) {
//     switch (permission) {
//         case 'denied': 
//             notificationStatus.textContent = 'Notifications blocked';
//             notificationStatus.removeEventListener('click', ask);
//             notificationStatus.disabled = 'true';
//             biomeToggle.disabled = true;
//             biomeInput.disabled = true;
//             closeToggle.disabled = true;
//             break;
//         case 'granted':
//             biomeToggle.disabled = false;
//             closeToggle.disabled = false;
//             notificationStatus.removeEventListener('click', ask);
//             if (isNotifyOn == 'yes') {
//                 notificationStatus.classList.add('notify-on')
//                 notificationStatus.textContent = 'Notifying is ON, click to turn OFF';
//             } else {
//                 notificationStatus.classList.add('notify-off');
//                 notificationStatus.textContent = 'Notifying is OFF, click to turn ON';
//             }
//             notificationStatus.addEventListener('click', () => {
//                 if (isNotifyOn == 'yes') {
//                     isNotifyOn = 'no';
//                     localStorage.setItem('isNotifyOn', 'no');
//                     notificationStatus.classList.replace('notify-on', 'notify-off');
//                     notificationStatus.textContent = 'Notifying is OFF, click to turn ON';
//                 } else {
//                     isNotifyOn = 'yes';
//                     localStorage.setItem('isNotifyOn', 'yes');
//                     notificationStatus.classList.replace('notify-off', 'notify-on');
//                     notificationStatus.textContent = 'Notifying is ON, click to turn OFF';
//                 }
//             });
//             break;
//         default:
//             notificationStatus.textContent = 'Request notification permission';
//             notificationStatus.addEventListener('click', ask);
//             biomeToggle.disabled = true;
//             biomeInput.disabled = true;
//             closeToggle.disabled = true;
//     }
// }

// if (!typeof Notification) {
//     notificationStatus.textContent = 'Notifications not supported';
//     notificationStatus.disabled = true;
//     biomeToggle.disabled = true;
//     biomeInput.disabled = true;
//     closeToggle.disabled = true;
// } else handle(Notification.permission);