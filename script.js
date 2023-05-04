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

// preferences object

/*
 * There was one partiularly annoying problem in this area. The "popup" variable of the prefs object is 
 * meant to be one of two strings, "tab" and "window". Storing a string in localStorage and retireving it
 * with JSON.parse() gives an error, "unexpected token... invalid JSON". But, I need JSON.parse() in the 
 * getPref() function to ensure that the other variables keep their types. I came up with two options:
 * - Use a try/catch in the getPref() function to default to just grabbing the value straight from
 *   localStorage without parsing if parsing was somehow not possible
 * - Let getPref() return the raw localStorage strings, and do type conversions directly on the individual
 *   variables of the prefs object
 * Opted for the first option because it was easier, but I'm unsure of the elegance of either solution.
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

function testPrefs() {
    const inps = document.querySelectorAll('.input');
    for (let inp of inps) {
        // get name and value of preference
        const pref = inp.id.substring(0, inp.id.indexOf('-'));
        const prefValue = prefs[pref];
        // get value of corresponding DOM input
        let inputValue;
        if (inp.type == 'checkbox') inputValue = inp.checked;
        else inputValue = inp.value;
        // compare
        if (prefValue != inputValue) {
            if (prefValue === (inputValue / 100)) 
                console.log(`For preference "${pref}", input value of ${inputValue} corresponds with stored value of ${prefValue}`);
            else console.warn(`For preference "${pref}", input value of ${inputValue} does NOT match stored value of ${prefValue}`);
        } else {
            console.log(`For preference "${pref}", input value of ${inputValue} matches stored value of ${prefValue}`);
        }
    }
}

// DOM input wiring

const soundSelect = document.getElementById('sound-select'); // dropdown for sound
const volumeInput = document.getElementById('volume-input'); // slider for volume
const notifButton = document.getElementById('notif-toggle'); // button for notif toggling
const biomeJump = document.getElementById('jump-toggle'); // checkbox for biome
const biomeSelect = document.getElementById('biome-select'); // dropdown for biome
const popupSelect = document.getElementById('popup-select'); // dropdown for popup type
const dismissToggle = document.getElementById('dismiss-toggle'); // checkbox for toggling

sounds.forEach((sound, index) => { // populate sound dropdown
    const option = soundSelect.appendChild(document.createElement('option'));
    option.innerHTML = sound;
    option.value = index;
});

soundSelect.addEventListener('change', checkIfMuted);

biomes.forEach((name, index) => { // populate biome dropdown
    const option = biomeSelect.appendChild(document.createElement('option'));
    option.innerHTML = biomes[index].name;
    option.value = index;
});

const testSound = document.getElementById('test-sound'); // button for testing volume
testSound.addEventListener('click', playSound);

// DOM setup

document.querySelectorAll('.input').forEach(inp => {
    // get the needed preference name from the id of the element
    const pref = inp.id.substring(0, inp.id.indexOf('-'));

    // unique cases of setting the element's value on load
    if (pref === 'volume') {
        inp.value = prefs[pref] * 100;
        checkIfMuted();
    } else if (pref === 'dismiss' || pref === 'jump') {
        inp.checked = prefs[pref];
        if (pref === 'jump') checkIfJump();
    } else {
        inp.value = prefs[pref];
    } 

    inp.addEventListener('change', function() {
        // unique cases of storing the element's value on change
        if (pref === 'volume') prefs[pref] = setPref(pref, inp.value / 100);
        else if (pref === 'dismiss' || pref === 'jump') {
            prefs[pref] = setPref(pref, inp.checked);
            if (pref === 'jump') checkIfJump();
        } else {
            prefs[pref] = setPref(pref, inp.value);
            checkIfMuted();
        }
    })
});

// DOM input disabling and enabling

function checkIfMuted() {
    if (prefs.sound == muted) {
        testSound.disabled = true;
        volumeInput.disabled = true;
    } else {
        testSound.disabled = false;
        volumeInput.disabled = false;
    }
};

function checkIfJump() {
    if (prefs.jump && prefs.notif) {
        if (!biomeJump.checked) biomeJump.checked = true;
        biomeSelect.disabled = false;
        popupSelect.disabled = false;
    } else {
        biomeSelect.disabled = true;
        popupSelect.disabled = true;
    }
}; 

function checkNotifStatus() {
    if (prefs.notif) {
        toggleNotifControls(true);
        notifButton.textContent = 'Notifying is ON, click to turn OFF';
    } else {
        toggleNotifControls(false);
        notifButton.textContent = 'Notifying is OFF, click to turn ON';
    }
}

function toggleNotifControls(t) {
    if (t) {
        biomeJump.disabled = false;
        dismissToggle.disabled = false;
    } else {
        biomeJump.disabled = true;
        dismissToggle.disabled = true;
    }
    checkIfJump();
}

// notification system

function checkNotifSupport() {
    if (!window.Notification || !Notification.requestPermission) return false;
    if (Notification.permission == 'granted') return true;
    try {new Notification('');} 
    catch (e) {if (e.name == 'TypeError') return false;} 
    return true;
} // insert "idk i just found this from stackoverflow" meme here

async function askPermission() {
    const permission = await Notification.requestPermission();
    handlePermission(permission);
}

function handlePermission(permission) {
    if (permission == 'denied') {
        prefs.notif = setPref('notif', false);
        notifButton.textContent = 'Notifications blocked';
        notifButton.disabled = true;
        toggleNotifControls(false);
        notifButton.removeEventListener('click', askPermission);
    } else if (permission == 'granted') {
        toggleNotifControls(true);
        notifButton.removeEventListener('click', askPermission);
        checkNotifStatus();
        notifButton.addEventListener('click', function() {
            if (prefs.notif) prefs.notif = setPref('notif', false)
            else prefs.notif = setPref('notif', true);
            checkNotifStatus();
        });
    } else {
        notifButton.textContent = 'Request notification permission?';
        notifButton.addEventListener('click', askPermission);
        toggleNotifControls(false);
    }
}

if (!typeof Notification || !checkNotifSupport()) {
    notifButton.textContent = 'Notifications are not supported';
    notifButton.disabled = true;
    toggleNotifControls(false);
} else handlePermission(Notification.permission);

// finally, the clock

function playSound() {
    const sound = new Audio(`./assets/sms${prefs.sound + 1}.mp3`);
    sound.volume = prefs.volume;
    sound.play();
}